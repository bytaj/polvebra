import { AggregateRoot } from '../../../Shared/domain/AggregateRoot';
import { Balance } from '../../../Shared/domain/value-object/Balance';
import { AccountId } from '../../Shared/domain/Account/AccountId';
import { UserId } from '../../Shared/domain/User/UserId';
import TransactionAmount from '../../Transaction/domain/TransactionAmount';
import { AccountName } from './AccountName';
import { AccountModifyBalanceDomainEvent } from './DomainEvent/AccountModifyBalanceDomainEvent';

export default class Account extends AggregateRoot {
    readonly id: AccountId;
    readonly userId: UserId;
    private _name: AccountName;
    private _balance: Balance;
    private _netBalance: Balance;


    constructor(accountId: AccountId,
                userId: UserId,
                name: AccountName,
                balance: Balance,
                netBalance: Balance) {
        super();
        this.id = accountId;
        this.userId = userId;
        this._name = name;
        this._balance = balance;
        this._netBalance = netBalance;
    }

    public get name(): AccountName {
        return this._name;
    }

    public set name(value: AccountName) {
        this._name = value;
    }

    public get balance(): Balance {
        return this._balance;
    }

    public set balance(value: Balance) {
        this._balance = value;
    }

    public get netBalance(): Balance {
        return this._netBalance;
    }

    public set netBalance(value: Balance) {
        this._netBalance = value;
    }

    static create(accountId: AccountId,
                  userId: UserId,
                  name: AccountName): Account {
        return new Account(accountId, userId, name, new Balance(0), new Balance(0));
    }

    static fromPrimitives(plainData: {
        id: string;
        userId: string;
        name: string;
        balance: number;
        netBalance: number;
    }): Account {
        return new Account(
            new AccountId(plainData.id),
            new UserId(plainData.userId),
            new AccountName(plainData.name),
            new Balance(plainData.balance),
            new Balance(plainData.netBalance)
        );
    }

    public toPrimitives() {
        return {
            id: this.id.value,
            userId: this.userId.value,
            name: this._name.value,
            balance: this._balance.value,
            netBalance: this._netBalance.value
        };
    }

    public modifyBalance(amount: TransactionAmount, paid: boolean): void {
        let oldBalance, newBalance;
        if (paid) {
            oldBalance = this.netBalance.value;
            this._netBalance =
                new Balance(this.netBalance.value +
                                amount.value);
            newBalance = this.netBalance.value;
        } else {
            oldBalance = this.balance.value;
            this._balance =
                new Balance(this.balance.value +
                                amount.value);
            newBalance = this.balance.value;
        }
        this.record(new AccountModifyBalanceDomainEvent({
                                                            id: this.id.value,
                                                            userId: this.userId.value,
                                                            oldBalance: oldBalance,
                                                            newBalance: newBalance,
                                                            paid: paid
                                                        }));
    }
}