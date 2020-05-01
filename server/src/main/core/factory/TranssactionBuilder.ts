import Deposit from '../model/Deposit';
import Outlay from '../model/Outlay';
import * as Constants from '../../helpers/Constants';
import ITranssaction from '../model/Itranssaction';
import Tag from '../model/Tag';

export default class TranssactionBuilder{
    private currentTranssaction: ITranssaction;

    constructor(type: string){
        if (type == Constants.OUTLAY_STRING){
            this.currentTranssaction = new Outlay();
        }else{
            this.currentTranssaction = new Deposit();
        }
    }

    public setName(name: string): TranssactionBuilder{
        this.currentTranssaction.setName(name);
        return this;
    }

    public setTag(tag : Tag): TranssactionBuilder {
        this.currentTranssaction.setTag(tag);
        return this;
    }

    public setAmount(amount:number): TranssactionBuilder {
        this.currentTranssaction.setAmount(amount);
        return this;
    }

    public setPaid(paid: boolean): TranssactionBuilder {
        this.currentTranssaction.setPaid(paid);
        return this;
    }

    public setEndDate(endDate:Date): TranssactionBuilder{
        this.currentTranssaction.setEndDate(endDate);
        return this;
    }

    public setPeriodic(periodic:boolean): TranssactionBuilder{
        this.currentTranssaction.setPeriodic(periodic);
        return this;
    }

    public build(): ITranssaction{
        return this.currentTranssaction;
    }
}

module.exports = TranssactionBuilder;