import { Express } from 'express';
import PreAuthMiddleware from '../../../Contexts/Shared/infrastructure/middlewares/PreAuthMiddleware';
import container from '../config/dependency-injection';


export const register = (app: Express) => {
    const accountGetRecentController = container.get('Apps.polvebra.controllers.AccountGetRecentController');
    app.get('/recent-accounts', PreAuthMiddleware, accountGetRecentController.run.bind(accountGetRecentController));
};
