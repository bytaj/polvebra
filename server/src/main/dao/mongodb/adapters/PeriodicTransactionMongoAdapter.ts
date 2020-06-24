import PeriodicTransactionPersistenceAdapter from "../../PeriodicTransactionPersistenceAdapter";
import PeriodicTransaction from "../../../core/model/PeriodicTransaction";
import PeriodicTransactionSchema from '../models/PeriodicTransactionSchema'
import * as MongoSearcher from '../MongoSearcher';

class PeriodicTransactionMongoAdapter implements PeriodicTransactionPersistenceAdapter{
    createPeriodicTransaction(periodicTransaction:PeriodicTransaction):Promise<PeriodicTransaction>{
        return MongoSearcher.publish(PeriodicTransactionSchema, periodicTransaction);
    }
    searchPeriodicTransactionByID(id:any):Promise<PeriodicTransaction> {
        return MongoSearcher.consultByID(PeriodicTransactionSchema, id);

    }
    searchPeriodicTransactionByParams(params:any):Promise<PeriodicTransaction[]>{
        return MongoSearcher.consult(PeriodicTransactionSchema, params);
    }

    modifyPeriodicTransaction(periodicTransaction:PeriodicTransaction):Promise<PeriodicTransaction>{
        return MongoSearcher.modify(PeriodicTransactionSchema, periodicTransaction);
    }

    removePeriodicTransaction(id:any):void{
        MongoSearcher.remove(PeriodicTransactionSchema, id);
    }
}

const periodicTransactionMongoAdapter: PeriodicTransactionMongoAdapter = new PeriodicTransactionMongoAdapter();
export default periodicTransactionMongoAdapter;