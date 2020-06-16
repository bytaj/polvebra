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

    loginUser(name: String, password:String):User|null{
        let userList = this.searchUserByParams({name, password})
        return userList == null ? null : userList[0];
    }
}

const userMongoAdapter: UserMongoAdapter = new UserMongoAdapter();
export default userMongoAdapter;