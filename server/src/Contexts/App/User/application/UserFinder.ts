import { UnauthorizedAccessException } from '../../../Shared/domain/exceptions/UnauthorizedAccessException';
import Logger from '../../../Shared/domain/Logger';
import { Nullable } from '../../../Shared/domain/Nullable';
import { UserId } from '../../Shared/domain/User/UserId';
import { UserPetition } from '../../Shared/domain/User/UserPetition';
import { UserType } from '../../Shared/domain/User/UserType';
import User from '../domain/User';
import UserRepository from '../domain/UserRepository';


export class  UserFinder {
    private repository: UserRepository;
    private logger: Logger;

    constructor(repository: UserRepository, logger: Logger) {
        this.repository = repository;
        this.logger = logger;
    }

    async run(userId: Nullable<UserId>, userPetition: UserPetition): Promise<Nullable<User[]>> {
        let users: Nullable<User[]>;
        if (userId){
            if (this.hasPermission(userPetition)){
                const user = await this.findOneUser(userId);
                users = user ? [user] : null;
            }else{
                throw new UnauthorizedAccessException();
            }
        }else{
            if (this.hasPermission(userPetition)){
                users = await this.repository.searchAll();
            }else{
                const user = await this.findOneUser(userPetition.id);
                users = user ? [user] : null;
            }
        }
        return users;
    }

    hasPermission(userPetition:UserPetition):boolean{
        return userPetition.type == UserType.ADMIN;
    }

    private async findOneUser(userId: UserId):Promise<Nullable<User>>{
        return this.repository.search(userId);
    }
}
