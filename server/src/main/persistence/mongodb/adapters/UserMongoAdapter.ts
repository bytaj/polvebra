import UserPersistenceAdapter from "../../UserPersistenceAdapter";
import User from "../../../core/model/User";
import UserSchema from '../models/UserSchema'
import * as MongoSearcher from '../MongoSearcher';

class UserMongoAdapter implements UserPersistenceAdapter{
    createUser(user:User):User|void{
        return MongoSearcher.publish(UserSchema, user);
    }
    searchUserByID(id:any):User|void {
        let promise:Promise<User> = MongoSearcher.consultByID(UserSchema, id);
        promise.then(user => {return user})
                .catch((err) => {
                    console.log(err);
                    return null;
                });
    }
    searchUserByParams(params:any):User[]|void{
        let promise:Promise<User[]> = MongoSearcher.consult(UserSchema, params);
        promise.then(userArray => {return userArray})
                .catch((err) => {
                    console.log(err);
                    return null;
                });
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