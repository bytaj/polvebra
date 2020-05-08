import Deposit from '../model/Deposit';
import Outlay from '../model/Outlay';
import * as Constants from '../../helpers/Constants';
import AbstractTransaction from '../model/AbstractTransaction';
import Tag from '../model/Tag';

export default class TransactionBuilder{
    private currentTransaction: AbstractTransaction;

    constructor(type: string, name:string, amount:number){
        if (type == Constants.OUTLAY_STRING){
            this.currentTransaction = new Outlay(name, amount);
        }else{
            this.currentTransaction = new Deposit(name, amount);
        }
    }

    public setTag(tag : Tag): TransactionBuilder {
        this.currentTransaction.setTag(tag);
        return this;
    }

    public setPaid(paid: boolean): TransactionBuilder {
        this.currentTransaction.setPaid(paid);
        return this;
    }

    public setDate(date:Date): TransactionBuilder{
        this.currentTransaction.setDate(date);
        return this;
    }

    public build(): AbstractTransaction{
        return this.currentTransaction;
    }
}

module.exports = TransactionBuilder;