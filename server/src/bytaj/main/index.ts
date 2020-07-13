import * as config from './shared/application/Config';

const app = config.createExpressServer(3000);
config.configureMiddlewares(app);
config.configureSession(app);
config.configureRoutes(app);

app.listen(app.get('port'), () => {
    console.log('server on port', app.get('port'));
});