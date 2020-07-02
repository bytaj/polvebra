import PersistenceAdapter from "../dao/PersistenceAdapter";

import MongoPersistenceAdapter from "../dao/mongodb/adapters/MongoPersistenceAdapter";
import {QueryInterface} from "../dao/QueryInterface";
import MongoQuery from "../dao/mongodb/models/MongoQuery";

let instance:PersistenceAdapter = new MongoPersistenceAdapter();

export function getPersistenceController(): PersistenceAdapter{
    return instance;
}

export function createNewQuery(type:string): QueryInterface{
    return new MongoQuery(type);
}