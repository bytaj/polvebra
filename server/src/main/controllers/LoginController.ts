import logger from '../helpers/LoggerFactory';
import { getPersistenceController } from './PersistenceController';
import User from '../core/model/User';

export async function loginUser(username: string, password: string):Promise<User|void>{
    let user; 
    try{
        user = await getPersistenceController().getUserAdapter().searchUserByParams({'username': username, 'password':password});
    }catch(err){
        console.log(err);
    }
    return user == undefined ? undefined : user[0];
}

export function createUser(value:any):User|void{
    let user: User = <User> value;
    return getPersistenceController().getUserAdapter().createUser(user);
}