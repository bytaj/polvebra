import logger from '../helpers/LoggerFactory';
import { getPersistenceController } from './PersistenceController';
import User from '../core/model/User';

export function loginUser(username: string, password: string):User|void{
    let user = getPersistenceController().getUserAdapter().searchUserByParams({'username': username, 'password':password})
    return user == undefined ? undefined : user[0];
}

export function createUser(value:any):User|void{
    let user: User = <User> value;
    return getPersistenceController().getUserAdapter().createUser(user);
}