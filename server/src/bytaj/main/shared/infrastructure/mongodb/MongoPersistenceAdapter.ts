import UserPersistenceAdapter from "../../../user/domain/UserPersistenceAdapter";
import AccountPersistenceAdapter from "../../../account/domain/AccountPersistenceAdapter";
import TagPersistenceAdapter from "../../../tag/domain/TagPersistenceAdapter";
import TransactionPersistenceAdapter from "../../../transaction/domain/TransactionPersistenceAdapter";
import PersistenceAdapter from "../../../transaction/domain/PersistenceAdapter";
import userMongoAdapter from "../../../user/infrastructure/mongodb/UserMongoAdapter";
import accountMongoAdapter from "../../../account/infrastructure/mongodb/AccountMongoAdapter";
import tagMongoAdapter from "../../../tag/infrastructure/mongodb/TagMongoAdapter";
import transactionMongoAdapter from "../../../transaction/infrastructure/mongodb/TransactionMongoAdapter";
import PeriodicTransactionPersistenceAdapter from "../../../transaction/domain/PeriodicTransactionPersistenceAdapter";
import periodicTransactionMongoAdapter from "../../../transaction/infrastructure/mongodb/PeriodicTransactionMongoAdapter";

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