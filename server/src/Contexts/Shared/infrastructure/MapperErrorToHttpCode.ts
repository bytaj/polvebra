import { NotFoundException } from '../domain/exceptions/NotFoundException';
import { TokenNotExists } from '../domain/exceptions/TokenNotExists';
import { TokenNotValid } from '../domain/exceptions/TokenNotValid';
import httpStatus from 'http-status';
import { UnauthorizedAccessException } from '../domain/exceptions/UnauthorizedAccessException';

export function MapperErrorToHttpCode(error:Error):number{
    switch (error.constructor) {
        case NotFoundException:
            return httpStatus.NOT_FOUND;
        case TokenNotValid:
            return httpStatus.FORBIDDEN;
        case TokenNotExists:
            return httpStatus.UNAUTHORIZED;
        case UnauthorizedAccessException:
            return httpStatus.UNAUTHORIZED;
        default:
            return httpStatus.INTERNAL_SERVER_ERROR;
    }

}