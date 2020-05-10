import TagPersistenceAdapter from "../../TagPersistenceAdapter";
import Tag from "../../../core/model/Tag";
import TagSchema from '../models/TagSchema'
import * as MongoSearcher from '../MongoSearcher';

class TagMongoAdapter implements TagPersistenceAdapter{
    createTag(tag:Tag):Tag|void{
        return MongoSearcher.publish(TagSchema, tag);
    }
    searchTagByID(id:any):Tag|void {
        let promise:Promise<Tag> = MongoSearcher.consultByID(TagSchema, id);
        promise.then(tag => {return tag})
                .catch((err) => {
                    console.log(err);
                    return null;
                });
    }
    searchTagByParams(params:any):Tag[]|void{
        let promise:Promise<Tag[]> = MongoSearcher.consult(TagSchema, params);
        promise.then(tagArray => {return tagArray})
                .catch((err) => {
                    console.log(err);
                    return null;
                });
    }

    modifyTag(id: any, tag:Tag):Tag|void{
        MongoSearcher.modify(TagSchema, id, tag);
    }

    removeTag(id:any):void{
        MongoSearcher.remove(TagSchema, id);
    }
}

const tagMongoAdapter: TagMongoAdapter = new TagMongoAdapter();
export default tagMongoAdapter;