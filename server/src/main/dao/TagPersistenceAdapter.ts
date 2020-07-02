import Tag from "../core/model/Tag";
import User from "../core/model/User";
import { QueryInterface } from "./QueryInterface";

export default interface TagPersistenceAdapter{
    createTag(tag:Tag, user?:User):Promise<Tag>;
    searchTagByID(id:any):Promise<Tag>;
    searchTagByParams(params:QueryInterface):Promise<Tag[]>;
    searchAllTagsFromAUser(userID: any):Promise<Tag[]>;
    modifyTag(tag:Tag):Promise<Tag>;
    removeTag(id:any):void;
}