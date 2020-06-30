import TransactionPersistenceAdapter from "../../TransactionPersistenceAdapter";
import Deposit from "../../../core/model/Deposit"
import * as MongoSearcher from '../MongoSearcher';
import TransactionSchema from "../models/TransactionSchema";
import Outlay from "../../../core/model/Outlay";
import AbstractTransaction from "../../../core/model/AbstractTransaction";
import Account from "../../../core/model/Account";
import { Document } from "mongoose";
import { DEPOSIT_CODE, OUTLAY_CODE } from "../keys";

class TransactionMongoAdapter implements TransactionPersistenceAdapter{
    private createDocumentFromTransaction(transaction:AbstractTransaction, account:Account, type:number):Document{
        let transactionDocument:any = new TransactionSchema(transaction);
        transactionDocument.account = account.getId();
        return transactionDocument;
    }
    createDeposit(deposit:Deposit, account:Account):Promise<Deposit>{
        
        return MongoSearcher.publish(this.createDocumentFromTransaction(deposit, account, DEPOSIT_CODE));
    }

    createOutlay(outlay:Outlay, account:Account):Promise<Outlay>{
        return MongoSearcher.publish(this.createDocumentFromTransaction(outlay, account, OUTLAY_CODE));
    }

    searchTransactionByID(id:any):Promise<AbstractTransaction> {
        return MongoSearcher.consultByID(TransactionSchema, id);

    }
    searchTransactionByParams(params:any):Promise<AbstractTransaction[]>{
        return MongoSearcher.consult(TransactionSchema, params);
    }

    modifyTransaction(transaction:AbstractTransaction):Promise<AbstractTransaction>{
        return MongoSearcher.modify(TransactionSchema, transaction, ()=>{});
    }

    removeTransaction(id:any):void{
        MongoSearcher.remove(TransactionSchema, id);
    }
}

const transactionMongoAdapter: TransactionMongoAdapter = new TransactionMongoAdapter();
export default transactionMongoAdapter;