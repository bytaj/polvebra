import PeriodicTransactionPersistenceAdapter from "../../domain/PeriodicTransactionPersistenceAdapter";
import PeriodicTransaction from "../../domain/PeriodicTransaction";
import PeriodicTransactionSchema from './PeriodicTransactionSchema'
import User from "../../../User/domain/User";
import * as MongoSearcher from '../../../../../../polvebra/src/bytaj/main/shared/infrastructure/mongodb/MongoSearcher';

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