import UserPersistenceAdapter from "../../domain/UserPersistenceAdapter";
import User from "../../domain/User";
import UserSchema from './UserSchema'
import * as MongoSearcher from '../../../shared/infrastructure/mongodb/MongoSearcher';
import {getPersistenceController} from "../../../shared/application/PersistenceController";
import Tag from "../../../tag/domain/Tag";
import loggerFactory from "../../../shared/application/LoggerFactory";
import * as QueryInterface from "../../../shared/domain/QueryInterface";
import MongoQuery from "../../../shared/infrastructure/mongodb/MongoQuery";

const modifyUserFunction = (user: User, dbUser: any): any => {
    if (user.id != dbUser._id.toString()) {
        throw new Error('id can be changed');
    }

    if (user.username != dbUser.username) {
        throw new Error('username can be changed');
    }
}

class UserMongoAdapter implements UserPersistenceAdapter {

    private async recoverUser(doc: any): Promise<User> {
        let userRecovered: User;
        userRecovered = await User.createUserFromJSON(doc);
        let tags: Tag[] = await getPersistenceController()
            .getTagAdapter()
            .searchAllTagsFromAUser(userRecovered.id);
        userRecovered.tags = tags;
        return userRecovered;
    }

    async createUser(user: User): Promise<User> {
        var elementToPublish = new UserSchema(user);
        return MongoSearcher.publish(elementToPublish).then((userCreated) => {
            return User.createUserFromJSON(userCreated);
        });
    }

    async searchUserByID(id: any): Promise<User> {
        let promise: User = await MongoSearcher.consultByID(UserSchema, id);
        return await this.recoverUser(promise);
    }

    async searchUserByParams(params: MongoQuery): Promise<User[]> {
        return MongoSearcher.consult(UserSchema, params.getQuery()).then(async (users) => {
            let usersFound: User[] = [];
            let promises: Promise<any>[] = [];
            users.forEach(async (userMongo) => {
                promises.push(this.recoverUser(userMongo).then(userFound => {
                    usersFound.push(userFound);
                }));
            });
            await Promise.all(promises.map(p => p.catch(error => loggerFactory.logError(error))));
            return usersFound;
        });
    }

    async modifyUser(user: User): Promise<User> {

        return MongoSearcher.modify(UserSchema, user, modifyUserFunction).then((modified) => {

            return User.createUserFromJSON(modified);
        });
    }

    removeUser(id: any): void {
        MongoSearcher.remove(UserSchema, id);
    }
}

const userMongoAdapter: UserMongoAdapter = new UserMongoAdapter();
export default userMongoAdapter;