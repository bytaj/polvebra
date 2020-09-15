import { Express } from 'express';
import container from '../config/dependency-injection';

export const register = (app: Express) => {
    const userPutController= container.get('Apps.polvebra.controllers.CreateUserPutController');
    app.put('/register', userPutController.run.bind(userPutController));

    const userGetController = container.get('Apps.polvebra.controllers.UserGetController');
    app.get('/me', userGetController.run.bind(userGetController));

    app.get('/user/:id', userGetController.run.bind(userGetController));

    const loginPostController = container.get('Apps.polvebra.controllers.LoginPostController');
    app.post('/login', loginPostController.run.bind(loginPostController));

    const statusGetController = container.get('Apps.polvebra.controllers.StatusGetController');
    app.get('/logout', statusGetController.run.bind(statusGetController));
};
