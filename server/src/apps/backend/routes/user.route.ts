import { Express } from 'express';
import PreAuthMiddleware from '../../../Contexts/Shared/infrastructure/middlewares/PreAuthMiddleware';
import container from '../config/dependency-injection';


export const register = (app: Express) => {
    const userPutController= container.get('Apps.polvebra.controllers.CreateUserPutController');
    app.put('/register', userPutController.run.bind(userPutController));

    const userGetIndexController = container.get('Apps.polvebra.controllers.UserGetIndexController');
    app.get('/me', PreAuthMiddleware, userGetIndexController.run.bind(userGetIndexController));

    const userGetController = container.get('Apps.polvebra.controllers.UserGetController');
    app.get('/user/:id', PreAuthMiddleware, userGetController.run.bind(userGetController));

    const loginPostController = container.get('Apps.polvebra.controllers.LoginPostController');
    app.post('/login', loginPostController.run.bind(loginPostController));

    const statusGetController = container.get('Apps.polvebra.controllers.StatusGetController');
    app.get('/logout', statusGetController.run.bind(statusGetController));
};
