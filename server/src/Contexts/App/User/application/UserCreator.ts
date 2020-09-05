import { logger } from 'bs-logger';
import { UnauthorizedAccessException } from '../../../Shared/domain/exceptions/UnauthorizedAccessException';
import Logger from '../../../Shared/domain/Logger';
import { UserType } from '../../Shared/domain/User/UserType';
import User from '../domain/User';
import UserRepository from '../domain/UserRepository';

type Params = {
    id: string;
    username:string;
    name: string;
    email:string;
    password: string;
};

export class  UserCreator {
    private repository: UserRepository;
    private logger: Logger;

    constructor(repository: UserRepository, logger: Logger) {
        this.repository = repository;
        this.logger = logger;
    }

    async run({ id, username, name, email, password}: Params, userType:UserType): Promise<User> {
        if (userType!=UserType.ADMIN){
            throw new UnauthorizedAccessException();
        }

        const user = User.fromPrimitives({ id, username, name, email, password});


        await this.repository.save(user);
        logger.info("User " + name + " created successfully!");
        return user;
    }
}
