import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { Uuid } from '../../../../Shared/domain/value-object/Uuid';
import { MapperErrorToHttpCode } from '../../../../Shared/infrastructure/MapperErrorToHttpCode';
import { Controller } from '../../../Shared/infrastructure/controllers/Controller';
import { UserCreator } from '../../application/UserCreator';

export class CreateUserPutController implements Controller {
    constructor(private userCreator: UserCreator) {
    }

    async run(req: Request, res: Response) {
        const userId: string = Uuid.random().toString();
        const username: string = req.body.username;
        const name: string = req.body.name;
        const email: string = req.body.email;
        const password: string = req.body.password;


        try {
            const user = await this.userCreator.run({
                                                        id: userId,
                                                        username: username,
                                                        name: name,
                                                        email: email,
                                                        password: password
                                                    }, (<any>req).user.type);
            res.json(user);
            res.status(httpStatus.CREATED);
        } catch (error) {
            res.status(MapperErrorToHttpCode(error));
        }
    }
}
