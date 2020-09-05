import { Nullable } from './Nullable';

export interface TokenRepository {
    createToken(userId: string, token: string):Promise<void>;
    findTokenByUser(userId:string):Promise<Nullable<string>>;
    existsToken(token:string):Promise<boolean>;
    deleteToken(userId:string):Promise<void>;
}