import AbstractFactory from '../../transaction/domain/AbstractFactory';
import Account from '../../account/domain/Account';
import Tag from '../../tag/domain/Tag';
import AbstractTransaction from '../../transaction/domain/AbstractTransaction';
import PeriodicTransaction from '../../transaction/domain/PeriodicTransaction';
import {getPersistenceController} from '../../shared/application/PersistenceController';
import loggerFactory from '../../shared/application/LoggerFactory';

export default class User {
    private _id?: any;
    private _name: string;
    private _username: string;
    private _email: string;
    private _password: string;

    private _periodicTransactions: Array<PeriodicTransaction>;
    private _accounts: Array<Account>;
    private _tags: Array<Tag>;

    constructor(username: string, name: string, email: string, password: string) {
        this._username = username;
        this._name = name;
        this._email = email;
        this._password = password;
        this._periodicTransactions = [];
        this._accounts = [];
        this._tags = [];
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

    get username(): string {
        return this._username;
    }

    set username(value: string) {
        this._username = value;
    }

    get email(): string {
        return this._email;
    }

    set email(value: string) {
        this._email = value;
    }

    get password(): string {
        return this._password;
    }

    set password(value: string) {
        this._password = value;
    }

    get periodicTransactions(): Array<PeriodicTransaction> {
        return this._periodicTransactions;
    }

    set periodicTransactions(value: Array<PeriodicTransaction>) {
        this._periodicTransactions = value;
    }

    get accounts(): Array<Account> {
        return this._accounts;
    }

    set accounts(value: Array<Account>) {
        this._accounts = value;
    }

    get tags(): Array<Tag> {
        return this._tags;
    }

    set tags(value: Array<Tag>) {
        this._tags = value;
    }

    createTag(name: string, description?: string) {
        let tag: Tag = new Tag(name, description);
        this._tags.push(tag);
        getPersistenceController().getTagAdapter().createTag(tag, this);
    }


    public createAccount(name: string): void {
        this._accounts.push(AbstractFactory.getAccountFactory().createAccount(name));
    }

    public addTranssition(transaction: AbstractTransaction, account: Account) {
        if (this._accounts.includes(account)) {
            account.addTransaction(transaction);
        }
    }


    public getAllBalance(): number {
        let balance = 0;
        this._accounts.forEach(ac => {
            balance += ac.getBalance();
        });
        return balance;
    }

    public getNetBalance(): number {
        let balance = 0;
        this._accounts.forEach(ac => {
            balance += ac.getNetBalance();
        });
        return balance;
    }

    public static createUserFromJSON(json: any): User {
        let user: User = new User(json._username, json._name, json._email, json._password);
        user.id(json._id.valueOf());
        return user;
    }
}