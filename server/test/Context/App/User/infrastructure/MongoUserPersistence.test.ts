import container from '../../../../../src/apps/backend/config/dependency-injection';
import { UserId } from '../../../../../src/Contexts/App/Shared/domain/User/UserId';
import User from '../../../../../src/Contexts/App/User/domain/User';
import UserRepository from '../../../../../src/Contexts/App/User/domain/UserRepository';
import { DuplicateKeyException } from '../../../../../src/Contexts/Shared/domain/exceptions/DuplicateKeyException';
import { EnvironmentArranger } from '../../../Shared/infrastructure/arranger/EnvironmentArranger';

const repository: UserRepository = container.get('Polvebra.user.UserRepository');
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
const userCId: UserId = UserId.random();

function createUserA(): User {
    return User.fromPrimitives({
                                   id: userAId.toString(),
                                   username: 'testA',
                                   name: 'Test Name A',
                                   email: 'emailA@test.com',
                                   password: 'passwordA',
                                   balance: 1,
                                   netBalance: 0,
                               });
}

function createUserB(): User {
    return User.fromPrimitives({
                                   id: userBId.toString(),
                                   username: 'testB',
                                   name: 'Test Name B',
                                   email: 'emailB@test.com',
                                   password: 'passwordB',
                                   balance: 1,
                                   netBalance: 0,
                               });
}

function createUserC(): User {
    return User.fromPrimitives({
                                   id: userCId.toString(),
                                   username: 'testC',
                                   name: 'Test Name C',
                                   email: 'emailC@test.com',
                                   password: 'passwordC',
                                   balance: 1,
                                   netBalance: 0,
                               });
}

describe('Save User', () => {
    it('should save a user', async () => {
        let user = createUserA();
        await repository.save(user);
    });

    it('shouldn\'t create two times same id', async () => {
        expect.assertions(1);
        const userA = createUserA();
        await repository.save(userA);
        const userB = User.fromPrimitives({
                                              id: userAId.toString(),
                                              username: 'testB',
                                              name: 'Test Name B',
                                              email: 'emailB@test.com',
                                              password: 'passwordB',
                                              balance: 1,
                                              netBalance: 0,
                                          });
        return expect(repository.save(userB)).rejects.toThrow(DuplicateKeyException);
    });

    it('shouldn\'t create two times same email', async () => {
        expect.assertions(1);
        const userA = createUserA();
        await repository.save(userA);
        const userB = User.fromPrimitives({
                                              id: UserId.random().toString(),
                                              username: 'testB',
                                              name: 'Test Name B',
                                              email: 'emailA@test.com',
                                              password: 'passwordB',
                                              balance: 1,
                                              netBalance: 0,
                                          });
        return expect(repository.save(userB)).rejects.toThrow(DuplicateKeyException);
    });

    it('shouldn\'t create two times same username', async () => {
        expect.assertions(1);
        const userA = createUserA();
        await repository.save(userA);
        const userB = User.fromPrimitives({
                                              id: UserId.random().toString(),
                                              username: 'testA',
                                              name: 'Test Name B',
                                              email: 'emailB@test.com',
                                              password: 'passwordB',
                                              balance: 1,
                                              netBalance: 0,
                                          });
        return expect(repository.save(userB)).rejects.toThrow(DuplicateKeyException);
    });
});

describe('Find User', () => {
    it('Find one user in DB by ID', async () => {
        const userAPreSaved = createUserA();
        const userID: UserId = userAPreSaved.id;
        await repository.save(userAPreSaved);
        const clientASaved = await repository.search(userID);
        expect(clientASaved).not.toBeNull();
        expect(userAPreSaved.id).toEqual(clientASaved?.id);
        expect(userAPreSaved.name).toEqual(clientASaved?.name);
        expect(userAPreSaved.username).toEqual(clientASaved?.username);
        expect(userAPreSaved.email).toEqual(clientASaved?.email);
        expect(userAPreSaved.password).toEqual(clientASaved?.password);
        expect(userAPreSaved.balance).toEqual(clientASaved?.balance);
        expect(userAPreSaved.netBalance).toEqual(clientASaved?.netBalance);
    });

    it('Find all the users', async () => {
        await repository.save(createUserA());
        await repository.save(createUserB());
        await repository.save(createUserC());
        const clients = await repository.searchAll();
        expect(clients).not.toBeNull();
        expect(clients?.length).toEqual(3);
    });
});

describe('Login client', () => {
    it('Login an existing client', async () => {
        const userAPreSaved = createUserA();
        const clientIDA: UserId = userAPreSaved.id;
        await repository.save(userAPreSaved);
        const userBPreSaved = createUserB();
        const userIDB: UserId = userBPreSaved.id;
        await repository.save(userBPreSaved);

        const userIDAFound = await repository.loginUser(userAPreSaved.username.value, userAPreSaved.password.value);
        expect(userIDAFound).toEqual(clientIDA);
        const userIDBFound = await repository.loginUser(userBPreSaved.username.value, userBPreSaved.password.value);
        expect(userIDBFound).toEqual(userIDB);
    });
});