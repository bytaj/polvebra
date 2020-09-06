import { Nullable } from '../../../Shared/domain/Nullable';
import { UserId } from '../../Shared/domain/User/UserId';
import User from './User';


export default interface UserRepository{
    save(client: User): Promise<void>;

    search(id: UserId): Promise<Nullable<User>>;

    searchAll(): Promise<Nullable<User[]>>;

    loginUser(username:string, password:string): Promise<Nullable<UserId>>;
}