import { Uuid } from '../../../../Shared/domain/value-object/Uuid';
import { UserType } from './UserType';

export class UserPetition{
    readonly id:Uuid;
    readonly type:UserType;

    constructor(id:Uuid, type: UserType) {
        this.id = id;
        this.type =type;
    }

}