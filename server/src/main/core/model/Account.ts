import AbstractTransaction from './AbstractTransaction';

export default class Account{
    private name: string;
    private transactions: Array<AbstractTransaction>;

    public constructor(name : string){
        this.name = name;
        this.transactions = new Array();
    }

    public getName():String {
        return this.name;
    }

    public setName(name : string) : void{
        this.name = name;
    }

    public getTransactions(): Array<AbstractTransaction>{
        return this.transactions;
    }

    public setTransaction(transactions: Array<AbstractTransaction>): void{
        this.transactions = transactions;
    }

    public addTransaction(transactions : AbstractTransaction) : void{
        this.transactions.push(transactions);
    }

    public getBalance() : number{
        let balance = 0;
        this.transactions.forEach(tr => {
            balance+= tr.getTotalAmount();
        });
        return balance;
    }

    public getNetBalance() : number{
        let balance = 0;
        this.transactions.forEach(tr => {
            balance+= tr.getNetAmount();
        });
        return balance;
    }
}