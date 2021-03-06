import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { Nullable } from '../../../../Shared/domain/Nullable';
import { MapperErrorToHttpCode } from '../../../../Shared/infrastructure/MapperErrorToHttpCode';
import { UserId } from '../../../Shared/domain/User/UserId';
import { Controller } from '../../../Shared/infrastructure/controllers/Controller';
import { UserFinder } from '../../application/UserFinder';
import User from '../../domain/User';

export class UserGetController implements Controller {
    constructor(private clientFinder: UserFinder) {
    }

    //TODO Terminar
    async run(req: Request, res: Response) {
        try {
            let userId: Nullable<UserId>;
            if (req.params.id) {
                userId = new UserId(req.params.id);
            } else {
                userId = null;
            }
            const userPetition = (<any>req).user;

            const users: Nullable<User[]> = await this.clientFinder.run(null, userPetition);
            if (users) {
                res.status(httpStatus.OK).json(users);
            } else {
                res.status(httpStatus.NOT_FOUND);
            }
        } catch (error) {
            res.status(MapperErrorToHttpCode(error));
        }
    }
}
