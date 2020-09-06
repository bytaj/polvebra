import * as Constants from '../../../../../polvebra/src/bytaj/main/shared/application/Constants';
import Tag from '../../Tag/domain/Tag';
import * as GeneralFunctions from '../../../../../polvebra/src/bytaj/main/shared/application/GeneralFunctions';
import Account from '../../Account/domain/Account';
import AbstractTransaction from './AbstractTransaction';
import AbstractFactroy from './AbstractFactory';
import TransactionBuilder from './TransactionBuilder';
import TransactionContainer from './TransactionContainer';

export default class PeriodicTransaction extends TransactionContainer{
    private _account: Account;
    private _endDate?: Date;
    private _interval : number;
    private _transactionType : string;
    private _lastDate?: Date;

    public constructor(name: string, amount: number, account: Account, interval:number, paidsAlreadyDones: number, transactionType:string, beginDate: Date, tag:Tag, endDate?: Date){
        super(name, amount, tag, beginDate);
        this._account = account;
        this._endDate = endDate;
        this._interval = interval;
        this._transactionType = transactionType;
    }


    get account(): Account {
        return this._account;
    }

    set account(value: Account) {
        this._account = value;
    }

    get endDate(): Date {
        return <Date>this._endDate;
    }

    set endDate(value: Date) {
        this._endDate = value;
    }

    get interval(): number {
        return this._interval;
    }

    set interval(value: number) {
        this._interval = value;
    }

    get transactionType(): string {
        return this._transactionType;
    }

    set transactionType(value: string) {
        this._transactionType = value;
    }

    get lastDate(): Date {
        return <Date>this._lastDate;
    }

    set lastDate(value: Date) {
        this._lastDate = value;
    }

    public createNewTransaction(transactionDate?: Date){
        let transactionBuilder : TransactionBuilder;
        if(!transactionDate){
            transactionDate = new Date();
        }
        let transactionName: string = this.name + GeneralFunctions.dateToString(transactionDate);
        if (this.transactionType == Constants.OUTLAY_STRING){
            transactionBuilder = AbstractFactroy.getTransactionFactory().createOutlayBuilder(transactionName, this.amount);
        }else{
            transactionBuilder = AbstractFactroy.getTransactionFactory().createDepositBuilder(transactionName, this.amount);
        }

        let transaction: AbstractTransaction = transactionBuilder.setDate(transactionDate).setPaid(true).build();
    }
}