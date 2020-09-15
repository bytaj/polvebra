import { EventBus } from '../../../../Shared/domain/EventBus';
import { Nullable } from '../../../../Shared/domain/Nullable';
import { Balance } from '../../../../Shared/domain/value-object/Balance';
import { UserId } from '../../../Shared/domain/User/UserId';
import User from '../../domain/User';
import UserRepository from '../../domain/UserRepository';

export class AccountIncrementer {
    constructor(private repository: UserRepository, private bus: EventBus) {}

    async run(userId: UserId, oldBalance: Balance, newBalance:Balance, paid:boolean) {
        const user:Nullable<User> = await this.repository.search(userId);

        if (user) {
            user.modifyBalance(oldBalance, newBalance, paid);
            this.repository.update(userId, user);
            this.bus.publish(user.pullDomainEvents());
        }
    }
}
