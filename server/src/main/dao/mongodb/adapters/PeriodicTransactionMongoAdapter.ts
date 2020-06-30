import PeriodicTransactionPersistenceAdapter from "../../PeriodicTransactionPersistenceAdapter";
import PeriodicTransaction from "../../../core/model/PeriodicTransaction";
import PeriodicTransactionSchema from '../models/PeriodicTransactionSchema'
import * as MongoSearcher from '../MongoSearcher';
import User from "../../../core/model/User";

class PeriodicTransactionMongoAdapter implements PeriodicTransactionPersistenceAdapter{
    createPeriodicTransaction(periodicTransaction:PeriodicTransaction, user:User):Promise<PeriodicTransaction>{
        let periodicTransactionDocument:any = new PeriodicTransactionSchema(periodicTransaction);
        periodicTransactionDocument.user = user.getId();
        return MongoSearcher.publish(periodicTransactionDocument);
    }
    searchPeriodicTransactionByID(id:any):Promise<PeriodicTransaction> {
        return MongoSearcher.consultByID(PeriodicTransactionSchema, id);

    }
    searchPeriodicTransactionByParams(params:any):Promise<PeriodicTransaction[]>{
        return MongoSearcher.consult(PeriodicTransactionSchema, params);
    }

    modifyPeriodicTransaction(periodicTransaction:PeriodicTransaction):Promise<PeriodicTransaction>{
        return MongoSearcher.modify(PeriodicTransactionSchema, periodicTransaction, ()=>{});
    }

    removePeriodicTransaction(id:any):void{
        MongoSearcher.remove(PeriodicTransactionSchema, id);
    }
}

const periodicTransactionMongoAdapter: PeriodicTransactionMongoAdapter = new PeriodicTransactionMongoAdapter();
export default periodicTransactionMongoAdapter;