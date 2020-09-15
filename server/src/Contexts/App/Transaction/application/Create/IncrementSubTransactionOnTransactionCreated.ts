import { DomainEventClass } from '../../../../Shared/domain/DomainEvent';
import { DomainEventSubscriber } from '../../../../Shared/domain/DomainEventSubscriber';
import { TransactionId } from '../../../Shared/domain/Transaction/TransactionId';
import TransactionAmount from '../../domain/TransactionAmount';
import { TransactionCreatedDomainEvent } from '../../domain/DomainEvent/TransactionCreatedDomainEvent';
import { SubTransactionIncrementer } from './SubTransactionIncrementer';

export class IncrementSubTransactionOnTransactionCreated implements DomainEventSubscriber<TransactionCreatedDomainEvent> {
    constructor(private incrementer: SubTransactionIncrementer) {
    }

    subscribedTo(): DomainEventClass[] {
        return [TransactionCreatedDomainEvent];
    }

    async on(domainEvent: TransactionCreatedDomainEvent) {
        if (domainEvent.transactionParentId) {
            await this.incrementer.run(new TransactionId(domainEvent.transactionParentId),
                                       new TransactionId(domainEvent.aggregateId),
                                       new TransactionAmount(domainEvent.amount));
        }
    }
}