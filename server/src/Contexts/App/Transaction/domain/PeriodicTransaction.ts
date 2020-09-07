import { Nullable } from '../../../Shared/domain/Nullable';
import { DateCompleteValueObject } from '../../../Shared/domain/value-object/DateCompleteValueObject';
import { DayDateValueObject } from '../../../Shared/domain/value-object/DayDateValueObject';
import { AccountId } from '../../Shared/domain/Account/AccountId';
import { TagId } from '../../Shared/domain/Tag/TagId';
import { PeriodicTransactionId } from '../../Shared/domain/Transaction/PeriodicTransactionId';
import { TransactionId } from '../../Shared/domain/Transaction/TransactionId';
import { UserId } from '../../Shared/domain/User/UserId';
import { numberToIntervalPeriodicTransaction } from './IntervalPeriodicTransaction';
import { IntervalPeriodicTransaction } from './IntervalPeriodicTransaction';
import TransactionAmount from './TransactionAmount';
import TransactionContainer from './TransactionContainer';
import { TransactionName } from './TransactionName';

export default class PeriodicTransaction extends TransactionContainer {
    private _beginDate: DayDateValueObject;
    private _endDate: Nullable<DayDateValueObject>;
    private _interval: IntervalPeriodicTransaction;
    private _lastDate: DayDateValueObject;

    public constructor(id: PeriodicTransactionId,
                       userId: UserId,
                       accountId: AccountId,
                       tagId: TagId,
                       name: TransactionName,
                       amount: TransactionAmount,
                       interval: IntervalPeriodicTransaction,
                       lastDate: DayDateValueObject,
                       beginDate: DateCompleteValueObject,
                       endDate: Nullable<DateCompleteValueObject>) {
        super(id, userId, accountId, tagId, name, amount);

        this._beginDate = beginDate;
        this._endDate = endDate;
        this._interval = interval;
        this._lastDate = lastDate;
    }

    public get beginDate(): DayDateValueObject {
        return this._beginDate;
    }

    public set beginDate(value: DayDateValueObject) {
        this._beginDate = value;
    }

    public get endDate(): Nullable<DayDateValueObject> {
        return this._endDate;
    }

    public set endDate(value: Nullable<DayDateValueObject>) {
        this._endDate = value;
    }

    public get interval(): IntervalPeriodicTransaction {
        return this._interval;
    }

    public set interval(value: IntervalPeriodicTransaction) {
        this._interval = value;
    }

    public get lastDate(): DayDateValueObject {
        return this._lastDate;
    }

    public set lastDate(value: DayDateValueObject) {
        this._lastDate = value;
    }

    static create(id: PeriodicTransactionId,
                  userId: UserId,
                  accountId: AccountId,
                  tagId: TagId,
                  name: TransactionName,
                  amount: TransactionAmount,
                  interval: IntervalPeriodicTransaction,
                  lastDate: Nullable<DayDateValueObject>,
                  beginDate: Nullable<DateCompleteValueObject>,
                  endDate: Nullable<DateCompleteValueObject>): PeriodicTransaction {
        const currentBeginDate = beginDate ? beginDate : DayDateValueObject.createNow();
        const currentLastDate = lastDate ? lastDate : currentBeginDate;
        return new PeriodicTransaction(id,
                                       userId,
                                       accountId,
                                       tagId,
                                       name,
                                       amount,
                                       interval,
                                       currentLastDate,
                                       currentBeginDate,
                                       endDate);
    }

    static fromPrimitives(plainData: {
        id: string,
        userId: string,
        accountId: string,
        tagId: string,
        name: string,
        amount: number,
        interval:number,
        lastDate: string,
        beginDate: string,
        endDate: string
    }): PeriodicTransaction {
        return new PeriodicTransaction(
            new TransactionId(plainData.id),
            new UserId(plainData.userId),
            new AccountId(plainData.accountId),
            new TagId(plainData.tagId),
            new TransactionName(plainData.name),
            new TransactionAmount(plainData.amount),
            numberToIntervalPeriodicTransaction(plainData.interval),
            DayDateValueObject.createFromString(plainData.lastDate),
            DayDateValueObject.createFromString(plainData.beginDate),
            DayDateValueObject.createFromString(plainData.endDate),
        );
    }

    public toPrimitives() {
        return {
            id: this.id.value,
            userId: this.userId.value,
            accountId: this.accountId.value,
            tagId: this.tagId.value,
            name: this.name.value,
            amount: this.amount.value,
            interval:this.interval.valueOf(),
            lastDate: this._lastDate.toString(),
            beginDate: this._beginDate.toString(),
            endDate: this.endDate ? this._endDate?.toString() : null,
        };
    }
}