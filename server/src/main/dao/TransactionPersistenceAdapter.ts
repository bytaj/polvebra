import Deposit from "../core/model/Deposit";
import Outlay from "../core/model/Outlay";
import AbstractTransaction from "../core/model/AbstractTransaction";
import Account from "../core/model/Account";


export default interface TransactionPersistenceAdapter{
    createDeposit(deposit:Deposit, account:Account):Promise<Deposit>;
    createOutlay(deposit:Outlay, account:Account):Promise<Outlay>;
    searchTransactionByID(id:any):Promise<AbstractTransaction>;
    searchTransactionByParams(params:any):Promise<AbstractTransaction[]>;
    modifyTransaction(transaction:AbstractTransaction):Promise<AbstractTransaction>;
    removeTransaction(id:any):void;
}