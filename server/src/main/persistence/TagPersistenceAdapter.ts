import Tag from "../core/model/Tag";


export default interface TagPersistenceAdapter{
    createTag(tag:Tag):Tag|void;
    searchTagByID(id:any):Tag|void;
    searchTagByParams(params:any):Tag[]|void;
    modifyTag(id: any, tag:Tag):Tag|void;
    removeTag(id:any):void;
}