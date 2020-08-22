import AbstractFactory from '../../transaction/domain/AbstractFactory';
import Account from '../../account/domain/Account';
import Tag from '../../tag/domain/Tag';
import AbstractTransaction from '../../transaction/domain/AbstractTransaction';
import PeriodicTransaction from '../../transaction/domain/PeriodicTransaction';
import {getPersistenceController} from '../../shared/application/PersistenceController';
import loggerFactory from '../../shared/application/LoggerFactory';

export default class User {
    private id?: any;
    private name : string;
    private username : string;
    private email :string;
    private password : string;

    private periodicTransactions: Array<PeriodicTransaction>;
    private accounts : Array<Account>;
    private tags : Array<Tag>;

    constructor(username: string, name:string, email:string, password:string) {
        this.username = username;
        this.name = name;
        this.email = email;
        this.password = password;
        this.periodicTransactions = [];
        this.accounts = [];
        this.tags = [];
    }

    public getId():any{
        return this.id;
    }

    public setId(id:any){
        if (!this.id){
            this.id = id;
        }
    }

    public getName():String {
        return this.name;
    }

    public setName(name : string) : void{
        this.name = name;
    }

    public getUsername():String {
        return this.username;
    }

    public setUsername(username : string) : void{
        this.username = username;
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

    public getPeriodicTransactions(): Array<PeriodicTransaction>{
        return this.periodicTransactions;
    }

    public setPeriodicTransactions(periodicTransactions: Array<PeriodicTransaction>): void{
        this.periodicTransactions = periodicTransactions;
    }

    createTag(name:string, description?:string){
        let tag:Tag = new Tag(name, description);
        this.tags.push(tag);
        getPersistenceController().getTagAdapter().createTag(tag, this);
    }


    public createAccount(name:string):void {
        this.accounts.push(AbstractFactory.getAccountFactory().createAccount(name));
    }

    public addTranssition(transaction:AbstractTransaction, account:Account){
        if (this.accounts.includes(account)){
            account.addTransaction(transaction);
        }
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

    public static createUserFromJSON(json:any):User{
        let user:User = new User(json.username, json.name, json.email, json.password);
        user.setId(json._id.valueOf());
        return user;
    }
}