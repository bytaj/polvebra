import { MongoClient } from 'mongodb';
import { Nullable } from '../../../domain/Nullable';

export class MongoClientFactory {
  private static clients: { [key: string]: MongoClient } = {};

  static async createClient(contextName: string): Promise<MongoClient> {
    let client = MongoClientFactory.getClient(contextName);

    if (!client) {
      client = await MongoClientFactory.createAndConnectClient();

      MongoClientFactory.registerClient(client, contextName);
    }

    return client;
  }

  private static getClient(contextName: string): Nullable<MongoClient> {
    return MongoClientFactory.clients[contextName];
  }

  private static async createAndConnectClient(): Promise<MongoClient> {
    if (!process.env.MONGO_URL || !process.env.NODE_ENV) throw new Error();

    const client = new MongoClient(process.env.MONGO_URL + '_' + process.env.NODE_ENV, { useUnifiedTopology: true, ignoreUndefined: true });

    await client.connect();

    return client;
  }

  private static registerClient(client: MongoClient, contextName: string): void {
    MongoClientFactory.clients[contextName] = client;
  }
}
