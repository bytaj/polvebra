import User from "../core/model/User";


export default interface UserPersistenceAdapter{
    createUser(user:User):Promise<User>;
    searchUserByID(id:any):Promise<User>;
    searchUserByParams(params:any):Promise<User[]>;
    modifyUser(user:User):Promise<User>;
    removeUser(id:any):void;
}