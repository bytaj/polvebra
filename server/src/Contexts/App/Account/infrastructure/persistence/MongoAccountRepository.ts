import mongoose from 'mongoose';
import { Model } from 'mongoose';
import { DuplicateKeyException } from '../../../../Shared/domain/exceptions/DuplicateKeyException';
import { UndefinedException } from '../../../../Shared/domain/exceptions/UndefinedException';
import { Nullable } from '../../../../Shared/domain/Nullable';
import { MongoRepository } from '../../../../Shared/infrastructure/persistence/mongo/MongoRepository';
import { AccountId } from '../../../Shared/domain/Account/AccountId';
import { UserId } from '../../../Shared/domain/User/UserId';
import Account from '../../domain/Account';
import AccountRepository from '../../domain/AccountRepository';
import AccountModel from './mongo/AccountModel';

export class MongoAccountRepository extends MongoRepository<Account> implements AccountRepository {

    public async save(account: Account): Promise<void> {
        return this.publish(account.id.value, account)
            .catch((err) => {
                if (err instanceof
                    mongoose.Error) {
                    throw new DuplicateKeyException(err.message);
                } else {
                    throw new UndefinedException(err.message);
                }
            });
    }

    public async search(id: AccountId): Promise<Nullable<Account>> {
        let document = await this.findByID(id.toString());
        return document ? Account.fromPrimitives({...document, id: id.value}) : null;
    }

    public async searchAll(): Promise<Nullable<Account[]>> {
        const documents = await this.findAll();

        let result: Account[] = [];

        if (documents) {

            await documents.forEach(document => {
                result.push(Account.fromPrimitives({...document, id: document._id}));
            });
        }
        return result.length >
        0 ? result : null;
    }

    public async searchAllAccountsFromUser(id: UserId): Promise<Nullable<Account[]>> {
        const documents = await this.findByParams({userId:id.value});

        let result: Account[] = [];

        if (documents) {

            await documents.forEach(document => {
                result.push(Account.fromPrimitives({...document, id: document._id}));
            });
        }
        return result.length >
        0 ? result : null;
    }

    protected classModel(): Model<any> {
        return AccountModel;
    }
}
