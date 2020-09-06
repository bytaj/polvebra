import container from '../../../../../src/apps/backend/config/dependency-injection';
import { AccountId } from '../../../../../src/Contexts/App/Shared/domain/Account/AccountId';
import { TagId } from '../../../../../src/Contexts/App/Shared/domain/Tag/TagId';
import { TransactionId } from '../../../../../src/Contexts/App/Shared/domain/Transaction/TransactionId';
import { UserId } from '../../../../../src/Contexts/App/Shared/domain/User/UserId';
import Transaction from '../../../../../src/Contexts/App/Transaction/domain/Transaction';
import TransactionRepository from '../../../../../src/Contexts/App/Transaction/domain/TransactionRepository';
import { DuplicateKeyException } from '../../../../../src/Contexts/Shared/domain/exceptions/DuplicateKeyException';
import { EnvironmentArranger } from '../../../Shared/infrastructure/arranger/EnvironmentArranger';

const repository: TransactionRepository = container.get('Polvebra.transaction.TransactionRepository');
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
const transactionAId: TransactionId = TransactionId.random();
const transactionBId: TransactionId = TransactionId.random();
const transactionCId: TransactionId = TransactionId.random();
const transactionDId: TransactionId = TransactionId.random();

function createTransactionA(): Transaction {
    return Transaction.fromPrimitives({
                                          id: transactionAId.value,
                                          userId: userAId.value,
                                          accountId: accountAId.value,
                                          tagId: tagAId.value,
                                          transactionParentId: null,
                                          name: 'Transaction A',
                                          amount: 123,
                                          paid: true,
                                          subTransactionTotal: 2,
                                          date: '20/01/01'
                                      });
}

function createTransactionB(): Transaction {
    return Transaction.fromPrimitives({
                                          id: transactionBId.value,
                                          userId: userBId.value,
                                          accountId: accountAId.value,
                                          tagId: tagAId.value,
                                          transactionParentId: transactionAId.value,
                                          name: 'Transaction A',
                                          amount: 123,
                                          paid: true,
                                          subTransactionTotal: 0,
                                          date: '20/01/01'
                                      });
}

function createTransactionC(): Transaction {
    return Transaction.fromPrimitives({
                                          id: transactionCId.value,
                                          userId: userAId.value,
                                          accountId: accountAId.value,
                                          tagId: tagBId.value,
                                          transactionParentId: transactionAId.value,
                                          name: 'Transaction A',
                                          amount: 123,
                                          paid: true,
                                          subTransactionTotal: 0,
                                          date: '20/01/01'
                                      });

}function createTransactionD(): Transaction {
    return Transaction.fromPrimitives({
                                          id: transactionDId.value,
                                          userId: userBId.value,
                                          accountId: accountBId.value,
                                          tagId: tagAId.value,
                                          transactionParentId: null,
                                          name: 'Transaction D',
                                          amount: 123,
                                          paid: true,
                                          subTransactionTotal: 0,
                                          date: '20/01/01'
                                      });
}


describe('Save Transaction', () => {
    it('should save a transaction', async () => {
        let transaction = createTransactionA();
        await repository.save(transaction);
    });

    it('shouldn\'t create two times same id', async () => {
        expect.assertions(1);
        const transactionA = createTransactionA();
        await repository.save(transactionA);
        const transactionB = Transaction.fromPrimitives({
                                                            id: transactionAId.value,
                                                            userId: userBId.value,
                                                            accountId: accountAId.value,
                                                            tagId: tagAId.value,
                                                            transactionParentId: null,
                                                            name: 'Transaction A',
                                                            amount: 123,
                                                            paid: true,
                                                            subTransactionTotal: 0,
                                                            date: '01/01/20'
                                                        });
        return expect(repository.save(transactionB)).rejects.toThrow(DuplicateKeyException);
    });
});

describe('Find Transactions', () => {
    it('Find one transaction without parent in DB by ID', async () => {
        const transactionAPreSaved = createTransactionA();
        const transactionID: UserId = transactionAPreSaved.id;
        await repository.save(transactionAPreSaved);
        const transactionASaved = await repository.search(transactionID);
        expect(transactionASaved).not.toBeNull();
        expect(transactionAPreSaved.id.value).toEqual(transactionAId.value);
        expect(transactionAPreSaved.userId.value).toEqual(userAId.value);
        expect(transactionAPreSaved.accountId.value).toEqual(accountAId.value);
        expect(transactionAPreSaved.tagId.value).toEqual(tagAId.value);
        expect(transactionAPreSaved.transactionParentId).toBeNull();
        expect(transactionAPreSaved.name.value).toEqual('Transaction A');
        expect(transactionAPreSaved.amount.value).toEqual(123);
        expect(transactionAPreSaved.paid).toEqual(true);
        expect(transactionAPreSaved.subTransactionTotal.value).toEqual(2);
    });

    it('Find all the transactions', async () => {
        const transactionA: Transaction = createTransactionA();
        const transactionB: Transaction = createTransactionB();
        const transactionC: Transaction = createTransactionC();
        const transactionD: Transaction = createTransactionD();
        await repository.save(transactionA);
        await repository.save(transactionB);
        await repository.save(transactionC);
        await repository.save(transactionD);
        const clients = await repository.searchAll();
        expect(clients).not.toBeNull();
        expect(clients?.length).toEqual(4);
    });

    it('Find all the transactions from one User', async () => {
        const transactionA: Transaction = createTransactionA();
        const transactionB: Transaction = createTransactionB();
        const transactionC: Transaction = createTransactionC();
        const transactionD: Transaction = createTransactionD();
        await repository.save(transactionA);
        await repository.save(transactionB);
        await repository.save(transactionC);
        await repository.save(transactionD);
        const transactions = await repository.searchAllTransactionsFromUser(userAId);
        expect(transactions).not.toBeNull();
        expect(transactions?.length).toEqual(2);
        expect(transactions?.some((transaction) => transaction.id.value ===
            transactionA.id.value)).toBeTruthy();
        expect(transactions?.some((transaction) => transaction.id.value ===
            transactionC.id.value)).toBeTruthy();
    });

    it('Find all the transactions from one Account', async () => {
        const transactionA: Transaction = createTransactionA();
        const transactionB: Transaction = createTransactionB();
        const transactionC: Transaction = createTransactionC();
        const transactionD: Transaction = createTransactionD();
        await repository.save(transactionA);
        await repository.save(transactionB);
        await repository.save(transactionC);
        await repository.save(transactionD);
        const transactions = await repository.searchAllTransactionsFromAccount(accountAId);
        expect(transactions).not.toBeNull();
        expect(transactions?.length).toEqual(3);
        expect(transactions?.some((transaction) => transaction.id.value ===
            transactionA.id.value)).toBeTruthy();
        expect(transactions?.some((transaction) => transaction.id.value ===
            transactionB.id.value)).toBeTruthy();
        expect(transactions?.some((transaction) => transaction.id.value ===
            transactionC.id.value)).toBeTruthy();
    });

    it('Find sub transactions from one Transaction', async () => {
        const transactionA: Transaction = createTransactionA();
        const transactionB: Transaction = createTransactionB();
        const transactionC: Transaction = createTransactionC();
        const transactionD: Transaction = createTransactionD();
        await repository.save(transactionA);
        await repository.save(transactionB);
        await repository.save(transactionC);
        await repository.save(transactionD);
        const transactions = await repository.searchSubTransaction(transactionAId);
        expect(transactions).not.toBeNull();
        expect(transactions?.length).toEqual(2);
        expect(transactions?.some((transaction) => transaction.id.value ===
            transactionB.id.value)).toBeTruthy();
        expect(transactions?.some((transaction) => transaction.id.value ===
            transactionC.id.value)).toBeTruthy();
    });
});

