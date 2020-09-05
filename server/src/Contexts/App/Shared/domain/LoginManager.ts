import { Uuid } from '../../../Shared/domain/value-object/Uuid';
import { UserType } from './User/UserType';

export interface LoginManager{
    login(userId:Uuid, userType:UserType):string;
    logout(userId:Uuid):void;
}