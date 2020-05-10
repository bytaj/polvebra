import Outlay from "../core/model/Outlay";


export default interface OutlayPersistenceAdapter{
    createOutlay(outlay:Outlay):Outlay|void;
    searchOutlayByID(id:any):Outlay|void;
    searchOutlayByParams(params:any):Outlay[]|void;
    modifyOutlay(id: any, outlay:Outlay):Outlay|void;
    removeOutlay(id:any):void;
}