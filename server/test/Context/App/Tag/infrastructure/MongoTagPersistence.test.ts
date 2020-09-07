import container from '../../../../../src/apps/backend/config/dependency-injection';
import { TagId } from '../../../../../src/Contexts/App/Shared/domain/Tag/TagId';
import { UserId } from '../../../../../src/Contexts/App/Shared/domain/User/UserId';
import Tag from '../../../../../src/Contexts/App/Tag/domain/Tag';
import TagRepository from '../../../../../src/Contexts/App/Tag/domain/TagRepository';
import { DuplicateKeyException } from '../../../../../src/Contexts/Shared/domain/exceptions/DuplicateKeyException';
import { EnvironmentArranger } from '../../../Shared/infrastructure/arranger/EnvironmentArranger';

const repository: TagRepository = container.get('Polvebra.tag.TagRepository');
const environmentArranger: EnvironmentArranger = container.get('App.EnvironmentArranger');

beforeAll(async () => {
    await (await environmentArranger).setUp();
});

beforeEach(async () => {
    await (await environmentArranger).arrange();
});

afterAll(async () => {
    await (await environmentArranger).close();
});
const userAId: UserId = UserId.random();
const userBId: UserId = UserId.random();
const tagAId: TagId = TagId.random();
const tagBId: TagId = TagId.random();
const tagCId: TagId = TagId.random();
const tagDId: TagId = TagId.random();

function createTagA(): Tag {
    return Tag.fromPrimitives({
                                  id: tagAId.value,
                                  userId: userAId.value,
                                  parentTagId: null,
                                  name: 'Name A',
                                  description: 'Description A',
                                  balance: 0,
                                  netBalance: 1
                              });
}

function createTagB(): Tag {
    return Tag.fromPrimitives({
                                  id: tagBId.value,
                                  userId: userAId.value,
                                  parentTagId: null,
                                  name: 'Name B',
                                  description: 'Description B',
                                  balance: 0,
                                  netBalance: 1
                              });
}

function createTagC(): Tag {
    return Tag.fromPrimitives({
                                  id: tagCId.value,
                                  userId: userAId.value,
                                  parentTagId: tagAId.value,
                                  name: 'Name C',
                                  description: 'Description C',
                                  balance: 0,
                                  netBalance: 1
                              });
}

function createTagD(): Tag {
    return Tag.fromPrimitives({
                                  id: tagDId.value,
                                  userId: userBId.value,
                                  parentTagId: null,
                                  name: 'Name D',
                                  description: 'Description D',
                                  balance: 0,
                                  netBalance: 1
                              });
}


describe('Save Tag', () => {
    it('should save a tag', async () => {
        let tag = createTagA();
        await repository.save(tag);
    });

    it('shouldn\'t create two times same id', async () => {
        expect.assertions(1);
        const tagA = createTagA();
        await repository.save(tagA);
        const tagB = Tag.fromPrimitives({
                                            id: tagAId.value,
                                            userId: userAId.value,
                                            parentTagId: null,
                                            name: 'Name B',
                                            description: 'Description B',
                                            balance: 0,
                                            netBalance: 1
                                        });
        return expect(repository.save(tagB)).rejects.toThrow(DuplicateKeyException);
    });
});

describe('Find Tags', () => {
    it('Find one tag without parent in DB by ID', async () => {
        const tagAPreSaved = createTagA();
        const tagID: UserId = tagAPreSaved.id;
        await repository.save(tagAPreSaved);
        const tagASaved = await repository.search(tagID);
        expect(tagASaved).not.toBeNull();
        expect(tagASaved?.id.value).toEqual(tagAId.value);
        expect(tagASaved?.userId.value).toEqual(userAId.value);
        expect(tagASaved?.parentTagId).toBeNull();
        expect(tagASaved?.name.value).toEqual('Name A');
        expect(tagASaved?.description.value).toEqual('Description A');
        expect(tagASaved?.balance.value).toEqual(0);
        expect(tagASaved?.netBalance.value).toEqual(1);
    });

    it('Find one tag with parent in DB by ID', async () => {
        const tagCPreSaved = createTagC();
        const tagID: UserId = tagCPreSaved.id;
        await repository.save(tagCPreSaved);
        const tagCSaved = await repository.search(tagID);
        expect(tagCSaved).not.toBeNull();
        expect(tagCPreSaved.id.value).toEqual(tagCId.value);
        expect(tagCPreSaved.userId.value).toEqual(userAId.value);
        expect(tagCPreSaved.parentTagId?.value).toEqual(tagAId.value);
        expect(tagCPreSaved.name.value).toEqual('Name C');
        expect(tagCPreSaved.description.value).toEqual('Description C');
        expect(tagCPreSaved.balance.value).toEqual(0);
        expect(tagCPreSaved.netBalance.value).toEqual(1);
    });

    it('Find all the tags', async () => {
        const tagA: Tag = createTagA();
        const tagB: Tag = createTagB();
        const tagC: Tag = createTagC();
        const tagD: Tag = createTagD();
        await repository.save(tagA);
        await repository.save(tagB);
        await repository.save(tagC);
        await repository.save(tagD);
        const clients = await repository.searchAll();
        expect(clients).not.toBeNull();
        expect(clients?.length).toEqual(4);
    });

    it('Find all the tags from one User', async () => {
        const tagA: Tag = createTagA();
        const tagB: Tag = createTagB();
        const tagC: Tag = createTagC();
        const tagD: Tag = createTagD();
        await repository.save(tagA);
        await repository.save(tagB);
        await repository.save(tagC);
        await repository.save(tagD);
        const tags = await repository.searchAllTagsFromUser(userAId);
        expect(tags).not.toBeNull();
        expect(tags?.length).toEqual(3);
        expect(tags?.some((tag) => tag.id.value ===
            tagA.id.value)).toBeTruthy();
        expect(tags?.some((tag) => tag.id.value ===
            tagB.id.value)).toBeTruthy();
        expect(tags?.some((tag) => tag.id.value ===
            tagC.id.value)).toBeTruthy();
    });

    it('Find all tags sons', async () => {
        const tagA: Tag = createTagA();
        const tagB: Tag = createTagB();
        const tagC: Tag = createTagC();
        const tagD: Tag = createTagD();
        await repository.save(tagA);
        await repository.save(tagB);
        await repository.save(tagC);
        await repository.save(tagD);
        const tags = await repository.searchTagsSon(tagA.id);
        expect(tags).not.toBeNull();
        expect(tags?.length).toEqual(1);
        expect(tags?.some((tag) => tag.id.value ===
            tagC.id.value)).toBeTruthy();
    });
});

