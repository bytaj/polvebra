import { Express } from 'express';
import container from '../config/dependency-injection';
import StatusController from '../../../Contexts/App/Shared/infrastructure/controllers/StatusGetController';

export const register = (app: Express) => {
  const controller: StatusController = container.get('Apps.polvebra.controllers.StatusGetController');
  app.get('/status', controller.run.bind(controller));
};
