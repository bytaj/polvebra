import AbstractFactory from '../factory/AbstractFactory';
import Account from './Account';
import Tag from './Tag';
import ITranssaction from './Itranssaction';

export default class User {
    private name : string;
    private email :string;
    private password : string;

    private accounts : Array<Account>;
    private tags : Array<Tag>;
        
    constructor(name:string, email:string, password:string) {
        this.name = name;
        this.email = email;
        this.password = password;

        this.accounts = new Array();
        this.tags = new Array();
    }


    public getName():String {
        return this.name;
    }

    public setName(name : string) : void{
        this.name = name;
    }

    public getEmail():String {
        return this.email;
    }

    public setEmail(email : string) : void{
        this.email = email;
    }

    public getPassword():String {
        return this.password;
    }

    public setPassword(password : string) : void{
        this.password = password;
    }

    public getAccounts(): Array<Account>{
        return this.accounts;
    }

    public setAccounts(accounts: Array<Account>): void{
        this.accounts = accounts;
    }

    public getTags(): Array<Tag>{
        return this.tags;
    }

    public setTags(tags: Array<Tag>): void{
        this.tags = tags;
    }


    public getAllBalance() : number{
        let balance = 0;
        this.accounts.forEach(ac => {
            balance+= ac.getBalance();
        });
        return balance;
    }

    public getNetBalance():number {
        let balance = 0;
        this.accounts.forEach(ac => {
            balance+= ac.getNetBalance();
        });
        return balance;
    }

    public createAccount(name:string):void {
        this.accounts.push(AbstractFactory.getAccountFactory().createAccount(name));
    }

    public addTranssition(transsaction:ITranssaction, account:Account){
        if (this.accounts.includes(account)){
            account.addTranssaction(transsaction);
        }
    }
    
}