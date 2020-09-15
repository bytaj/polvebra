import { DomainEvent } from '../../../../Shared/domain/DomainEvent';

type TransactionCreatedDomainEventBody = {
    readonly amount: number;
    readonly accountId: string;
    readonly tagId: string;
    readonly transactionParentId?: string;
    readonly paid: boolean;
};

export class TransactionCreatedDomainEvent extends DomainEvent {
    static readonly EVENT_NAME = 'transaction.created';

    readonly amount: number;
    readonly accountId: string;
    readonly tagId: string;
    readonly transactionParentId?: string;
    readonly paid: boolean;

    constructor({
                    id,
                    amount,
                    accountId,
                    tagId,
                    transactionParentId,
                    paid,
                    eventId,
                    occurredOn
                }: {
        id: string;
        eventId?: string;
        amount: number;
        accountId: string;
        tagId: string;
        transactionParentId?: string;
        paid: boolean;
        occurredOn?: Date;
    }) {
        super(TransactionCreatedDomainEvent.EVENT_NAME, id, eventId, occurredOn);
        this.amount = amount;
        this.accountId = accountId;
        this.tagId = tagId;
        this.transactionParentId = transactionParentId;
        this.paid = paid;
    }

    toPrimitive(): TransactionCreatedDomainEventBody {
        const {amount, accountId, tagId, transactionParentId, paid} = this;
        return {
            amount: amount,
            accountId: accountId,
            tagId: tagId,
            transactionParentId: transactionParentId,
            paid: paid
        };
    }

    static fromPrimitives(
        aggregateId: string,
        body: TransactionCreatedDomainEvent,
        eventId: string,
        occurredOn: Date
    ): DomainEvent {
        return new TransactionCreatedDomainEvent({
                                                     id: aggregateId,
                                                     amount: body.amount,
                                                     accountId: body.accountId,
                                                     tagId: body.tagId,
                                                     transactionParentId: body.transactionParentId,
                                                     paid: body.paid,
                                                     eventId,
                                                     occurredOn
                                                 });
    }
}
