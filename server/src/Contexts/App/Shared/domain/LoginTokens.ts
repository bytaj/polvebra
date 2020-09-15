export class LoginTokens{
    readonly accessToken:string;
    readonly refreshToken:string;

    constructor(accessToken:string, refreshToken:string) {
        this.accessToken = accessToken;
        this.refreshToken = refreshToken;
    }

    public toPrimitives() {
        return {
            accessToken: this.accessToken,
            refreshToken: this.refreshToken
        };
    }
}