import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { Nullable } from '../../../../Shared/domain/Nullable';
import { MapperErrorToHttpCode } from '../../../../Shared/infrastructure/MapperErrorToHttpCode';
import { Controller } from '../../../Shared/infrastructure/controllers/Controller';
import { MostRecentAccountFinder } from '../../application/Finder/MostRecentAccountFinder';

export class AccountGetRecentController implements Controller {
    constructor(private mostRecentAccountFinder: MostRecentAccountFinder) {
    }

    async run(req: Request, res: Response) {
        try {
            const userPetition = (<any>req).user;

            const accounts: Nullable<any[]> = await this.mostRecentAccountFinder.run(userPetition);
            if (accounts) {
                res.status(httpStatus.OK).json(accounts);
            } else {
                res.status(httpStatus.NOT_FOUND);
            }
        } catch (error) {
            res.status(MapperErrorToHttpCode(error));
        }
    }
}
