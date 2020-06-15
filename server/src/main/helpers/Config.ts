import express from 'express';
import session from 'express-session';
import connectMongo from 'connect-mongo';
import logger from 'morgan';
import bodyParser from 'body-parser';

import '../persistence/mongodb/database';
import * as url from '../persistence/mongodb/keys';
import routerConfiguration from '../routes/routerConfiguration';


export function configureRoutes(app:express.Application){
    routerConfiguration(app);
}

export function createExpressServer(port:number): express.Application{
    const app = express();
    app.set('port', process.env.PORT || 3000);
    return app;
}

export function configureMiddlewares(app:express.Application){
    app.set('json spaces', 4);

    //middleware
    app.use(logger('dev'));
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended: false}));
}

export function configureSession(app:express.Application){
    const MongoStore = connectMongo(session);
    app.use(session({
        secret: 'DefineSecret',
        resave: true,
        saveUninitialized: true,
        store: new MongoStore({
            url: url.mongodbAuth.URI,
            autoReconnect:true,
        }),
    }))
}