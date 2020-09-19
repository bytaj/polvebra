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
        const passwordA: string = req.body.passwordA;
        const passwordB: string = req.body.passwordB;

        try {
            const user = await this.userCreator.run({
                                                        id: userId,
                                                        username: username,
                                                        name: name,
                                                        email: email,
                                                        passwordA: passwordA,
                                                        passwordB: passwordB
                                                    });
            res.status(httpStatus.CREATED);
            res.json(user.toPrimitives());
            res.send();
        } catch (error) {
            res.status(MapperErrorToHttpCode(error));
        }
    }
}
