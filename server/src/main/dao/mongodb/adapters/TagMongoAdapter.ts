import TagPersistenceAdapter from "../../TagPersistenceAdapter";
import Tag from "../../../core/model/Tag";
import TagSchema from '../models/TagSchema'
import * as MongoSearcher from '../MongoSearcher';

class TagMongoAdapter implements TagPersistenceAdapter{
    createTag(tag:Tag):Promise<Tag>{
        return MongoSearcher.publish(TagSchema, tag);
    }
    searchTagByID(id:any):Promise<Tag> {
        return MongoSearcher.consultByID(TagSchema, id);

    }
    searchTagByParams(params:any):Promise<Tag[]>{
        return MongoSearcher.consult(TagSchema, params);
    }

    modifyTag(tag:Tag):Promise<Tag>{
        return MongoSearcher.modify(TagSchema, tag);
    }

    removeTag(id:any):void{
        MongoSearcher.remove(TagSchema, id);
    }
}

const tagMongoAdapter: TagMongoAdapter = new TagMongoAdapter();
export default tagMongoAdapter;