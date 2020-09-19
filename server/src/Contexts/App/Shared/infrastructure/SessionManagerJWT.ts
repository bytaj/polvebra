import * as jwt from 'jsonwebtoken';
import { TokenNotExists } from '../../../Shared/domain/exceptions/TokenNotExists';
import { TokenNotValid } from '../../../Shared/domain/exceptions/TokenNotValid';
import { UndefinedException } from '../../../Shared/domain/exceptions/UndefinedException';
import Logger from '../../../Shared/domain/Logger';
import { Nullable } from '../../../Shared/domain/Nullable';
import { TokenRepository } from '../../../Shared/domain/TokenRepository';
import { SessionManager } from '../domain/SessionManager';
import { UserPetition } from '../domain/User/UserPetition';

export class SessionManagerJWT implements SessionManager {
    constructor(private tokenRepository: TokenRepository, private logger: Logger) {
    }

    public async refreshToken(refreshToken: string): Promise<string> {
        const tokenDecoded = await this.checkIfRefreshTokenIsValid(refreshToken);
        if (!tokenDecoded) {
            throw new TokenNotValid();
        }
        if (!process.env.ACCESS_TOKEN_SECRET) {
            throw new UndefinedException('Key undefined');
        }
        const userPetition: UserPetition = new UserPetition(tokenDecoded.id, tokenDecoded.type);
        return jwt.sign(userPetition.toPrimitives(),
                        process.env.ACCESS_TOKEN_SECRET,
                        {expiresIn: process.env.TOKEN_EXPIRATION});
    }

    public async userFromSession(token: string): Promise<UserPetition> {
        let userPetition: Nullable<UserPetition> = null;
        if (!process.env.ACCESS_TOKEN_SECRET) {
            throw new UndefinedException('Key undefined');
        }
        await jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, async (err, tokenDecoded: any) => {
            if (err) {
                throw new TokenNotValid();
            }
            userPetition = new UserPetition(tokenDecoded.id, tokenDecoded.type);
        });
        if (userPetition) {
            return userPetition;
        }
        throw new TokenNotValid();
    }

    private async checkIfRefreshTokenIsValid(token: string): Promise<Nullable<UserPetition>> {
        let userPetition: Nullable<UserPetition> = null;
        if (!process.env.REFRESH_TOKEN_SECRET) {
            throw new UndefinedException('Key undefined');
        }
        await jwt.verify(token, process.env.REFRESH_TOKEN_SECRET, async (err, tokenDecoded: any) => {
            if (err) {
                throw new TokenNotValid();
            }
            const tokenExists = await this.tokenRepository.existsToken(token);
            if (!tokenExists) {
                throw new TokenNotExists();
            }
            userPetition = new UserPetition(tokenDecoded.id, tokenDecoded.type);
        });
        return userPetition;
    }

}