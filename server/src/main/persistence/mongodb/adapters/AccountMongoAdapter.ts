import AccountPersistenceAdapter from "../../AccountPersistenceAdapter";
import Account from "../../../core/model/Account";
import AccountSchema from '../models/AccountSchema'
import * as MongoSearcher from '../MongoSearcher';

class AccountMongoAdapter implements AccountPersistenceAdapter{
    createAccount(account:Account):Account|void{
        return MongoSearcher.publish(AccountSchema, account);
    }
    searchAccountByID(id:any):Account|void {
        let promise:Promise<Account> = MongoSearcher.consultByID(AccountSchema, id);
        promise.then(account => {return account})
                .catch((err) => {
                    console.log(err);
                    return null;
                });
    }
    searchAccountByParams(params:any):Account[]|void{
        let promise:Promise<Account[]> = MongoSearcher.consult(AccountSchema, params);
        promise.then(accountArray => {return accountArray})
                .catch((err) => {
                    console.log(err);
                    return null;
                });
    }

    modifyAccount(id: any, account:Account):Account|void{
        MongoSearcher.modify(AccountSchema, id, account);
    }

    removeAccount(id:any):void{
        MongoSearcher.remove(AccountSchema, id);
    }
}

const accountMongoAdapter: AccountMongoAdapter = new AccountMongoAdapter();
export default accountMongoAdapter;