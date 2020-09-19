import { Request } from 'express';
import container from '../../../../apps/backend/config/dependency-injection';
import GetTokenFromRequest from '../../../App/Shared/infrastructure/GetTokenFromRequest';
import { MapperErrorToHttpCode } from '../MapperErrorToHttpCode';

export default async function (req: Request, res: any, next: any) {
    const sessionManager = container.get('Polvebra.shared.SessionManager');
    try {
        const token = GetTokenFromRequest(req.header('Bearer'));
        const userPetition = await sessionManager.userFromSession(token);
        (<any>req).user = userPetition;
        next();
    } catch (error) {
        res.status(MapperErrorToHttpCode(error));
        res.send();
        return res.end();
    }
}