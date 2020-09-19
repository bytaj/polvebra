import { TokenNotExists } from '../../../Shared/domain/exceptions/TokenNotExists';

export default function getTokenFromRequest(token: string|undefined):string{
    if (!token){
        throw new TokenNotExists()
    }
    return token;
}