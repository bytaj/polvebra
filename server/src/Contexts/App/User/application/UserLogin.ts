import { IncorrectLogin } from '../../../Shared/domain/exceptions/IncorrectLogin';
import Logger from '../../../Shared/domain/Logger';
import { LoginManager } from '../../Shared/domain/LoginManager';
import { LoginTokens } from '../../Shared/domain/LoginTokens';
import { UserType } from '../../Shared/domain/User/UserType';
import UserRepository from '../domain/UserRepository';

export class  UserLogin {
    private repository: UserRepository;
    private loginManager: LoginManager;
    private logger: Logger;

    constructor(repository: UserRepository, loginManager:LoginManager, logger: Logger) {
        this.repository = repository;
        this.loginManager = loginManager;
        this.logger = logger;
    }

    async run(user:string, password:string): Promise<LoginTokens> {
        const userId = await this.repository.loginUser(user, password);
        if (userId){
            return this.loginManager.login(userId, UserType.USER);
        }else{
            throw new IncorrectLogin();
        }
    }
}
