import Deposit from './Deposit';
import Outlay from './Outlay';
import * as Constants from '../../shared/application/Constants';
import AbstractTransaction from './AbstractTransaction';
import Tag from '../../tag/domain/Tag';

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
        this.currentTransaction.tag = tag;
        return this;
    }

    public setPaid(paid: boolean): TransactionBuilder {
        this.currentTransaction.paid = paid;
        return this;
    }

    public setDate(date:Date): TransactionBuilder{
        this.currentTransaction.date = date;
        return this;
    }

    public build(): AbstractTransaction{
        return this.currentTransaction;
    }
}

module.exports = TransactionBuilder;