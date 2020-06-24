import UserPersistenceAdapter from "../../UserPersistenceAdapter";
import User from "../../../core/model/User";
import UserSchema from '../models/UserSchema'
import * as MongoSearcher from '../MongoSearcher';
import UserFactory from "../../../core/factory/UserFactory";

class UserMongoAdapter implements UserPersistenceAdapter{
    async createUser(user:User):Promise<User>{
        return MongoSearcher.publish(UserSchema, user).then((userCreated) => {
            return UserFactory.getInstance().createUserFromJSON(userCreated);
        });
    }

    async searchUserByID(id:any):Promise<User> {
        let promise:User = await MongoSearcher.consultByID(UserSchema, id);
        return promise;
    }

    async searchUserByParams(params:any):Promise<User[]>{
        return MongoSearcher.consult(UserSchema, params).then((users)=>{
            let usersFound:User[] = [];
            users.forEach((userMongo) => {
                usersFound.push(UserFactory.getInstance().createUserFromJSON(userMongo));
            });
            return usersFound;
        });
    }

    async modifyUser(user:User):Promise<User>{
        let lastUser = await MongoSearcher.consultByID(UserSchema, user.getId());

        
        if (user.getId() != lastUser._id.toString()){
            throw new Error('id can be changed');
        }
        
        if (user.getUsername() != lastUser.username){
            throw new Error('username can be changed');
        }
        return MongoSearcher.modify(UserSchema, user).then((modified) => {
            
            return UserFactory.getInstance().createUserFromJSON(modified);
        });
    }

    removeUser(id:any):void{
        MongoSearcher.remove(UserSchema, id);
    }
}

const userMongoAdapter: UserMongoAdapter = new UserMongoAdapter();
export default userMongoAdapter;