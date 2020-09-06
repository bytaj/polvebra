import Tag from "./Tag";
import User from "../../User/domain/User";
import { QueryInterface } from "../../../../../polvebra/src/bytaj/main/shared/domain/QueryInterface";

export default interface TagPersistenceAdapter{
    createTag(tag:Tag, user?:User):Promise<Tag>;
    searchTagByID(id:any):Promise<Tag>;
    searchTagByParams(params:QueryInterface):Promise<Tag[]>;
    searchAllTagsFromAUser(userID: any):Promise<Tag[]>;
    modifyTag(tag:Tag):Promise<Tag>;
    removeTag(id:any):void;
}