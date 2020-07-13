import express from 'express';

import indexRoute from './index';
import singupRoute from '../../user/infrastructure/signup';
import loginRoute from '../../user/infrastructure/login';

export default function setupRouter(app: express.Application):void {
    app.use('/', indexRoute);
    app.use('/signup', singupRoute);
    app.use('/login', loginRoute);
}