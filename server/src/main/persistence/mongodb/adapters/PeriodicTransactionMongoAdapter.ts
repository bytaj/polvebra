import PeriodicTransactionPersistenceAdapter from "../../PeriodicTransactionPersistenceAdapter";
import PeriodicTransaction from "../../../core/model/PeriodicTransaction";
import PeriodicTransactionSchema from '../models/PeriodicTransactionSchema'
import * as MongoSearcher from '../MongoSearcher';

class PeriodicTransactionMongoAdapter implements PeriodicTransactionPersistenceAdapter{
    createPeriodicTransaction(periodicTransaction:PeriodicTransaction):PeriodicTransaction|void{
        return MongoSearcher.publish(PeriodicTransactionSchema, periodicTransaction);
    }
    searchPeriodicTransactionByID(id:any):PeriodicTransaction|void {
        let promise:Promise<PeriodicTransaction> = MongoSearcher.consultByID(PeriodicTransactionSchema, id);
        promise.then(periodicTransaction => {return periodicTransaction})
                .catch((err) => {
                    console.log(err);
                    return null;
                });
    }
    searchPeriodicTransactionByParams(params:any):PeriodicTransaction[]|void{
        let promise:Promise<PeriodicTransaction[]> = MongoSearcher.consult(PeriodicTransactionSchema, params);
        promise.then(periodicTransactionArray => {return periodicTransactionArray})
                .catch((err) => {
                    console.log(err);
                    return null;
                });
    }

    modifyPeriodicTransaction(id: any, periodicTransaction:PeriodicTransaction):PeriodicTransaction|void{
        MongoSearcher.modify(PeriodicTransactionSchema, id, periodicTransaction);
    }

    removePeriodicTransaction(id:any):void{
        MongoSearcher.remove(PeriodicTransactionSchema, id);
    }
}

const periodicTransactionMongoAdapter: PeriodicTransactionMongoAdapter = new PeriodicTransactionMongoAdapter();
export default periodicTransactionMongoAdapter;