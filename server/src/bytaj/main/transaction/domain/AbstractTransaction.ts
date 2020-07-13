import * as Constants from '../../shared/application/Constants';
import Tag from '../../tag/domain/Tag';
import * as DateFunctions from '../../shared/application/GeneralFunctions';
import TransactionContainer from './TransactionContainer'

export default abstract class AbstractTransaction extends TransactionContainer{
    private _subtransaction : Array<AbstractTransaction>;
    private _paid :boolean;

    public constructor(name: string, amount: number){
        super(name, amount);
        this._subtransaction = [];
        this._paid = true;
    }

    private calculeAllAmount: (acc: number, type: number, tr: AbstractTransaction) => number =
    function(acc: number, type: number, tr: AbstractTransaction): number {
        if (tr._paid){
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
        if (!tr._paid){
            acc += Math.abs(tr.calculeAmount(type));
        }
        return acc;
    };


    get subtransaction(): Array<AbstractTransaction> {
        return this._subtransaction;
    }

    set subtransaction(value: Array<AbstractTransaction>) {
        this._subtransaction = value;
    }

    get paid(): boolean {
        return this._paid;
    }

    set paid(value: boolean) {
        this._paid = value;
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
        return DateFunctions.isInDate(beginDate, endDate, this.date);
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
        if (this._subtransaction.length>0){
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
            this._subtransaction.forEach(tr => {
                subtransactionAmount = wayToCalcule(subtransactionAmount, type, tr);
            })
            return this.amount > Math.abs(subtransactionAmount) ? this.amount : subtransactionAmount;
        }else{
            return this.amount;
        }
    }

    

    public addSubTransaction(subtransaction : AbstractTransaction){
        this._subtransaction.push(subtransaction);
    }
}