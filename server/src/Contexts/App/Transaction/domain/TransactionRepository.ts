import { Nullable } from '../../../Shared/domain/Nullable';
import { AccountId } from '../../Shared/domain/Account/AccountId';
import { TransactionId } from '../../Shared/domain/Transaction/TransactionId';
import { UserId } from '../../Shared/domain/User/UserId';
import Transaction from './Transaction';


export default interface TransactionRepository{
    save(transaction: Transaction): Promise<void>;

    search(id: TransactionId): Promise<Nullable<Transaction>>;

    searchAll(): Promise<Nullable<Transaction[]>>;

    searchAllTransactionsFromUser(id:UserId): Promise<Nullable<Transaction[]>>;

    searchAllTransactionsFromAccount(id: AccountId) : Promise<Nullable<Transaction[]>>;

    searchSubTransaction(id: TransactionId): Promise<Nullable<Transaction[]>>;
}