import { DomainEvent } from '../../../../Shared/domain/DomainEvent';

type AccountModifyBalanceDomainEventBody = {
    readonly userId: string;
    readonly oldBalance: number;
    readonly newBalance: number;
    readonly paid: boolean;
};

export class AccountModifyBalanceDomainEvent extends DomainEvent {
    static readonly EVENT_NAME = 'account.balance.modified';

    readonly userId: string;
    readonly oldBalance: number;
    readonly newBalance: number;
    readonly paid: boolean;

    constructor({
                    id,
                    userId,
                    oldBalance,
                    newBalance,
                    paid,
                    eventId,
                    occurredOn
                }: {
        id: string;
        eventId?: string;
        userId: string;
        oldBalance: number;
        newBalance: number;
        paid: boolean;
        occurredOn?: Date;
    }) {
        super(AccountModifyBalanceDomainEvent.EVENT_NAME, id, eventId, occurredOn);
        this.userId = userId;
        this.oldBalance = oldBalance;
        this.newBalance = newBalance;
        this.paid = paid;
    }

    toPrimitive(): AccountModifyBalanceDomainEventBody {
        const {userId, oldBalance, newBalance, paid} = this;
        return {
            userId: userId,
            oldBalance: oldBalance,
            newBalance: newBalance,
            paid: paid
        };
    }

    static fromPrimitives(
        aggregateId: string,
        body: AccountModifyBalanceDomainEvent,
        eventId: string,
        occurredOn: Date
    ): DomainEvent {
        return new AccountModifyBalanceDomainEvent({
                                                     id: aggregateId,
                                                     userId: body.userId,
                                                     oldBalance: body.oldBalance,
                                                     newBalance: body.newBalance,
                                                     paid: body.paid,
                                                     eventId,
                                                     occurredOn
                                                 });
    }
}
