import { Uuid } from '../../../Shared/domain/value-object/Uuid';
import { LoginTokens } from './LoginTokens';
import { UserType } from './User/UserType';

export interface LoginManager{
    login(userId:Uuid, userType:UserType):LoginTokens;
    logout(userId:Uuid):void;
}