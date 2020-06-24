import UserPersistenceAdapter from "../../UserPersistenceAdapter";
import AccountPersistenceAdapter from "../../AccountPersistenceAdapter";
import TagPersistenceAdapter from "../../TagPersistenceAdapter";
import TransactionPersistenceAdapter from "../../TransactionPersistenceAdapter";
import PersistenceAdapter from "../../PersistenceAdapter";
import userMongoAdapter from "./UserMongoAdapter";
import accountMongoAdapter from "./AccountMongoAdapter";
import tagMongoAdapter from "./TagMongoAdapter";
import transactionMongoAdapter from "./TransactionMongoAdapter";
import PeriodicTransactionPersistenceAdapter from "../../PeriodicTransactionPersistenceAdapter";
import periodicTransactionMongoAdapter from "./PeriodicTransactionMongoAdapter";

export default class MongoPersistenceAdapter implements PersistenceAdapter{

    getUserAdapter():UserPersistenceAdapter{
        return userMongoAdapter;
    }
    
    getAccountAdapter():AccountPersistenceAdapter{
        return accountMongoAdapter;
    }

    getTagAdapter():TagPersistenceAdapter{
        return tagMongoAdapter;
    }

    getTransactionAdapter():TransactionPersistenceAdapter{
        return transactionMongoAdapter;
    }

    getPeriodicTransactionAdapter():PeriodicTransactionPersistenceAdapter{
        return periodicTransactionMongoAdapter;
    }
}