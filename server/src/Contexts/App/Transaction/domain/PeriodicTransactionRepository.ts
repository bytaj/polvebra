import { Nullable } from '../../../Shared/domain/Nullable';
import { AccountId } from '../../Shared/domain/Account/AccountId';
import { PeriodicTransactionId } from '../../Shared/domain/Transaction/PeriodicTransactionId';
import { UserId } from '../../Shared/domain/User/UserId';
import PeriodicTransaction from './PeriodicTransaction';


export default interface PeriodicTransactionRepository{
    save(periodicTransaction: PeriodicTransaction): Promise<void>;

    search(id: PeriodicTransactionId): Promise<Nullable<PeriodicTransaction>>;

    searchAll(): Promise<Nullable<PeriodicTransaction[]>>;

    searchAllPeriodicTransactionsFromUser(id:UserId): Promise<Nullable<PeriodicTransaction[]>>;

    searchAllPeriodicTransactionsFromAccount(id: AccountId) : Promise<Nullable<PeriodicTransaction[]>>;

    update(id:PeriodicTransactionId, periodicTransaction:PeriodicTransaction): Promise<void>;
}