import { Nullable } from '../../../Shared/domain/Nullable';
import { TokenRepository } from '../../../Shared/domain/TokenRepository';
import TokenModel from './TokenModel';

export class MongoTokenRepository implements TokenRepository{
    public async createToken(userId: string, token: string): Promise<any> {
        const currentToken = await this.findTokenByUser(userId);
        if (!currentToken){
            await this.deleteToken(userId);

        }
        return new TokenModel({userId: userId, value:token}).save()
    }

    public deleteToken(userId: string): Promise<any> {
        return TokenModel.deleteOne({userId:userId}).exec();
    }

    public findTokenByUser(userId: string): Promise<Nullable<string>> {
        return TokenModel.find({userId: userId}).exec().then((value => {
            if (value){
                return (value[0] as any).value;
            }else{
                return null;
            }
        }));
    }

    public existsToken(token: string): Promise<boolean> {
        return TokenModel.find({value: token}).exec().then((value => {
            return !!value;
        }));
    }

}