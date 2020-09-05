export class IncorrectLogin extends Error {
    constructor() {
        super("Login incorrect");
    }
}