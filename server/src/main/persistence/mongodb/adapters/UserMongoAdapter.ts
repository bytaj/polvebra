import UserPersistenceAdapter from "../../UserPersistenceAdapter";
import User from "../../../core/model/User";
import UserSchema from '../models/UserSchema'
import * as MongoSearcher from '../MongoSearcher';

class UserMongoAdapter implements UserPersistenceAdapter{
    createUser(user:User):User|void{
        MongoSearcher.publish(UserSchema, user).then((user:User) => {
            return user;
        }).catch(()=> {
            return undefined;
        });
    }

    async searchUserByID(id:any):Promise<User|void> {
        let promise:User = await MongoSearcher.consultByID(UserSchema, id);
        return promise;
    }

    async searchUserByParams(params:any):Promise<User[]|void>{
        let promise:User[] = await MongoSearcher.consult(UserSchema, params);
        return promise;
        /*promise.then((userArray) => {console.log("!!!! "+ userArray[0]); return userArray})
                .catch((err) => {
                    console.log(err);
                    return undefined;
                });*/
    }

    modifyUser(id: any, user:User):User|void{
        MongoSearcher.modify(UserSchema, id, user);
    }

    removeUser(id:any):void{
        MongoSearcher.remove(UserSchema, id);
    }
}

const userMongoAdapter: UserMongoAdapter = new UserMongoAdapter();
export default userMongoAdapter;