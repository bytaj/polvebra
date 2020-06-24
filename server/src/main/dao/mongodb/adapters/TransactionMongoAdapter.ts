import TransactionPersistenceAdapter from "../../TransactionPersistenceAdapter";
import Deposit from "../../../core/model/Deposit"
import * as MongoSearcher from '../MongoSearcher';
import TransactionSchema from "../models/TransactionSchema";
import Outlay from "../../../core/model/Outlay";
import AbstractTransaction from "../../../core/model/AbstractTransaction";

class TransactionMongoAdapter implements TransactionPersistenceAdapter{
    createDeposit(deposit:Deposit):Promise<Deposit>{
        return MongoSearcher.publish(TransactionSchema, deposit);
    }

    createOutlay(outlay:Outlay):Promise<Outlay>{
        return MongoSearcher.publish(TransactionSchema, outlay);
    }

    searchTransactionByID(id:any):Promise<AbstractTransaction> {
        return MongoSearcher.consultByID(TransactionSchema, id);

    }
    searchTransactionByParams(params:any):Promise<AbstractTransaction[]>{
        return MongoSearcher.consult(TransactionSchema, params);
    }

    modifyTransaction(transaction:AbstractTransaction):Promise<AbstractTransaction>{
        return MongoSearcher.modify(TransactionSchema, transaction);
    }

    removeTransaction(id:any):void{
        MongoSearcher.remove(TransactionSchema, id);
    }
}

const transactionMongoAdapter: TransactionMongoAdapter = new TransactionMongoAdapter();
export default transactionMongoAdapter;