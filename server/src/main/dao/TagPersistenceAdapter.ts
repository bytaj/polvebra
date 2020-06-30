import Tag from "../core/model/Tag";
import User from "../core/model/User";

export default interface TagPersistenceAdapter{
    createTag(tag:Tag, user?:User):Promise<Tag>;
    searchTagByID(id:any):Promise<Tag>;
    searchTagByParams(params:any):Promise<Tag[]>;
    searchAllTagsFromAUser(userID: any):Promise<Tag[]>;
    modifyTag(tag:Tag):Promise<Tag>;
    removeTag(id:any):void;
}