import container from '../../../../../src/apps/backend/config/dependency-injection';
import { AccountId } from '../../../../../src/Contexts/App/Shared/domain/Account/AccountId';
import { TagId } from '../../../../../src/Contexts/App/Shared/domain/Tag/TagId';
import { PeriodicTransactionId } from '../../../../../src/Contexts/App/Shared/domain/Transaction/PeriodicTransactionId';
import { UserId } from '../../../../../src/Contexts/App/Shared/domain/User/UserId';
import PeriodicTransaction from '../../../../../src/Contexts/App/Transaction/domain/PeriodicTransaction';
import PeriodicTransactionRepository from '../../../../../src/Contexts/App/Transaction/domain/PeriodicTransactionRepository';
import { DuplicateKeyException } from '../../../../../src/Contexts/Shared/domain/exceptions/DuplicateKeyException';
import { EnvironmentArranger } from '../../../Shared/infrastructure/arranger/EnvironmentArranger';

const repository: PeriodicTransactionRepository = container.get(
    'Polvebra.transaction.PeriodicTransactionRepository');
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
const tagAId: TagId = TagId.random();
const tagBId: TagId = TagId.random();
const periodicTransactionAId: PeriodicTransactionId = PeriodicTransactionId.random();
const periodicTransactionBId: PeriodicTransactionId = PeriodicTransactionId.random();
const periodicTransactionCId: PeriodicTransactionId = PeriodicTransactionId.random();
const periodicTransactionDId: PeriodicTransactionId = PeriodicTransactionId.random();

function createPeriodicTransactionA(): PeriodicTransaction {
    return PeriodicTransaction.fromPrimitives({
                                                  id: periodicTransactionAId.value,
                                                  userId: userAId.value,
                                                  accountId: accountAId.value,
                                                  tagId: tagAId.value,
                                                  name: 'PeriodicTransaction A',
                                                  amount: 123,
                                                  interval: 1,
                                                  lastDate: '2020-01-01',
                                                  beginDate: '2020-01-01',
                                                  endDate: '2020-01-01'
                                              });
}

function createPeriodicTransactionB(): PeriodicTransaction {
    return PeriodicTransaction.fromPrimitives({
                                                  id: periodicTransactionBId.value,
                                                  userId: userBId.value,
                                                  accountId: accountAId.value,
                                                  tagId: tagAId.value,
                                                  name: 'PeriodicTransaction A',
                                                  amount: 123,
                                                  interval: 1,
                                                  lastDate: '2020-01-01',
                                                  beginDate: '2020-01-01',
                                                  endDate: '2020-01-01'
                                              });
}

function createPeriodicTransactionC(): PeriodicTransaction {
    return PeriodicTransaction.fromPrimitives({
                                                  id: periodicTransactionCId.value,
                                                  userId: userAId.value,
                                                  accountId: accountAId.value,
                                                  tagId: tagBId.value,
                                                  name: 'PeriodicTransaction A',
                                                  amount: 123,
                                                  interval: 1,
                                                  lastDate: '2020-01-01',
                                                  beginDate: '2020-01-01',
                                                  endDate: '2020-01-01'
                                              });

}

function createPeriodicTransactionD(): PeriodicTransaction {
    return PeriodicTransaction.fromPrimitives({
                                                  id: periodicTransactionDId.value,
                                                  userId: userBId.value,
                                                  accountId: accountBId.value,
                                                  tagId: tagAId.value,
                                                  name: 'PeriodicTransaction D',
                                                  amount: 123,
                                                  interval: 1,
                                                  lastDate: '2020-01-01',
                                                  beginDate: '2020-01-01',
                                                  endDate: '2020-01-01'
                                              });
}


describe('Save PeriodicTransaction', () => {
    it('should save a periodicTransaction', async () => {
        let periodicTransaction = createPeriodicTransactionA();
        await repository.save(periodicTransaction);
    });

    it('shouldn\'t create two times same id', async () => {
        expect.assertions(1);
        const periodicTransactionA = createPeriodicTransactionA();
        await repository.save(periodicTransactionA);
        const periodicTransactionB = PeriodicTransaction.fromPrimitives({
                                                                            id: periodicTransactionAId.value,
                                                                            userId: userBId.value,
                                                                            accountId: accountAId.value,
                                                                            tagId: tagAId.value,
                                                                            name: 'PeriodicTransaction A',
                                                                            amount: 123,
                                                                            interval: 1,
                                                                            lastDate: '2020-01-01',
                                                                            beginDate: '2020-01-01',
                                                                            endDate: '2020-01-01'
                                                                        });
        return expect(repository.save(periodicTransactionB)).rejects.toThrow(DuplicateKeyException);
    });
});

describe('Find PeriodicTransactions', () => {
    it('Find one periodicTransaction without parent in DB by ID', async () => {
        const periodicTransactionAPreSaved = createPeriodicTransactionA();
        const periodicTransactionID: UserId = periodicTransactionAPreSaved.id;
        await repository.save(periodicTransactionAPreSaved);
        const periodicTransactionASaved = await repository.search(periodicTransactionID);
        expect(periodicTransactionASaved).not.toBeNull();
        expect(periodicTransactionAPreSaved.id.value).toEqual(periodicTransactionAId.value);
        expect(periodicTransactionAPreSaved.userId.value).toEqual(userAId.value);
        expect(periodicTransactionAPreSaved.accountId.value).toEqual(accountAId.value);
        expect(periodicTransactionAPreSaved.tagId.value).toEqual(tagAId.value);
        expect(periodicTransactionAPreSaved.name.value).toEqual('PeriodicTransaction A');
        expect(periodicTransactionAPreSaved.amount.value).toEqual(123);
        expect(periodicTransactionAPreSaved.interval.valueOf()).toEqual(1);
        expect(periodicTransactionAPreSaved.lastDate.toString()).toEqual('2020-01-01');
        expect(periodicTransactionAPreSaved.beginDate.toString()).toEqual('2020-01-01');
        expect(periodicTransactionAPreSaved.endDate?.toString()).toEqual('2020-01-01');
    });

    it('Find all the periodicTransactions', async () => {
        const periodicTransactionA: PeriodicTransaction = createPeriodicTransactionA();
        const periodicTransactionB: PeriodicTransaction = createPeriodicTransactionB();
        const periodicTransactionC: PeriodicTransaction = createPeriodicTransactionC();
        const periodicTransactionD: PeriodicTransaction = createPeriodicTransactionD();
        await repository.save(periodicTransactionA);
        await repository.save(periodicTransactionB);
        await repository.save(periodicTransactionC);
        await repository.save(periodicTransactionD);
        const clients = await repository.searchAll();
        expect(clients).not.toBeNull();
        expect(clients?.length).toEqual(4);
    });

    it('Find all the periodicTransactions from one User', async () => {
        const periodicTransactionA: PeriodicTransaction = createPeriodicTransactionA();
        const periodicTransactionB: PeriodicTransaction = createPeriodicTransactionB();
        const periodicTransactionC: PeriodicTransaction = createPeriodicTransactionC();
        const periodicTransactionD: PeriodicTransaction = createPeriodicTransactionD();
        await repository.save(periodicTransactionA);
        await repository.save(periodicTransactionB);
        await repository.save(periodicTransactionC);
        await repository.save(periodicTransactionD);
        const periodicTransactions = await repository.searchAllPeriodicTransactionsFromUser(userAId);
        expect(periodicTransactions).not.toBeNull();
        expect(periodicTransactions?.length).toEqual(2);
        expect(periodicTransactions?.some((periodicTransaction) => periodicTransaction.id.value ===
            periodicTransactionA.id.value)).toBeTruthy();
        expect(periodicTransactions?.some((periodicTransaction) => periodicTransaction.id.value ===
            periodicTransactionC.id.value)).toBeTruthy();
    });

    it('Find all the periodicTransactions from one Account', async () => {
        const periodicTransactionA: PeriodicTransaction = createPeriodicTransactionA();
        const periodicTransactionB: PeriodicTransaction = createPeriodicTransactionB();
        const periodicTransactionC: PeriodicTransaction = createPeriodicTransactionC();
        const periodicTransactionD: PeriodicTransaction = createPeriodicTransactionD();
        await repository.save(periodicTransactionA);
        await repository.save(periodicTransactionB);
        await repository.save(periodicTransactionC);
        await repository.save(periodicTransactionD);
        const periodicTransactions = await repository.searchAllPeriodicTransactionsFromAccount(accountAId);
        expect(periodicTransactions).not.toBeNull();
        expect(periodicTransactions?.length).toEqual(3);
        expect(periodicTransactions?.some((periodicTransaction) => periodicTransaction.id.value ===
            periodicTransactionA.id.value)).toBeTruthy();
        expect(periodicTransactions?.some((periodicTransaction) => periodicTransaction.id.value ===
            periodicTransactionB.id.value)).toBeTruthy();
        expect(periodicTransactions?.some((periodicTransaction) => periodicTransaction.id.value ===
            periodicTransactionC.id.value)).toBeTruthy();
    });
});

