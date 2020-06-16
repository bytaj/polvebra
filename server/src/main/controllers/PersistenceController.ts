import PersistenceAdapter from "../persistence/PersistenceAdapter";

import MongoPersistenceAdapter from "../persistence/mongodb/adapters/MongoPersistenceAdapter";

let instance:PersistenceAdapter = new MongoPersistenceAdapter();

export function getPersistenceController(): PersistenceAdapter{
    return instance;
}