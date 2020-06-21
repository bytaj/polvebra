import PersistenceAdapter from "../dao/PersistenceAdapter";

import MongoPersistenceAdapter from "../dao/mongodb/adapters/MongoPersistenceAdapter";

let instance:PersistenceAdapter = new MongoPersistenceAdapter();

export function getPersistenceController(): PersistenceAdapter{
    return instance;
}