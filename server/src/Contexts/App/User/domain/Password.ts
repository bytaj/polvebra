import { KeyDoesNotMatchException } from '../../../Shared/domain/exceptions/UserException/PasswordException/KeyDoesNotMatchException';
import { StringValueObject } from '../../../Shared/domain/value-object/StringValueObject';
import * as bcrypt  from 'bcrypt';

export class Password extends StringValueObject {

    public static verifyPassword(passwordA: string, passwordB: string): void {
        if (passwordA !=
            passwordB) {
            throw new KeyDoesNotMatchException();
        }
    }

    public static encryptPassword(password: string): string {
        return bcrypt.hashSync(password, 8);
    }

    public static comparePassword(plainTextPassword:string, hashedPassword:string):boolean{
        return bcrypt.compareSync(plainTextPassword, hashedPassword);
    }
}