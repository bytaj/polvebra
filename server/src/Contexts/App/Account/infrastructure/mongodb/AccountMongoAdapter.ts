import AccountPersistenceAdapter from "../../domain/AccountPersistenceAdapter";
import Account from "../../domain/Account";
import AccountSchema from './AccountSchema'
import * as MongoSearcher from '../../../../../../polvebra/src/bytaj/main/shared/infrastructure/mongodb/MongoSearcher';
import User from "../../../User/domain/User";

class AccountMongoAdapter implements AccountPersistenceAdapter{
    createAccount(account:Account, user:User):Promise<Account>{
        let accountDocument:any = new AccountSchema(account);
        accountDocument.user = user.getId();
        return MongoSearcher.publish(accountDocument);
    }

    searchAccountByID(id:any):Promise<Account> {
        return MongoSearcher.consultByID(AccountSchema, id);
    }

    searchAccountByParams(params:any):Promise<Account[]>{
        return MongoSearcher.consult(AccountSchema, params);
    }

    modifyAccount(account:Account):Promise<Account>{
        return MongoSearcher.modify(AccountSchema, account, ()=>{});
    }

    removeAccount(id:any):void{
        MongoSearcher.remove(AccountSchema, id);
    }
}

const accountMongoAdapter: AccountMongoAdapter = new AccountMongoAdapter();
export default accountMongoAdapter;