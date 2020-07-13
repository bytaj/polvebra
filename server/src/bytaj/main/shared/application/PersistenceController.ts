import PersistenceAdapter from "../../transaction/domain/PersistenceAdapter";

import MongoPersistenceAdapter from "../infrastructure/mongodb/MongoPersistenceAdapter";
import {QueryInterface} from "../domain/QueryInterface";
import MongoQuery from "../infrastructure/mongodb/MongoQuery";

let instance:PersistenceAdapter = new MongoPersistenceAdapter();

export function getPersistenceController(): PersistenceAdapter{
    return instance;
}

export function createNewQuery(type:string): QueryInterface{
    return new MongoQuery(type);
}