import { AggregateRoot } from '../../../Shared/domain/AggregateRoot';
import { Nullable } from '../../../Shared/domain/Nullable';
import { AccountId } from '../../Shared/domain/Account/AccountId';
import { TagId } from '../../Shared/domain/Tag/TagId';
import { TransactionId } from '../../Shared/domain/Transaction/TransactionId';
import { UserId } from '../../Shared/domain/User/UserId';
import TransactionAmount from './TransactionAmount';
import TransactionDate from './TransactionDate';
import { TransactionName } from './TransactionName';

export default abstract class TransactionContainer extends AggregateRoot {
    readonly id: TransactionId;
    readonly userId: UserId;
    readonly accountId: AccountId;
    private _tagId: TagId;
    private _name: TransactionName;
    private _amount: TransactionAmount;
    private _date: TransactionDate;


    constructor(id: TransactionId,
                userId: UserId,
                accountId: AccountId,
                tagId: TagId,
                name: Nullable<TransactionName>,
                amount: TransactionAmount,
                date: TransactionDate) {
        super();
        this.id = id;
        this.userId = userId;
        this.accountId = accountId;
        name ? this._name = name : this._name = new TransactionName("");
        this._tagId = tagId;
        this._amount = amount;
        this._date = TransactionDate.create(new Date());
    }


    public get name(): TransactionName {
        return this._name;
    }

    public set name(value: TransactionName) {
        this._name = value;
    }

    public get tagId(): TagId {
        return this._tagId;
    }

    public set tagId(value: TagId) {
        this._tagId = value;
    }

    public get amount(): TransactionAmount {
        return this._amount;
    }

    public set amount(value: TransactionAmount) {
        this._amount = value;
    }

    public get date(): TransactionDate {
        return this._date;
    }

    public set date(value: TransactionDate) {
        this._date = value;
    }
}