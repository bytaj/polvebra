import mongoose from 'mongoose';
import config from '../../../../../apps/backend/config/config';
import container from '../../../../../apps/backend/config/dependency-injection';
import Logger from '../../../domain/Logger';
import { ConnectionManager } from '../ConnectionManager';

export class MongoConnectionManager implements ConnectionManager{
    constructor() {
    }
    logger: Logger = container.get('Polvebra.shared.Logger');

    public async close(): Promise<void> {
        return await mongoose.disconnect().then(db => this.logger.info('MongoDB is disconnected ' + db));
    }

    public async connect(): Promise<any> {

        mongoose.set('useCreateIndex', true);
        //mongoose.set('debug', true);
        return await mongoose.connect(config.get('mongo.url'), {
            useUnifiedTopology: true,
            useNewUrlParser: true
        });
    }

}