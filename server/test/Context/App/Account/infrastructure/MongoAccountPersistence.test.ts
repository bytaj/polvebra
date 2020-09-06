import container from '../../../../../src/apps/backend/config/dependency-injection';
import { AccountId } from '../../../../../src/Contexts/App/Shared/domain/Account/AccountId';
import { UserId } from '../../../../../src/Contexts/App/Shared/domain/User/UserId';
import Account from '../../../../../src/Contexts/App/Account/domain/Account';
import AccountRepository from '../../../../../src/Contexts/App/Account/domain/AccountRepository';
import { DuplicateKeyException } from '../../../../../src/Contexts/Shared/domain/exceptions/DuplicateKeyException';
import { EnvironmentArranger } from '../../../Shared/infrastructure/arranger/EnvironmentArranger';

const repository: AccountRepository = container.get('Polvebra.account.AccountRepository');
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
const accountAId: AccountId = AccountId.random();
const accountBId: AccountId = AccountId.random();
const accountCId: AccountId = AccountId.random();
const accountDId: AccountId = AccountId.random();

function createAccountA(): Account {
    return Account.fromPrimitives({
                                  id: accountAId.value,
                                  userId: userAId.value,
                                  name: 'Name A',
                                  balance: 0,
                                  netBalance: 1
                              });
}

function createAccountB(): Account {
    return Account.fromPrimitives({
                                  id: accountBId.value,
                                  userId: userAId.value,
                                  name: 'Name B',
                                  balance: 0,
                                  netBalance: 1
                              });
}

function createAccountC(): Account {
    return Account.fromPrimitives({
                                  id: accountCId.value,
                                  userId: userAId.value,
                                  name: 'Name C',
                                  balance: 0,
                                  netBalance: 1
                              });
}

function createAccountD(): Account {
    return Account.fromPrimitives({
                                  id: accountDId.value,
                                  userId: userBId.value,
                                  name: 'Name D',
                                  balance: 0,
                                  netBalance: 1
                              });
}


describe('Save Account', () => {
    it('should save a account', async () => {
        let account = createAccountA();
        await repository.save(account);
    });

    it('shouldn\'t create two times same id', async () => {
        expect.assertions(1);
        const accountA = createAccountA();
        await repository.save(accountA);
        const accountB = Account.fromPrimitives({
                                            id: accountAId.value,
                                            userId: userAId.value,
                                            name: 'Name B',
                                            balance: 0,
                                            netBalance: 1
                                        });
        return expect(repository.save(accountB)).rejects.toThrow(DuplicateKeyException);
    });
});

describe('Find Accounts', () => {
    it('Find one account without parent in DB by ID', async () => {
        const accountAPreSaved = createAccountA();
        const accountID: UserId = accountAPreSaved.id;
        await repository.save(accountAPreSaved);
        const accountASaved = await repository.search(accountID);
        expect(accountASaved).not.toBeNull();
        expect(accountAPreSaved.id.value).toEqual(accountAId.value);
        expect(accountAPreSaved.userId.value).toEqual(userAId.value);
        expect(accountAPreSaved.name.value).toEqual('Name A');
        expect(accountAPreSaved.balance.value).toEqual(0);
        expect(accountAPreSaved.netBalance.value).toEqual(1);
    });

    it('Find all the accounts', async () => {
        const accountA: Account = createAccountA();
        const accountB: Account = createAccountB();
        const accountC: Account = createAccountC();
        const accountD: Account = createAccountD();
        await repository.save(accountA);
        await repository.save(accountB);
        await repository.save(accountC);
        await repository.save(accountD);
        const clients = await repository.searchAll();
        expect(clients).not.toBeNull();
        expect(clients?.length).toEqual(4);
    });

    it('Find all the accounts from one User', async () => {
        const accountA: Account = createAccountA();
        const accountB: Account = createAccountB();
        const accountC: Account = createAccountC();
        const accountD: Account = createAccountD();
        await repository.save(accountA);
        await repository.save(accountB);
        await repository.save(accountC);
        await repository.save(accountD);
        const accounts = await repository.searchAllAccountsFromUser(userAId);
        expect(accounts).not.toBeNull();
        expect(accounts?.length).toEqual(3);
        expect(accounts?.some((account) => account.id.value ===
            accountA.id.value)).toBeTruthy();
        expect(accounts?.some((account) => account.id.value ===
            accountB.id.value)).toBeTruthy();
        expect(accounts?.some((account) => account.id.value ===
            accountC.id.value)).toBeTruthy();
    });
});

