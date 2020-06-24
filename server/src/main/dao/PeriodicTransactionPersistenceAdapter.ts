import PeriodicTransaction from "../core/model/PeriodicTransaction";


export default interface PeriodicTransactionPersistenceAdapter{
    createPeriodicTransaction(periodicTransaction:PeriodicTransaction):Promise<PeriodicTransaction>;
    searchPeriodicTransactionByID(id:any):Promise<PeriodicTransaction>;
    searchPeriodicTransactionByParams(params:any):Promise<PeriodicTransaction[]>;
    modifyPeriodicTransaction(periodicTransaction:PeriodicTransaction):Promise<PeriodicTransaction>;
    removePeriodicTransaction(id:any):void;
}