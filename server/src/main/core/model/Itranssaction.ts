import * as Constants from '../../helpers/Constants';
import Tag from './Tag';

export default abstract class ITranssaction{
    private name: string;
    private tag?: Tag;
    private amount : number;
    private subtranssaction : Array<ITranssaction>;
    private date : Date;
    private paid :boolean;
    private endDate?: Date;
    private periodic : boolean;

    public constructor(){
        this.name = "";
        this.amount = 0;
        this.subtranssaction = new Array();
        this.date = new Date();
        this.paid = true;
        this.periodic = false;
    }

    public getName(): string{
        return this.name;
    }

    public setName(name: string): void{
        this.name = name;
    }

    public getTag(): Tag|undefined{
        return this.tag;
    }

    public setTag(tag: Tag): void{
        this.tag = tag;
    }

    public getAmount(): number{
        return this.amount;
    }

    public setAmount(amount: number): void{
        this.amount = amount;
    }

    public getSubtranssaction(): Array<ITranssaction>{
        return this.subtranssaction;
    }

    public setSubtranssaction(subtranssaction: Array<ITranssaction>): void{
        this.subtranssaction = subtranssaction;
    }

    public getDate(): Date{
        return this.date;
    }

    public setDate(date: Date): void{
        this.date = date;
    }

    public isPaid(): boolean{
        return this.paid;
    }

    public setPaid(paid: boolean): void{
        this.paid = paid;
    }

    public getEndDate(): Date|undefined{
        return this.endDate;
    }

    public setEndDate(endDate: Date): void{
        this.endDate = endDate;
    }

    public isPeriodic(): boolean{
        return this.periodic;
    }

    public setPeriodic(periodic: boolean): void{
        this.periodic = periodic;
    }


    public getTotalAmount(){
        return this.calculeAmount(Constants.ALL_AMOUNT);
    }

    public getNetAmount(){
        return this.calculeAmount(Constants.NET_AMOUNT);
    }

    public getRetainAmount(){
        return this.calculeAmount(Constants.RETAIN_AMOUNT);
    }

    private calculeAmount(type: number) : number{
        if (this.subtranssaction.length>0){
            let subtranssactionAmount = 0;
            this.subtranssaction.forEach(tr => {
                switch(type){
                    case Constants.ALL_AMOUNT:
                        subtranssactionAmount += Math.abs(tr.calculeAmount(type));
                        break;
                    case Constants.NET_AMOUNT:
                        if (tr.paid){
                            subtranssactionAmount += Math.abs(tr.calculeAmount(type));
                            break;
                        }
                    case Constants.RETAIN_AMOUNT:
                        if (!tr.paid){
                            subtranssactionAmount += Math.abs(tr.calculeAmount(type));
                            break;
                        }
                }
            })
            return this.amount > Math.abs(subtranssactionAmount) ? this.amount : subtranssactionAmount;
        }else{
            return this.amount;
        }
        
    }

    public addSubTranssaction(subtranssaction : ITranssaction){
        this.subtranssaction.push(subtranssaction);
    }
}