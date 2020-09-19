import { Express } from 'express';
import glob from 'glob';

export function registerRoutes(app: Express) {
  const routes = glob.sync(__dirname + '/**/*.route.*');
  routes.map(route => register(route, app));
  addNotFoundRoute(app);
}

function register(routePath: string, app: Express) {
    const route = require(routePath);
    route.register(app);
}

function addNotFoundRoute(app: Express){
    app.get('*', (req, res) =>{
        res.status(404).end();
    });
}
