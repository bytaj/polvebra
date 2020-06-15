import User from "../core/model/User";


export default interface UserPersistenceAdapter{
    createUser(user:User):User|void;
    searchUserByID(id:any):User|void;
    searchUserByParams(params:any):User[]|void;
    modifyUser(id: any, user:User):User|void;
    removeUser(id:any):void;
    loginUser(name: String, password:String):User|null ;
}