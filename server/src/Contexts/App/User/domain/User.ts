import { AggregateRoot } from '../../../Shared/domain/AggregateRoot';
import { Balance } from '../../../Shared/domain/value-object/Balance';
import { UserId } from '../../Shared/domain/User/UserId';
import { Email } from './Email';
import { Name } from './Name';
import { Password } from './Password';
import { Username } from './Username';

export default class User extends AggregateRoot {
    readonly id: UserId;
    private _name: Name;
    readonly username: Username;
    readonly email: Email;
    private _password: Password;
    private _balance: Balance;
    private _netBalance: Balance;

    constructor(id: UserId,
                username: Username,
                name: Name,
                email: Email,
                password: Password,
                balance: Balance,
                netBalance: Balance) {
        super();
        this.id = id;
        this.username = username;
        this._name = name;
        this.email = email;
        this._password = password;
        this._netBalance = netBalance;
        this._balance = balance;
    }

    public get name(): Name {
        return this._name;
    }

    public set name(name: Name) {
        this._name = name;
    }

    public get password(): Password {
        return this._password;
    }

    public set password(password: Password) {
        this._password = password;
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

    static create(id: UserId,
                  username: Username,
                  name: Name,
                  email: Email,
                  password: Password): User {
        return new User(id, username, name, email, password, new Balance(0), new Balance(0));
    }

    static fromPrimitives(plainData: {
        id: string;
        username: string;
        name: string;
        email: string;
        password: string;
        balance: number;
        netBalance: number;
    }): User {
        return new User(
            new UserId(plainData.id),
            new Username(plainData.username),
            new Name(plainData.name),
            new Email(plainData.email),
            new Password(plainData.password),
            new Balance(plainData.balance),
            new Balance(plainData.netBalance)
        );
    }

    public toPrimitives() {
        return {
            id: this.id.value,
            username: this.username.value,
            name: this._name.value,
            email: this.email.value,
            password: this._password.value,
            balance: this._balance.value,
            netBalance: this._netBalance.value,
        };
    }

    public modifyBalance(oldBalance: Balance, newBalance: Balance, paid: boolean): void {
        let variation: number;
        variation =
            newBalance.value -
            oldBalance.value;
        if (paid) {
            this._netBalance =
                new Balance(this.netBalance.value +
                                variation);
        } else {
            this._balance =
                new Balance(this.balance.value +
                                variation);
        }
    }

    /*public getAllBalance(): number {

        let balance = 0;
        this.accounts.forEach(ac => {
            balance += ac.getBalance();
        });
        return balance;
    }

    public getNetBalance(): number {
        let balance = 0;
        this.accounts.forEach(ac => {
            balance += ac.getNetBalance();
        });
        return balance;
    }

    public static createUserFromJSON(json: any): User {
        let user: User = new User(json.username, json.name, json.email, json.password);
        user.setId(json._id.valueOf());
        return user;
    }*/
}