import mongoose from 'mongoose';
import { Model } from 'mongoose';
import { DuplicateKeyException } from '../../../../Shared/domain/exceptions/DuplicateKeyException';
import { UndefinedException } from '../../../../Shared/domain/exceptions/UndefinedException';
import { Nullable } from '../../../../Shared/domain/Nullable';
import { MongoRepository } from '../../../../Shared/infrastructure/persistence/mongo/MongoRepository';
import { AccountId } from '../../../Shared/domain/Account/AccountId';
import { PeriodicTransactionId } from '../../../Shared/domain/Transaction/PeriodicTransactionId';
import { UserId } from '../../../Shared/domain/User/UserId';
import PeriodicTransaction from '../../domain/PeriodicTransaction';
import PeriodicTransactionRepository from '../../domain/PeriodicTransactionRepository';
import PeriodicTransactionModel from './mongo/PeriodicTransactionModel';

export class MongoPeriodicTransactionRepository extends MongoRepository<PeriodicTransaction> implements PeriodicTransactionRepository {

    public async save(periodicPeriodicTransaction: PeriodicTransaction): Promise<void> {
        return this.publish(periodicPeriodicTransaction.id.value, periodicPeriodicTransaction)
            .catch((err) => {
                if (err instanceof
                    mongoose.Error) {
                    throw new DuplicateKeyException(err.message);
                } else {
                    throw new UndefinedException(err.message);
                }
            });
    }

    public async search(id: PeriodicTransactionId): Promise<Nullable<PeriodicTransaction>> {
        let document = await this.findByID(id.toString());
        return document ? PeriodicTransaction.fromPrimitives({...document, id: id.value}) : null;
    }

    public async searchAll(): Promise<Nullable<PeriodicTransaction[]>> {
        const documents = await this.findAll();

        let result: PeriodicTransaction[] = [];

        if (documents) {

            await documents.forEach(document => {
                result.push(PeriodicTransaction.fromPrimitives({...document, id: document._id}));
            });
        }
        return result.length >
        0 ? result : null;
    }

    public async searchAllPeriodicTransactionsFromUser(id: UserId): Promise<Nullable<PeriodicTransaction[]>> {
        const documents = await this.findByParams({userId:id.value});

        let result: PeriodicTransaction[] = [];

        if (documents) {

            await documents.forEach(document => {
                result.push(PeriodicTransaction.fromPrimitives({...document, id: document._id}));
            });
        }
        return result.length >
        0 ? result : null;
    }

    public async searchAllPeriodicTransactionsFromAccount(id: AccountId): Promise<Nullable<PeriodicTransaction[]>> {
        const documents = await this.findByParams({accountId:id.value});

        let result: PeriodicTransaction[] = [];

        if (documents) {

            await documents.forEach(document => {
                result.push(PeriodicTransaction.fromPrimitives({...document, id: document._id}));
            });
        }
        return result.length >
        0 ? result : null;
    }

    public update(id: PeriodicTransactionId, aggregateRoot: PeriodicTransaction): Promise<void> {
        return this.modify(id.value, aggregateRoot);
    }

    protected classModel(): Model<any> {
        return PeriodicTransactionModel;
    }


}
