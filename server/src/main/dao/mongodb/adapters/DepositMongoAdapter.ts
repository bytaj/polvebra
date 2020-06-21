import DepositPersistenceAdapter from "../../DepositPersistenceAdapter";
import Deposit from "../../../core/model/Deposit";
import DepositSchema from '../models/DepositSchema'
import * as MongoSearcher from '../MongoSearcher';

class DepositMongoAdapter implements DepositPersistenceAdapter{
    createDeposit(deposit:Deposit):Promise<Deposit|void>{
        return MongoSearcher.publish(DepositSchema, deposit);
    }
    searchDepositByID(id:any):Deposit|void {
        let promise:Promise<Deposit> = MongoSearcher.consultByID(DepositSchema, id);
        promise.then(deposit => {return deposit})
                .catch((err) => {
                    console.log(err);
                    return null;
                });
    }
    searchDepositByParams(params:any):Deposit[]|void{
        let promise:Promise<Deposit[]> = MongoSearcher.consult(DepositSchema, params);
        promise.then(depositArray => {return depositArray})
                .catch((err) => {
                    console.log(err);
                    return null;
                });
    }

    modifyDeposit(id: any, deposit:Deposit):Deposit|void{
        MongoSearcher.modify(DepositSchema, id, deposit);
    }

    removeDeposit(id:any):void{
        MongoSearcher.remove(DepositSchema, id);
    }
}

const depositMongoAdapter: DepositMongoAdapter = new DepositMongoAdapter();
export default depositMongoAdapter;