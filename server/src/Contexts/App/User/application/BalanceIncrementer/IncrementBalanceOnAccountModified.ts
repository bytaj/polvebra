import { DomainEventClass } from '../../../../Shared/domain/DomainEvent';
import { DomainEventSubscriber } from '../../../../Shared/domain/DomainEventSubscriber';
import { Balance } from '../../../../Shared/domain/value-object/Balance';
import { AccountModifyBalanceDomainEvent } from '../../../Account/domain/DomainEvent/AccountModifyBalanceDomainEvent';
import { UserId } from '../../../Shared/domain/User/UserId';
import { AccountIncrementer } from './AccountIncrementer';

export class IncrementBalanceOnAccountModified implements DomainEventSubscriber<AccountModifyBalanceDomainEvent> {
    constructor(private incrementer: AccountIncrementer) {
    }

    subscribedTo(): DomainEventClass[] {
        return [AccountModifyBalanceDomainEvent];
    }

    async on({newBalance, oldBalance, paid, userId}: AccountModifyBalanceDomainEvent) {
        await this.incrementer.run(new UserId(userId),
                                   new Balance(oldBalance),
                                   new Balance(newBalance),
                                   paid);

    }
}