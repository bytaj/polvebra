import PeriodicTransaction from "../core/model/PeriodicTransaction";


export default interface PeriodicTransactionPersistenceAdapter{
    createPeriodicTransaction(periodicTransaction:PeriodicTransaction):PeriodicTransaction|void;
    searchPeriodicTransactionByID(id:any):PeriodicTransaction|void;
    searchPeriodicTransactionByParams(params:any):PeriodicTransaction[]|void;
    modifyPeriodicTransaction(id: any, periodicTransaction:PeriodicTransaction):PeriodicTransaction|void;
    removePeriodicTransaction(id:any):void;
}