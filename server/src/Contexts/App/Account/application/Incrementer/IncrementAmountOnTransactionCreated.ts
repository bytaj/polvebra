import { DomainEventClass } from '../../../../Shared/domain/DomainEvent';
import { DomainEventSubscriber } from '../../../../Shared/domain/DomainEventSubscriber';
import { AccountId } from '../../../Shared/domain/Account/AccountId';
import { TransactionCreatedDomainEvent } from '../../../Transaction/domain/DomainEvent/TransactionCreatedDomainEvent';
import TransactionAmount from '../../../Transaction/domain/TransactionAmount';
import { AccountAmountIncrementer } from './AccountAmountIncrementer';

export class IncrementAmountOnTransactionCreated implements DomainEventSubscriber<TransactionCreatedDomainEvent> {
    constructor(private incrementer: AccountAmountIncrementer) {
    }

    subscribedTo(): DomainEventClass[] {
        return [TransactionCreatedDomainEvent];
    }

    async on(domainEvent: TransactionCreatedDomainEvent) {
        if (!domainEvent.transactionParentId) {
            await this.incrementer.run(new AccountId(domainEvent.accountId),
                                       domainEvent.transactionParentId != null,
                                       new TransactionAmount(domainEvent.amount),
                                       domainEvent.paid);
        }
    }
}