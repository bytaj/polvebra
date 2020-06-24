import AccountPersistenceAdapter from "../../AccountPersistenceAdapter";
import Account from "../../../core/model/Account";
import AccountSchema from '../models/AccountSchema'
import * as MongoSearcher from '../MongoSearcher';

class AccountMongoAdapter implements AccountPersistenceAdapter{
    createAccount(account:Account):Promise<Account>{
        return MongoSearcher.publish(AccountSchema, account);
    }
    searchAccountByID(id:any):Promise<Account> {
        return MongoSearcher.consultByID(AccountSchema, id);
    }
    searchAccountByParams(params:any):Promise<Account[]>{
        return MongoSearcher.consult(AccountSchema, params);
    }

    modifyAccount(account:Account):Promise<Account>{
        return MongoSearcher.modify(AccountSchema, account);
    }

    removeAccount(id:any):void{
        MongoSearcher.remove(AccountSchema, id);
    }
}

const accountMongoAdapter: AccountMongoAdapter = new AccountMongoAdapter();
export default accountMongoAdapter;