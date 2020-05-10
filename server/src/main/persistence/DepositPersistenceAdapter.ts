import Deposit from "../core/model/Deposit";


export default interface DepositPersistenceAdapter{
    createDeposit(deposit:Deposit):Deposit|void;
    searchDepositByID(id:any):Deposit|void;
    searchDepositByParams(params:any):Deposit[]|void;
    modifyDeposit(id: any, deposit:Deposit):Deposit|void;
    removeDeposit(id:any):void;
}