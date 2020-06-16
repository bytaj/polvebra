import express from 'express';

import indexRoute from './index';
import singupRoute from './signup';
import loginRoute from './login';

export default function setupRouter(app: express.Application):void {
    app.use('/', indexRoute);
    app.use('/signup', singupRoute);
    app.use('/login', loginRoute);
}