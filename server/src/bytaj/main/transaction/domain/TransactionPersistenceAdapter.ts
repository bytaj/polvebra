import Deposit from "./Deposit";
import Outlay from "./Outlay";
import AbstractTransaction from "./AbstractTransaction";
import Account from "../../account/domain/Account";


export default interface TransactionPersistenceAdapter{
    createDeposit(deposit:Deposit, account:Account):Promise<Deposit>;
    createOutlay(deposit:Outlay, account:Account):Promise<Outlay>;
    searchTransactionByID(id:any):Promise<AbstractTransaction>;
    searchTransactionByParams(params:any):Promise<AbstractTransaction[]>;
    modifyTransaction(transaction:AbstractTransaction):Promise<AbstractTransaction>;
    removeTransaction(id:any):void;
}