import Account from "./Account";
import User from "../../User/domain/User";


export default interface AccountPersistenceAdapter{
    createAccount(account:Account, user:User):Promise<Account>;
    searchAccountByID(id:any):Promise<Account>;
    searchAccountByParams(params:any):Promise<Account[]>;
    modifyAccount(account:Account):Promise<Account>;
    removeAccount(id:any):void;
}