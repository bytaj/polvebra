import * as Constants from '../../helpers/Constants';
import Tag from './Tag';
import * as DateFunctions from '../../helpers/GeneralFunctions';
import TransactionContainer from './TransactionContainer'

export default abstract class AbstractTransaction extends TransactionContainer{
    private subtransaction : Array<AbstractTransaction>;
    private paid :boolean;

    public constructor(name: string, amount: number){
        super(name, amount);
        this.subtransaction = new Array();
        this.paid = true;
    }

    private calculeAllAmount: (acc: number, type: number, tr: AbstractTransaction) => number =
    function(acc: number, type: number, tr: AbstractTransaction): number {
        if (tr.paid){
            acc += Math.abs(tr.calculeAmount(type));
        }
        return acc;
    };
    
    private calculeNetAmount: (acc: number, type: number, tr: AbstractTransaction) => number =
    function(acc: number, type: number, tr: AbstractTransaction): number {
        acc += Math.abs(tr.calculeAmount(type));
        return acc;
    };

    private calculeRetainAmount: (acc: number, type: number, tr: AbstractTransaction) => number =
    function(acc: number, type: number, tr: AbstractTransaction): number {
        if (!tr.paid){
            acc += Math.abs(tr.calculeAmount(type));
        }
        return acc;
    };
    
    
    public getSubtransaction(): Array<AbstractTransaction>{
        return this.subtransaction;
    }

    public setSubtransaction(subtransaction: Array<AbstractTransaction>): void{
        this.subtransaction = subtransaction;
    }

    public isPaid(): boolean{
        return this.paid;
    }

    public setPaid(paid: boolean): void{
        this.paid = paid;
    }


    public getTotalAmount(beginDate?: Date, endDate?: Date): number{
        return this.calculateInTime(Constants.ALL_AMOUNT, beginDate, endDate);
    }

    public getNetAmount(beginDate?: Date, endDate?: Date): number{
        return this.calculateInTime(Constants.NET_AMOUNT, beginDate, endDate);
    }

    public getRetainAmount(beginDate?: Date, endDate?: Date): number{
        return this.calculateInTime(Constants.RETAIN_AMOUNT, beginDate, endDate);
    }

    public isInDate(beginDate: Date, endDate: Date):boolean{
        return DateFunctions.isInDate(beginDate, endDate, this.getDate());
    }

    private calculateInTime(type: number, beginDate?: Date, endDate?: Date): number{
        if (beginDate){
            if (!endDate){
                endDate = new Date();
            }
            if (this.isInDate(beginDate, endDate)){
                return this.calculeAmount(type);
            }
            return 0;
        }else{
            return this.calculeAmount(type);
        }
    }

    private calculeAmount(type: number) : number{
        if (this.subtransaction.length>0){
            let subtransactionAmount = 0;
            let wayToCalcule: (acc: number, type: number, tr: AbstractTransaction) => number;
            switch(type){
                case Constants.ALL_AMOUNT:
                    wayToCalcule = this.calculeAllAmount;
                    break;
                case Constants.NET_AMOUNT:
                    wayToCalcule = this.calculeNetAmount;
                    break;
                case Constants.RETAIN_AMOUNT:
                    wayToCalcule = this.calculeRetainAmount;
            }
            this.subtransaction.forEach(tr => {
                subtransactionAmount = wayToCalcule(subtransactionAmount, type, tr);
            })
            return this.getAmount() > Math.abs(subtransactionAmount) ? this.getAmount() : subtransactionAmount;
        }else{
            return this.getAmount();
        }
    }

    

    public addSubTransaction(subtransaction : AbstractTransaction){
        this.subtransaction.push(subtransaction);
    }
}