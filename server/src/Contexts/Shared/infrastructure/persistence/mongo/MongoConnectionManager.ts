import mongoose from 'mongoose';
import container from '../../../../../apps/backend/config/dependency-injection';
import Logger from '../../../domain/Logger';
import { ConnectionManager } from '../ConnectionManager';

export class MongoConnectionManager implements ConnectionManager{
    logger: Logger = container.get('Polvebra.shared.Logger');
    _connection: any;
    constructor() {
    }

    public async close(): Promise<void> {
        return await mongoose.disconnect().then(db => this.logger.info('MongoDB is disconnected ' + db));
    }

    public async connection(): Promise<any> {
        if (!this._connection){
            await this.connect();
        }
        return this._connection;
    }

    public async connect(): Promise<any> {

        mongoose.set('useCreateIndex', true);
        if (!process.env.MONGO_URL) throw new Error();
        const uri = process.env.MONGO_URL;
        this._connection = await mongoose.connect(uri, {
            useUnifiedTopology: true,
            useNewUrlParser: true
        });
        return this.connection()
    }



}