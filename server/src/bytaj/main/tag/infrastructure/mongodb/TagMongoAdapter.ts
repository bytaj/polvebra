import TagPersistenceAdapter from "../../domain/TagPersistenceAdapter";
import Tag from "../../domain/Tag";
import TagSchema from './TagSchema';
import * as MongoSearcher from '../../../../../../../../armonia/server/src/Contexts/Shared/infrastructure/persistence/mongo/MongoSearcher';
import User from "../../../user/domain/User";
import * as QueryInterface from "../../../shared/domain/QueryInterface";
import {createNewQuery} from "../../../shared/application/PersistenceController";

class TagMongoAdapter implements TagPersistenceAdapter {
    async createTag(tag: Tag, user?: User): Promise<Tag> {
        let id: Tag[];
        let query: QueryInterface.QueryInterface;
        let tagDocument: any = new TagSchema(tag);
        if (user) {
            tagDocument.user = user.getId();
        } else {
            query = createNewQuery(QueryInterface.TAG_DB_NAME);
            id = await this.searchTagByParams(query.addParamToQuery("_id", tag.getParentTag()?.getId())
                .selectReturnParams(["user"]));
            tagDocument.user = id;
        }
        return MongoSearcher.publish(tagDocument);
    }

    async searchTagByID(id: any): Promise<Tag> {
        let promise: any = await MongoSearcher.consultByID(TagSchema, id);
        return Tag.createTagFromJSON(promise);
    }

    async searchTagByParams(params: QueryInterface.QueryInterface): Promise<Tag[]> {
        return MongoSearcher.consult(TagSchema, params.getQuery()).then((tags) => {
            let tagsFound: Tag[] = [];
            tags.forEach((tagMongo) => {
                tagsFound.push(Tag.createTagFromJSON(tagMongo));
            });
            return tagsFound;
        });
    }

    modifyTag(tag: Tag): Promise<Tag> {
        return MongoSearcher.modify(TagSchema, tag, () => {
        });
    }

    private async checkSonsTags(tag: Tag): Promise<Tag[]> {
        let promises: Promise<any>[] = [];
        let tags: Tag[] = [];
        let query: QueryInterface.QueryInterface = createNewQuery(QueryInterface.TAG_DB_NAME);
        query.addParamToQuery("_id", tag.getParentTag()?.getId());
        await this.searchTagByParams(query).then(async (tagsdb) => {
            if (tagsdb.length !=
                0) {
                tagsdb.forEach((tagFound) => {
                    tagFound.setParentTag(tag);
                    tags.push(tagFound);
                    promises.push(this.checkSonsTags(tagFound).then((sonsTags) => {
                        tags.concat(sonsTags);
                    }));
                });
            } else {
                return [];
            }
        });
        await Promise.all(promises.map(p => p.catch(error => null)));
        return tags;
    }

    async searchAllTagsFromAUser(userID: any): Promise<Tag[]> {
        let tags: Tag[] = [];
        let promises: Promise<any>[] = [];
        let query: QueryInterface.QueryInterface = createNewQuery(QueryInterface.TAG_DB_NAME);
        query.addParamToQuery("user", userID).addParamToQuery("parentTag", null);
        await this.searchTagByParams(query).then(async (tagsdb) => {
            tagsdb.forEach(async (tagdb) => {
                tags.push(tagdb);
                promises.push(this.checkSonsTags(tagdb).then((tagsFounds) => {
                    tags.concat(tagsFounds);
                }));
            });
        });

        await Promise.all(promises.map(p => p.catch(error => null)));
        return tags;
    }

    removeTag(id: any): void {
        MongoSearcher.remove(TagSchema, id);
    }
}

const tagMongoAdapter: TagMongoAdapter = new TagMongoAdapter();
export default tagMongoAdapter;