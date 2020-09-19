import mongoose from 'mongoose';
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
        if (!process.env.MONGO_URL || !process.env.NODE_ENV) throw new Error();
        const uri = process.env.MONGO_URL + "_" + process.env.NODE_ENV;
        return await mongoose.connect(uri, {
            useUnifiedTopology: true,
            useNewUrlParser: true
        });
    }

}