import User from './User';
import Account from '../../account/domain/Account';
import Tag from '../../tag/domain/Tag';

export default class UserBuilder{
    private readonly currentUser : User;

    public constructor(username:string, name:string, email:string, password:string) {
        this.currentUser = new User(username, name, email, password);
    }

    public setAccounts(accounts: Array<Account>): UserBuilder{
        this.currentUser.setAccounts(accounts);
        return this;
    }

    public setTags(tags: Array<Tag>): UserBuilder{
        this.currentUser.setTags(tags);
        return this;
    }

    public build(): User{
        return this.currentUser;
    }
}