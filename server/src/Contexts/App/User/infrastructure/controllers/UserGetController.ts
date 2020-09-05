import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { Nullable } from '../../../../Shared/domain/Nullable';
import { MapperErrorToHttpCode } from '../../../../Shared/infrastructure/MapperErrorToHttpCode';
import { SessionManager } from '../../../Shared/domain/SessionManager';
import { UserId } from '../../../Shared/domain/User/ClientId';
import { Controller } from '../../../Shared/infrastructure/controllers/Controller';
import { UserFinder } from '../../application/UserFinder';
import User from '../../domain/User';

export class UserGetController implements Controller {
    constructor(private clientFinder: UserFinder, private sessionManager: SessionManager) {
    }

    async run(req: Request, res: Response) {
        try {
            let userId: Nullable<UserId>;
            if (req.params.id) {
                userId = new UserId(req.params.id);
            } else {
                userId = null;
            }
            const userPetition = (<any>req).user;

            const users: Nullable<User[]> = await this.clientFinder.run(userId, userPetition);
            if (users) {
                res.json(users).status(httpStatus.OK);
            } else {
                res.status(httpStatus.NOT_FOUND);
            }
        } catch (error) {
            res.status(MapperErrorToHttpCode(error));
        }
    }
}
