import mongoose from 'mongoose';
import { Model } from 'mongoose';
import { DuplicateKeyException } from '../../../../Shared/domain/exceptions/DuplicateKeyException';
import { UndefinedException } from '../../../../Shared/domain/exceptions/UndefinedException';
import { Nullable } from '../../../../Shared/domain/Nullable';
import { MongoRepository } from '../../../../Shared/infrastructure/persistence/mongo/MongoRepository';
import { AccountId } from '../../../Shared/domain/Account/AccountId';
import { TransactionId } from '../../../Shared/domain/Transaction/TransactionId';
import { UserId } from '../../../Shared/domain/User/UserId';
import Transaction from '../../domain/Transaction';
import TransactionRepository from '../../domain/TransactionRepository';
import TransactionModel from './mongo/TransactionModel';

export class MongoTransactionRepository extends MongoRepository<Transaction> implements TransactionRepository {

    public async save(transaction: Transaction): Promise<void> {
        return this.publish(transaction.id.value, transaction)
            .catch((err) => {
                if (err instanceof
                    mongoose.Error) {
                    throw new DuplicateKeyException(err.message);
                } else {
                    throw new UndefinedException(err.message);
                }
            });
    }

    public async search(id: TransactionId): Promise<Nullable<Transaction>> {
        let document = await this.findByID(id.toString());
        return document ? Transaction.fromPrimitives({...document, id: id.value}) : null;
    }

    public async searchAll(): Promise<Nullable<Transaction[]>> {
        const documents = await this.findAll();

        let result: Transaction[] = [];

        if (documents) {

            await documents.forEach(document => {
                result.push(Transaction.fromPrimitives({...document, id: document._id}));
            });
        }
        return result.length >
        0 ? result : null;
    }

    public async searchAllTransactionsFromUser(id: UserId): Promise<Nullable<Transaction[]>> {
        const documents = await this.findByParams({userId:id.value});

        let result: Transaction[] = [];

        if (documents) {

            await documents.forEach(document => {
                result.push(Transaction.fromPrimitives({...document, id: document._id}));
            });
        }
        return result.length >
        0 ? result : null;
    }

    public async searchAllTransactionsFromAccount(id: AccountId): Promise<Nullable<Transaction[]>> {
        const documents = await this.findByParams({accountId:id.value});

        let result: Transaction[] = [];

        if (documents) {

            await documents.forEach(document => {
                result.push(Transaction.fromPrimitives({...document, id: document._id}));
            });
        }
        return result.length >
        0 ? result : null;
    }

    public async searchSubTransaction(id: TransactionId): Promise<Nullable<Transaction[]>> {
        const documents = await this.findByParams({transactionParentId:id.value});

        let result: Transaction[] = [];

        if (documents) {

            await documents.forEach(async document => {
                result.push(Transaction.fromPrimitives({...document, id: document._id}));
                const newSubTransactions:Nullable<Transaction[]> = await this.searchSubTransaction(document._id);
                if (newSubTransactions) result.concat(newSubTransactions) ;
            });
        }
        return result.length >
        0 ? result : null;
    }

    public update(id: TransactionId, transaction: Transaction): Promise<void> {
        return this.modify(id.value, transaction);
    }

    protected classModel(): Model<any> {
        return TransactionModel;
    }


}
