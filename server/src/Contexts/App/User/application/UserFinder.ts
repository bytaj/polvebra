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
            if (this.hasPermission(userPetition, userId)){
                users = await this.findOneUser(userId);
            }else{
                throw new UnauthorizedAccessException();
            }
        }else{
            users = await this.findAllUsers(userPetition);
        }
        return users;
    }

    hasPermission(userPetition:UserPetition, userAsked:UserId):boolean{
        if(userPetition.type == UserType.USER){
            return userPetition.id.value == userAsked.value;
        }else{
            return true;
        }
    }

    private async findOneUser(userId: UserId):Promise<Nullable<User[]>>{
        return this.repository.search(userId).then((user) => {
            if (user){
                return [user];
            }else{
                return null;
            }
        });
    }

    private async findAllUsers(userPetition:UserPetition):Promise<Nullable<User[]>>{
        if (UserType.USER == userPetition.type){
            return this.findOneUser(userPetition.id);
        }else{
            return this.repository.searchAll();
        }

    }
}
