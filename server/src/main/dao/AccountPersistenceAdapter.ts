import Account from "../core/model/Account";


export default interface AccountPersistenceAdapter{
    createAccount(account:Account):Promise<Account>;
    searchAccountByID(id:any):Promise<Account>;
    searchAccountByParams(params:any):Promise<Account[]>;
    modifyAccount(account:Account):Promise<Account>;
    removeAccount(id:any):void;
}