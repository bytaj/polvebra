export class KeyDoesNotMatchException extends Error {
    constructor() {
        super("Keys doesn't match");
    }
}