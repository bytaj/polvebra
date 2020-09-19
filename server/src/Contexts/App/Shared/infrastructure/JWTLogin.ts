import { UndefinedException } from '../../../Shared/domain/exceptions/UndefinedException';
import Logger from '../../../Shared/domain/Logger';
import { TokenRepository } from '../../../Shared/domain/TokenRepository';
import { LoginManager } from '../domain/LoginManager';
import { LoginTokens } from '../domain/LoginTokens';
import { UserId } from '../domain/User/UserId';
import { UserPetition } from '../domain/User/UserPetition';
import { UserType } from '../domain/User/UserType';
import * as jwt from "jsonwebtoken";

export class JWTLogin implements LoginManager{
    constructor(private tokenRepository:TokenRepository, private logger:Logger) {
    }
    public login(userId: UserId, userType: UserType): LoginTokens {
        if (process.env.ACCESS_TOKEN_SECRET && process.env.REFRESH_TOKEN_SECRET){
            const userPetition = new UserPetition(userId, userType);
            const jwtToken = jwt.sign(userPetition.toPrimitives(), process.env.ACCESS_TOKEN_SECRET, { expiresIn: process.env.TOKEN_EXPIRATION });
            const refreshToken = jwt.sign(userPetition.toPrimitives(), process.env.REFRESH_TOKEN_SECRET);
            this.tokenRepository.createToken(userId.value, refreshToken);
            this.logger.info("User with id: " + userId.value + " has created a token with value " + jwtToken + " and refresh token with value " + refreshToken);
            return new LoginTokens(jwtToken, refreshToken);
        }
        throw new UndefinedException("Key undefined");
    }

    public logout(userId:UserId): void {
        this.tokenRepository.deleteToken(userId.value);
    }

}