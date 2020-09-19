import { logger } from 'bs-logger';
import Logger from '../../../Shared/domain/Logger';
import Account from '../../Account/domain/Account';
import { AccountName } from '../../Account/domain/AccountName';
import AccountRepository from '../../Account/domain/AccountRepository';
import { AccountId } from '../../Shared/domain/Account/AccountId';
import { TagId } from '../../Shared/domain/Tag/TagId';
import { UserId } from '../../Shared/domain/User/UserId';
import Tag from '../../Tag/domain/Tag';
import { TagDescription } from '../../Tag/domain/TagDescription';
import { TagName } from '../../Tag/domain/TagName';
import TagRepository from '../../Tag/domain/TagRepository';
import { Email } from '../domain/Email';
import { Name } from '../domain/Name';
import { Password } from '../domain/Password';
import User from '../domain/User';
import { Username } from '../domain/Username';
import UserRepository from '../domain/UserRepository';

type Params = {
    id: string;
    username: string;
    name: string;
    email: string;
    passwordA: string;
    passwordB: string;
};

export class UserCreator {

    constructor(private repository: UserRepository,
                private accountRepository: AccountRepository,
                private tagRepository: TagRepository,
                private logger: Logger) {
    }

    async run({id, username, name, email, passwordA, passwordB}: Params): Promise<User> {
        Password.verifyPassword(passwordA, passwordB);
        const password = Password.encryptPassword(passwordA);
        const userId = new UserId(id);
        const user = User.create(userId,
                                 new Username(username),
                                 new Name(name),
                                 new Email(email),
                                 new Password(password));
        await this.repository.save(user);
        const defaultAccount: Account = Account.create(AccountId.random(), userId, new AccountName('Default Account'));
        const defaultTag: Tag = Tag.create(TagId.random(),
                                           userId,
                                           null,
                                           new TagName('Default Tag'),
                                           new TagDescription('The default Tag from any user'));
        this.accountRepository.save(defaultAccount);
        this.tagRepository.save(defaultTag);
        logger.info('User ' +
                        username +
                        ' created successfully!');
        return user;
    }
}
