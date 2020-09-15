import container from '../../../../apps/backend/config/dependency-injection';
import GetTokenFromRequest from '../../../App/Shared/infrastructure/GetTokenFromRequest';
import { MapperErrorToHttpCode } from '../MapperErrorToHttpCode';
import { Request } from 'express';

export default function (req: Request, res: any, next: any) {
    const notLoginNecessary: string[] = ['login', 'token', 'status', 'register'];
    const urlReceived = req.url.split('/')[1];
    if (notLoginNecessary.filter((notLoginNecessaryUrl) => notLoginNecessaryUrl == urlReceived).length > 0) {
        next();
    }else{
        const sessionManager = container.get('Polvebra.shared.SessionManager');
        try {
            const token = GetTokenFromRequest(req.header('authorization'));
            const userPetition = sessionManager.userFromSession(token);
            (<any>req).user = userPetition;
            next();
        } catch (error) {
            res.status(MapperErrorToHttpCode(error));
            res.send();
            return res.end();
        }
    }


}