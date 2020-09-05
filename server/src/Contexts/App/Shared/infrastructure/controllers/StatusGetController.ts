import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { Controller } from './Controller';

export default class StatusGetController implements Controller {
    async run(req: Request, res: Response) {
        res.json({
            'status': 'it works'
        });
        res.status(httpStatus.OK);
    }
}
