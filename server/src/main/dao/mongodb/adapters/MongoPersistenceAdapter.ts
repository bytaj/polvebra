import UserPersistenceAdapter from "../../UserPersistenceAdapter";
import AccountPersistenceAdapter from "../../AccountPersistenceAdapter";
import TagPersistenceAdapter from "../../TagPersistenceAdapter";
import DepositPersistenceAdapter from "../../DepositPersistenceAdapter";
import OutlayPersistenceAdapter from "../../OutlayPersistenceAdapter";
import PersistenceAdapter from "../../PersistenceAdapter";
import userMongoAdapter from "./UserMongoAdapter";
import accountMongoAdapter from "./AccountMongoAdapter";
import tagMongoAdapter from "./TagMongoAdapter";
import depositMongoAdapter from "./DepositMongoAdapter";
import outlayMongoAdapter from "./OutlayMongoAdapter";

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

    getDepositAdapter():DepositPersistenceAdapter{
        return depositMongoAdapter;
    }
    
    getOutlayAdapter():OutlayPersistenceAdapter{
        return outlayMongoAdapter;
    }
}