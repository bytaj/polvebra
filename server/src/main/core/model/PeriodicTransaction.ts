import * as Constants from '../../helpers/Constants';
import Tag from './Tag';
import * as GeneralFunctions from '../../helpers/GeneralFunctions';
import Account from './Account';
import AbstractTransaction from './AbstractTransaction';
import AbstractFactroy from '../factory/AbstractFactory';
import TransactionBuilder from '../factory/TransactionBuilder';
import TransactionContainer from './TransactionContainer';

export default class PeriodicTransaction extends TransactionContainer{
    private account: Account;
    private endDate?: Date;
    private interval : number;
    private transactionType : string;
    private lastDate?: Date;

    public constructor(name: string, amount: number, account: Account, interval:number, paidsAlreadyDones: number, transactionType:string, beginDate: Date, tag:Tag, endDate?: Date){
        super(name, amount, tag, beginDate);
        this.account = account;
        this.endDate = endDate;
        this.interval = interval;
        this.transactionType = transactionType;
    }

    public getTransacctionType(): string{
        return this.transactionType;
    }

    public setTransactionType(transactionType: string): void{
        this.transactionType = transactionType;
    }

    public getAccount():Account{
        return this.account;
    }

    public setAccount(account:Account) : void {
        this.account = account;
    }

    public getEndDate(): Date|undefined{
        return this.endDate;
    }

    public setEndDate(endDate: Date): void{
        this.endDate = endDate;
    }

    public getInterval(): number{
        return this.interval;
    }

    public setInterval(interval: number): void{
        this.interval = interval;
    }

    public createNewTransaction(transactionDate?: Date){
        let transactionBuilder : TransactionBuilder;
        if(!transactionDate){
            transactionDate = new Date();
        }
        let transactionName: string = this.getName() + GeneralFunctions.dateToString(transactionDate);
        if (this.getTransacctionType() == Constants.OUTLAY_STRING){
            transactionBuilder = AbstractFactroy.getTransactionFactory().createOutlayBuilder(transactionName, this.getAmount());
        }else{
            transactionBuilder = AbstractFactroy.getTransactionFactory().createDepositBuilder(transactionName, this.getAmount());
        }
        
        let transaction: AbstractTransaction = transactionBuilder.setDate(transactionDate).setPaid(true).build();
    }
}