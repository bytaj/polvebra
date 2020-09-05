import bodyParser from 'body-parser';
import express from 'express';
import helmet from 'helmet';
import compress from 'compression';
import PreAuthMiddleware from '../../Contexts/Shared/infrastructure/middlewares/PreAuthMiddleware';
import SendResponseMiddleware from '../../Contexts/Shared/infrastructure/middlewares/SendResponseMiddleware';
import container from './config/dependency-injection';
import { registerRoutes } from './routes';

const app: express.Express = express();

app.set('port', process.env.PORT || 3000);

const connectionManager = container.get('Polvebra.shared.ConnectionManager');
connectionManager.connect();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(helmet.xssFilter());
app.use(helmet.noSniff());
app.use(helmet.hidePoweredBy());
app.use(helmet.frameguard({ action: 'deny' }));
app.use(compress());
app.use(PreAuthMiddleware);
registerRoutes(app);
app.use(SendResponseMiddleware);

export default app;
