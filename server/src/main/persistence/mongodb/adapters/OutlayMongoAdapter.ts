import OutlayPersistenceAdapter from "../../OutlayPersistenceAdapter";
import Outlay from "../../../core/model/Outlay";
import OutlaySchema from '../models/OutlaySchema'
import * as MongoSearcher from '../MongoSearcher';

class OutlayMongoAdapter implements OutlayPersistenceAdapter{
    createOutlay(outlay:Outlay):Outlay|void{
        return MongoSearcher.publish(OutlaySchema, outlay);
    }
    searchOutlayByID(id:any):Outlay|void {
        let promise:Promise<Outlay> = MongoSearcher.consultByID(OutlaySchema, id);
        promise.then(outlay => {return outlay})
                .catch((err) => {
                    console.log(err);
                    return null;
                });
    }
    searchOutlayByParams(params:any):Outlay[]|void{
        let promise:Promise<Outlay[]> = MongoSearcher.consult(OutlaySchema, params);
        promise.then(outlayArray => {return outlayArray})
                .catch((err) => {
                    console.log(err);
                    return null;
                });
    }

    modifyOutlay(id: any, outlay:Outlay):Outlay|void{
        MongoSearcher.modify(OutlaySchema, id, outlay);
    }

    removeOutlay(id:any):void{
        MongoSearcher.remove(OutlaySchema, id);
    }
}

const outlayMongoAdapter: OutlayMongoAdapter = new OutlayMongoAdapter();
export default outlayMongoAdapter;