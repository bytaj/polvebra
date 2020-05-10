import Account from "../core/model/Account";


export default interface AccountPersistenceAdapter{
    createAccount(account:Account):Account|void;
    searchAccountByID(id:any):Account|void;
    searchAccountByParams(params:any):Account[]|void;
    modifyAccount(id: any, account:Account):Account|void;
    removeAccount(id:any):void;
}