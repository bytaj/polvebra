import AbstractTransaction from '../../Transaction/domain/AbstractTransaction';

export default class Account {
    private _id?: any;
    private _name: string;
    private _transactions: Array<AbstractTransaction>;

    public constructor(name: string) {
        this._name = name;
        this._transactions = [];
    }

    get id(): any {
        return this._id;
    }

    set id(value: any) {
        this._id = value;
    }

    get name(): string {
        return this._name;
    }

    set name(value: string) {
        this._name = value;
    }

    get transactions(): Array<AbstractTransaction> {
        return this._transactions;
    }

    set transactions(value: Array<AbstractTransaction>) {
        this._transactions = value;
    }

    public addTransaction(transactions: AbstractTransaction): void {
        this._transactions.push(transactions);
    }

    public getBalance(): number {
        let balance = 0;
        this._transactions.forEach(tr => {
            balance += tr.getTotalAmount();
        });
        return balance;
    }

    public getNetBalance(): number {
        let balance = 0;
        this._transactions.forEach(tr => {
            balance += tr.getNetAmount();
        });
        return balance;
    }
}