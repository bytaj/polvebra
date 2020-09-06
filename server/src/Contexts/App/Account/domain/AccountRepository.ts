import { Nullable } from '../../../Shared/domain/Nullable';
import { AccountId } from '../../Shared/domain/Account/AccountId';
import { UserId } from '../../Shared/domain/User/UserId';
import Account from './Account';


export default interface AccountRepository{
    save(client: Account): Promise<void>;

    search(id: AccountId): Promise<Nullable<Account>>;

    searchAll(): Promise<Nullable<Account[]>>;

    searchAllAccountsFromUser(id:UserId): Promise<Nullable<Account[]>>;
}