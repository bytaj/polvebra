import Tag from "../core/model/Tag";


export default interface TagPersistenceAdapter{
    createTag(tag:Tag):Promise<Tag>;
    searchTagByID(id:any):Promise<Tag>;
    searchTagByParams(params:any):Promise<Tag[]>;
    modifyTag(tag:Tag):Promise<Tag>;
    removeTag(id:any):void;
}