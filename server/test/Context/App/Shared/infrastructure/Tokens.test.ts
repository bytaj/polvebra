import dotenv from 'dotenv';
import { instance, mock, when } from 'ts-mockito';
import { LoginManager } from '../../../../../src/Contexts/App/Shared/domain/LoginManager';
import { LoginTokens } from '../../../../../src/Contexts/App/Shared/domain/LoginTokens';
import { SessionManager } from '../../../../../src/Contexts/App/Shared/domain/SessionManager';
import { UserId } from '../../../../../src/Contexts/App/Shared/domain/User/UserId';
import { UserPetition } from '../../../../../src/Contexts/App/Shared/domain/User/UserPetition';
import { UserType } from '../../../../../src/Contexts/App/Shared/domain/User/UserType';
import { JWTLogin } from '../../../../../src/Contexts/App/Shared/infrastructure/JWTLogin';
import { SessionManagerJWT } from '../../../../../src/Contexts/App/Shared/infrastructure/SessionManagerJWT';
import Logger from '../../../../../src/Contexts/Shared/domain/Logger';
import { TokenRepository } from '../../../../../src/Contexts/Shared/domain/TokenRepository';

let loginManager: LoginManager;
let sessionManager: SessionManager;
let userId: UserId = UserId.random();
let userType: UserType = UserType.USER;
let logger:Logger;

beforeAll(() => {
    dotenv.config();
    let mockTokenRepository: TokenRepository = mock<TokenRepository>();

    const mockLogger: Logger = mock<Logger>();

    const tokenRepository: TokenRepository = instance(mockTokenRepository);
    logger = instance(mockLogger);

    loginManager = new JWTLogin(tokenRepository, logger);
    sessionManager = new SessionManagerJWT(tokenRepository, logger);
});

describe('Tokens management', () => {
    it('Token is created successfully', () => {
        const tokens: LoginTokens = loginManager.login(userId, userType);
        expect(tokens.accessToken).not.toBeNull();
        expect(tokens.refreshToken).not.toBeNull();
    });

    it('Token is good decoded', async () => {
        const tokens: LoginTokens = loginManager.login(userId, userType);
        const userPetition: UserPetition = await sessionManager.userFromSession(tokens.accessToken);
        expect(userPetition.id.value).toEqual(userId.value);
    });

    it('Token is good refreshed', async () => {
        const tokens: LoginTokens = loginManager.login(userId, userType);


        let mockTokenRepository: TokenRepository = mock<TokenRepository>();
        when(mockTokenRepository.existsToken(tokens.refreshToken)).thenResolve(true);
        const tokenRepository: TokenRepository = instance(mockTokenRepository);
        sessionManager = new SessionManagerJWT(tokenRepository, logger);

        const newAccessToken: string = await sessionManager.refreshToken(tokens.refreshToken);
        const userPetition: UserPetition = await sessionManager.userFromSession(newAccessToken);
        expect(userPetition.id.value).toEqual(userId.value);
    });

});

