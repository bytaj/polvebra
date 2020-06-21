import express from 'express';
import session from 'express-session';
import connectMongo from 'connect-mongo';
import expressWinston from 'express-winston';
import {createLogger, format, transports} from 'winston';
import bodyParser from 'body-parser';
import LoggerFactory from './LoggerFactory'

import '../dao/mongodb/database';
import * as url from '../dao/mongodb/keys';
import routerConfiguration from '../routes/routerConfiguration';

export function configureRoutes(app:express.Application){
    routerConfiguration(app);
}

export function createExpressServer(port:number): express.Application{
    const app = express();
    app.set('port', process.env.PORT || 3000);
    return app;
}

function configureHttpLogger(app:express.Application){
    const myFormat = format.printf(({ level, message, timestamp }) => {
        return `[${level.toUpperCase()}] ${timestamp}: ${message}`;
    });
    app.use(expressWinston.logger({
        format: format.combine(
            format.timestamp(),
            format.splat(),
            format.simple(),
            myFormat
    ),
        transports: [
            new transports.File({ filename: './log/info.log'})
        ],
        meta: true, // optional: control whether you want to log the meta data about the request (default to true)
        msg: "HTTP {{ req.method }} {{ req.url }} {{ res.statusCode }} {{ res.responseTime }}ms {{ JSON.stringify(req.body)}} {{ JSON.stringify(res.json)}}",
        expressFormat: false,
        colorize: false, // Color the text and status code, using the Express/morgan color palette (text: gray, status: default green, 3XX cyan, 4XX yellow, 5XX red).
        ignoreRoute: function (req, res) { return false;} // optional: allows to skip some log messages based on request and/or response
    }));
}

export function configureMiddlewares(app:express.Application){
   

    app.set('json spaces', 4);
    
    configureHttpLogger(app);
    
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended: false}));

    app.set('logger', LoggerFactory)
}

export function configureSession(app:express.Application){
    const MongoStore = connectMongo(session);
    var sess = {
        secret: 'DefineSecret',
        resave: true,
        name:"polvebraCookie",
        saveUninitialized: true,
        cookie: { secure: false },
        store: new MongoStore({
            url: url.mongodbAuth.URI,
            autoReconnect:true,
        }),
    };

    if (app.get('env') === 'production') {
        app.set('trust proxy', 1); // trust first proxy
        sess.cookie.secure = true;// serve secure cookies
      }
       
    app.use(session(sess))
}