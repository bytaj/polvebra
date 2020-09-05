export class UnauthorizedAccessException extends Error {
    constructor() {
        super("Don't have the permission to access at this resource");
    }
}