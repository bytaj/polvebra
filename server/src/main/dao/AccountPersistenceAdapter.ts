import Account from "../core/model/Account";
import User from "../core/model/User";


export default interface AccountPersistenceAdapter{
    createAccount(account:Account, user:User):Promise<Account>;
    searchAccountByID(id:any):Promise<Account>;
    searchAccountByParams(params:any):Promise<Account[]>;
    modifyAccount(account:Account):Promise<Account>;
    removeAccount(id:any):void;
}