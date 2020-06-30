import TagPersistenceAdapter from "../../TagPersistenceAdapter";
import Tag from "../../../core/model/Tag";
import TagSchema from '../models/TagSchema'
import * as MongoSearcher from '../MongoSearcher';
import User from "../../../core/model/User";
import { Document } from "mongoose";

class TagMongoAdapter implements TagPersistenceAdapter{
    createTag(tag:Tag, user?:User):Promise<Tag>{
        let tagDocument:any = new TagSchema(tag);
        if(user){
            tagDocument.user = user.getId();
        }else{
            
        }
        return MongoSearcher.publish(tagDocument);
    }
    async searchTagByID(id:any):Promise<Tag> {
        let promise:any = await MongoSearcher.consultByID(TagSchema, id);
        return Tag.createTagFromJSON(promise)
    }
    async searchTagByParams(params:any):Promise<Tag[]>{
        return MongoSearcher.consult(TagSchema, params).then((tags)=>{
            let tagsFound:Tag[] = [];
            tags.forEach((tagMongo) => {
                tagsFound.push(Tag.createTagFromJSON(tagMongo));
            });
            return tagsFound;
        });
    }

    modifyTag(tag:Tag):Promise<Tag>{
        return MongoSearcher.modify(TagSchema, tag, ()=>{});
    }

    private async checkSonsTags(tag: Tag):Promise<Tag[]>{
        let promises: Promise<any>[] = [];
        let tags:Tag[] = [];
        await this.searchTagByParams({"parentTag":tag.getId()}).then(async (tagsdb) =>{
            if (tagsdb.length != 0){
                tagsdb.forEach((tagFound) => {
                    tagFound.setParentTag(tag);
                    tags.push(tagFound);
                    promises.push(this.checkSonsTags(tagFound).then((sonsTags) => {
                        tags.concat(sonsTags);
                    }));
                });
            }else{
                return [];
            }
        }); 
        await Promise.all(promises.map(p => p.catch(error => null)));
        return tags;
    }

    async searchAllTagsFromAUser(userID: any):Promise<Tag[]>{
        let tags:Tag[] = [];
        let promises: Promise<any>[] = [];
        await this.searchTagByParams({"user":userID, "parentTag":null}).then(async (tagsdb) =>{
            tagsdb.forEach(async (tagdb) => {
                tags.push(tagdb);
                promises.push(this.checkSonsTags(tagdb).then((tagsFounds) => {
                    tags.concat(tagsFounds);
                }));
            })
        });
        
        await Promise.all(promises.map(p => p.catch(error => null)));
        return tags;
    }

    removeTag(id:any):void{
        MongoSearcher.remove(TagSchema, id);
    }
}

const tagMongoAdapter: TagMongoAdapter = new TagMongoAdapter();
export default tagMongoAdapter;