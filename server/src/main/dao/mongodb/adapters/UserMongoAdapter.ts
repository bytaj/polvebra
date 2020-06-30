import UserPersistenceAdapter from "../../UserPersistenceAdapter";
import User from "../../../core/model/User";
import UserSchema from '../models/UserSchema'
import * as MongoSearcher from '../MongoSearcher';
import UserFactory from "../../../core/factory/UserFactory";
import { Document } from "mongoose";
import { getPersistenceController } from "../../../controllers/PersistenceController";
import Tag from "../../../core/model/Tag";
import loggerFactory from "../../../helpers/LoggerFactory";

const modifyUserFunction = (user: User, dbUser:any):any => {
    if (user.getId() != dbUser._id.toString()){
        throw new Error('id can be changed');
    }
    
    if (user.getUsername() != dbUser.username){
        throw new Error('username can be changed');
    }
}

class UserMongoAdapter implements UserPersistenceAdapter{

    private async recoverUser (doc:any): Promise<User>{
        let userRecovered:User;
        userRecovered = await User.createUserFromJSON(doc);
        let tags:Tag[] = await getPersistenceController().getTagAdapter().searchAllTagsFromAUser(userRecovered.getId());
        userRecovered.setTags(tags);
        return userRecovered;
    }

    async createUser(user:User):Promise<User>{
        var elementToPublish = new UserSchema(user);
        return MongoSearcher.publish(elementToPublish).then((userCreated) => {
            return User.createUserFromJSON(userCreated);
        });
    }

    async searchUserByID(id:any):Promise<User> {
        let promise:User = await MongoSearcher.consultByID(UserSchema, id);
        return await this.recoverUser(promise);
    }

    async searchUserByParams(params:any):Promise<User[]>{
        return MongoSearcher.consult(UserSchema, params).then(async (users)=>{
            let usersFound:User[] = [];
            let promises:Promise<any>[] = [];
            users.forEach(async (userMongo) => {
                promises.push(this.recoverUser(userMongo).then(userFound => {
                    usersFound.push(userFound);
                }));
            });
            await Promise.all(promises.map(p => p.catch(error => loggerFactory.logError(error))));
            return usersFound;
        });
    }

    async modifyUser(user:User):Promise<User>{

        return MongoSearcher.modify(UserSchema, user, modifyUserFunction).then((modified) => {
            
            return User.createUserFromJSON(modified);
        });
    }

    removeUser(id:any):void{
        MongoSearcher.remove(UserSchema, id);
    }
}

const userMongoAdapter: UserMongoAdapter = new UserMongoAdapter();
export default userMongoAdapter;