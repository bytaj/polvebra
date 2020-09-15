import { logger } from 'bs-logger';
import Logger from '../../../Shared/domain/Logger';
import { UserId } from '../../Shared/domain/User/UserId';
import { Email } from '../domain/Email';
import { Name } from '../domain/Name';
import { Password } from '../domain/Password';
import User from '../domain/User';
import { Username } from '../domain/Username';
import UserRepository from '../domain/UserRepository';

type Params = {
    id: string;
    username:string;
    name: string;
    email:string;
    passwordA: string;
    passwordB: string;
};

export class  UserCreator {
    private repository: UserRepository;
    private logger: Logger;

    constructor(repository: UserRepository, logger: Logger) {
        this.repository = repository;
        this.logger = logger;
    }

    async run({ id, username, name, email, passwordA, passwordB}: Params): Promise<User> {
        Password.verifyPassword(passwordA, passwordB);
        const password = Password.encryptPassword(passwordA);
        const user = User.create(new UserId(id), new Username(username), new Name(name), new Email(email), new Password(password));
        await this.repository.save(user);
        logger.info("User " + name + " created successfully!");
        return user;
    }
}
