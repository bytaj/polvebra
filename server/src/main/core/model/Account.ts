import ITranssaction from './Itranssaction';

export default class Account{
    private name: string;
    private transsactions: Array<ITranssaction>;

    public constructor(name : string){
        this.name = name;
        this.transsactions = new Array();
    }

    public getName():String {
        return this.name;
    }

    public setName(name : string) : void{
        this.name = name;
    }

    public getTranssactions(): Array<ITranssaction>{
        return this.transsactions;
    }

    public setTranssaction(transsactions: Array<ITranssaction>): void{
        this.transsactions = transsactions;
    }

    public addTranssaction(transsactions : ITranssaction) : void{
        this.transsactions.push(transsactions);
    }

    public getBalance() : number{
        let balance = 0;
        this.transsactions.forEach(tr => {
            balance+= tr.getTotalAmount();
        });
        return balance;
    }

    public getNetBalance() : number{
        let balance = 0;
        this.transsactions.forEach(tr => {
            balance+= tr.getNetAmount();
        });
        return balance;
    }
}