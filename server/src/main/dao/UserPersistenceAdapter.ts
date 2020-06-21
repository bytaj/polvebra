import User from "../core/model/User";


export default interface UserPersistenceAdapter{
    createUser(user:User):Promise<User>;
    searchUserByID(id:any):Promise<User|void>;
    searchUserByParams(params:any):Promise<User[]|void>;
    modifyUser(id: any, user:User):User|void;
    removeUser(id:any):void;
}