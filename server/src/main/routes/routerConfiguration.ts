import express from 'express';

import indexRoute from './index';
import singupRoute from './singup';
import loginRoute from './login';

export default function setupRouter(app: express.Application):void {
    app.use('/', indexRoute);
    app.use('/singup', singupRoute);
    app.use('/login', loginRoute);
}