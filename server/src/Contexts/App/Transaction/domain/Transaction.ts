import container from '../../../../apps/backend/config/dependency-injection';
import { Nullable } from '../../../Shared/domain/Nullable';
import { DateCompleteValueObject } from '../../../Shared/domain/value-object/DateCompleteValueObject';
import { AccountId } from '../../Shared/domain/Account/AccountId';
import { TagId } from '../../Shared/domain/Tag/TagId';
import { TransactionId } from '../../Shared/domain/Transaction/TransactionId';
import { UserId } from '../../Shared/domain/User/UserId';
import { TransactionCreatedDomainEvent } from './DomainEvent/TransactionCreatedDomainEvent';
import TransactionAmount from './TransactionAmount';
import TransactionContainer from './TransactionContainer';
import { TransactionName } from './TransactionName';
import TransactionRepository from './TransactionRepository';


export default class Transaction extends TransactionContainer {
    private readonly repository: TransactionRepository = container.get('Polvebra.transaction.TransactionRepository');
    private _date: DateCompleteValueObject;
    readonly transactionParentId: Nullable<TransactionId>;
    private _paid: boolean;
    private _overwriteBySubTransaction: boolean;

    public constructor(id: TransactionId,
                       userId: UserId,
                       accountId: AccountId,
                       tagId: TagId,
                       transactionParentId: Nullable<TransactionId>,
                       name: TransactionName,
                       amount: TransactionAmount,
                       paid: boolean,
                       date: DateCompleteValueObject,
                       overwriteBySubTransaction: boolean) {
        super(id, userId, accountId, tagId, name, amount);
        this._paid = paid;
        this.transactionParentId = transactionParentId;
        this._date = date;
        this._overwriteBySubTransaction = overwriteBySubTransaction;
    }

    public get paid(): boolean {
        return this._paid;
    }

    public set paid(value: boolean) {
        this._paid = value;
    }

    public get date(): DateCompleteValueObject {
        return this._date;
    }

    public set date(value: DateCompleteValueObject) {
        this._date = value;
    }

    public get overwriteBySubTransaction(): boolean {
        return this._overwriteBySubTransaction;
    }

    public set overwriteBySubTransaction(value: boolean) {
        this._overwriteBySubTransaction = value;
    }

    static create(id: TransactionId,
                  userId: UserId,
                  accountId: AccountId,
                  tagId: TagId,
                  transactionId: Nullable<TransactionId>,
                  name: Nullable<TransactionName>,
                  amount: TransactionAmount,
                  paid: boolean,
                  overwriteBySubTransaction: boolean,
                  date?: DateCompleteValueObject): Transaction {
        let recordDate, recordName;
        name ? recordName = name : recordName = new TransactionName('');
        date ? recordDate = date : recordDate = DateCompleteValueObject.createNow();
        if (overwriteBySubTransaction) {
            amount = new TransactionAmount(0);
        }
        const transaction = new Transaction(id,
                                            userId,
                                            accountId,
                                            tagId,
                                            transactionId,
                                            recordName,
                                            amount,
                                            paid,
                                            recordDate,
                                            overwriteBySubTransaction
        );
        transaction.record(new
                           TransactionCreatedDomainEvent({
                                                             id: transaction.id.value,
                                                             amount: transaction.amount.value,
                                                             accountId: transaction.accountId.value,
                                                             tagId: transaction.tagId.value,
                                                             transactionParentId: transaction.transactionParentId?.value,
                                                             paid: transaction.paid
                                                         }));
        return transaction;
    }

    static fromPrimitives(plainData: {
        id: string,
        userId: string,
        accountId: string,
        tagId: string,
        transactionParentId: string | null,
        name: string,
        amount: number,
        paid: boolean,
        overwriteBySubTransaction: boolean,
        date: string
    }): Transaction {
        return new Transaction(
            new TransactionId(plainData.id),
            new UserId(plainData.userId),
            new AccountId(plainData.accountId),
            new TagId(plainData.tagId),
            plainData.transactionParentId ? new TransactionId(plainData.transactionParentId) : null,
            new TransactionName(plainData.name),
            new TransactionAmount(plainData.amount),
            plainData.paid,
            DateCompleteValueObject.createFromString(plainData.date),
            plainData.overwriteBySubTransaction
        );
    }

    public toPrimitives() {
        return {
            id: this.id.value,
            userId: this.userId.value,
            accountId: this.accountId.value,
            tagId: this.tagId.value,
            transactionParentId: this.transactionParentId?.value,
            name: this.name.value,
            amount: this.amount.value,
            paid: this._paid,
            overwriteBySubTransaction: this._overwriteBySubTransaction,
            date: this.date.toString()
        };
    }

    public async getSubsTransaction(): Promise<Nullable<Transaction[]>> {
        return this.repository.searchSubTransaction(this.id);
    }

    public async hasSubTransaction(transactionId: TransactionId): Promise<boolean> {
        const subTransactions = await this.getSubsTransaction();
        if (!subTransactions) {
            return false;
        }
        return subTransactions.find(entry => entry.id.value ==
            transactionId.value) !=
            undefined;
    }

    public async addSubTransaction(newTransactionId: TransactionId, amount: TransactionAmount): Promise<void> {
        if (this._overwriteBySubTransaction) {
            this.modifyAmount(amount);
        }
        await this.repository.search(newTransactionId);
    }

    public async modifyAmount(modification: TransactionAmount) {
        this.amount =
            new TransactionAmount(this.amount.value +
                                      modification.value);
    }

    /*private calculeAllAmount: (acc: number, type: number, tr: AbstractTransaction) => number =

        function (acc: number, type: number, tr: AbstractTransaction): number {
            if (tr._paid) {
                acc += Math.abs(tr.calculeAmount(type));
            }
            return acc;
        };

    private calculeNetAmount: (acc: number, type: number, tr: AbstractTransaction) => number =
        function (acc: number, type: number, tr: AbstractTransaction): number {
            acc += Math.abs(tr.calculeAmount(type));
            return acc;
        };

    private calculeRetainAmount: (acc: number, type: number, tr: AbstractTransaction) => number =
        function (acc: number, type: number, tr: AbstractTransaction): number {
            if (!tr._paid) {
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

    public getTotalAmount(beginDate?: Date, endDate?: Date): number {
        return this.calculateInTime(Constants.ALL_AMOUNT, beginDate, endDate);
    }

    public getNetAmount(beginDate?: Date, endDate?: Date): number {
        return this.calculateInTime(Constants.NET_AMOUNT, beginDate, endDate);
    }

    public getRetainAmount(beginDate?: Date, endDate?: Date): number {
        return this.calculateInTime(Constants.RETAIN_AMOUNT, beginDate, endDate);
    }

    public isInDate(beginDate: Date, endDate: Date): boolean {
        return DateFunctions.isInDate(beginDate, endDate, this.date);
    }

    private calculateInTime(type: number, beginDate?: Date, endDate?: Date): number {
        if (beginDate) {
            if (!endDate) {
                endDate = new Date();
            }
            if (this.isInDate(beginDate, endDate)) {
                return this.calculeAmount(type);
            }
            return 0;
        } else {
            return this.calculeAmount(type);
        }
    }

    private calculeAmount(type: number): number {
        if (this._subtransaction.length >
            0) {
            let subtransactionAmount = 0;
            let wayToCalcule: (acc: number, type: number, tr: AbstractTransaction) => number;
            switch (type) {
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
            });
            return this.amount >
            Math.abs(subtransactionAmount) ? this.amount : subtransactionAmount;
        } else {
            return this.amount;
        }
    }


    public addSubTransaction(subtransaction: AbstractTransaction) {
        this._subtransaction.push(subtransaction);
    }*/
}