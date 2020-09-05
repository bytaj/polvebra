export class TokenNotExists extends Error {
    constructor() {
        super("Not existing of refresh token");
    }
}