import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { MapperErrorToHttpCode } from '../../../../Shared/infrastructure/MapperErrorToHttpCode';
import { LoginTokens } from '../../../Shared/domain/LoginTokens';
import { Controller } from '../../../Shared/infrastructure/controllers/Controller';
import { UserLogin } from '../../application/UserLogin';

export class LoginPostController implements Controller {
    constructor(private userLogin: UserLogin) {
    }

    async run(req: Request, res: Response) {
        const username: string = req.body.username;
        const password: string = req.body.passwordB;

        try {
             const loginTokens: LoginTokens = await this.userLogin.run(username, password);
             res.json(loginTokens).status(httpStatus.OK);
        } catch (error) {
            res.status(MapperErrorToHttpCode(error));
        }
    }
}
