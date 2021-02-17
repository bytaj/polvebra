import { ConnectionManager } from '../../../../../src/Contexts/Shared/infrastructure/persistence/ConnectionManager';
import { EnvironmentArranger } from '../arranger/EnvironmentArranger';


export class MongoEnvironmentArranger extends EnvironmentArranger {
  constructor(private connectionManager: ConnectionManager){
    super();
  }

  public async arrange(): Promise<void> {
    await (await this.connectionManager.connection()).connection.dropDatabase();
  }

  public async close(): Promise<void> {
    await this.arrange();
    await this.connectionManager.close();
  }

  public async setUp(): Promise<void>{
    await this.connectionManager.connect();
  }
}
