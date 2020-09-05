import PeriodicTransaction from "./PeriodicTransaction";
import User from "../../User/domain/User";


export default interface PeriodicTransactionPersistenceAdapter{
    createPeriodicTransaction(periodicTransaction:PeriodicTransaction, user:User):Promise<PeriodicTransaction>;
    searchPeriodicTransactionByID(id:any):Promise<PeriodicTransaction>;
    searchPeriodicTransactionByParams(params:any):Promise<PeriodicTransaction[]>;
    modifyPeriodicTransaction(periodicTransaction:PeriodicTransaction):Promise<PeriodicTransaction>;
    removePeriodicTransaction(id:any):void;
}