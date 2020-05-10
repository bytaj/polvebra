import path from 'path';

import express  from 'express';
import logger from 'morgan';
import bodyParser from 'body-parser';

const app = express();
import './persistence/mongodb/database';

import indexRoutes from './routes/index';

/*const indexStoreRoutes = require ('./routes/indexStore');
const indexForumRoutes = require ('./routes/indexForum');
const indexUserRoutes = require ('./routes/indexUser');*/

//Setting
app.set('port', process.env.PORT || 3000);
app.set('json spaces', 4);

//middleware
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use('/', indexRoutes);

app.listen(app.get('port'), () => {
    //onsole.log(starter.inicialize);
    console.log('server on port', app.get('port'));
});