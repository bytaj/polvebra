import bodyParser from 'body-parser';
import express from 'express';
import helmet from 'helmet';
import compress from 'compression';
import { setUp } from '../../Contexts/Shared/infrastructure/EnvironementSetUp';
import container from './config/dependency-injection';
import { registerRoutes } from './routes';

const app: express.Express = express();

app.set('port', process.env.PORT || 3000);

setUp()
const connectionManager = container.get('Polvebra.shared.ConnectionManager');
connectionManager.connect();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(helmet.xssFilter());
app.use(helmet.noSniff());
app.use(helmet.hidePoweredBy());
app.use(helmet.frameguard({ action: 'deny' }));
app.use(compress());
registerRoutes(app);
//app.use(SendResponseMiddleware);

export default app;
