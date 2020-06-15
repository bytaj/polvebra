import PersistenceAdapter from "../persistence/PersistenceAdapter";

import MongoPersistenceAdapter from "../persistence/mongodb/adapters/MongoPersistenceAdapter";

export function getPersistenceController(): PersistenceAdapter{
    return new MongoPersistenceAdapter;
}