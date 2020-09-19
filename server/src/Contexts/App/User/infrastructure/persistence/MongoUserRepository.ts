import mongoose from 'mongoose';
import { Model } from 'mongoose';
import { DuplicateKeyException } from '../../../../Shared/domain/exceptions/DuplicateKeyException';
import { UndefinedException } from '../../../../Shared/domain/exceptions/UndefinedException';
import { Nullable } from '../../../../Shared/domain/Nullable';
import { MongoRepository } from '../../../../Shared/infrastructure/persistence/mongo/MongoRepository';
import { UserId } from '../../../Shared/domain/User/UserId';
import { Password } from '../../domain/Password';
import User from '../../domain/User';
import UserRepository from '../../domain/UserRepository';
import UserModel from './mongo/UserModel';

export class MongoUserRepository extends MongoRepository<User> implements UserRepository {

    public async save(user: User): Promise<void> {
        return this.publish(user.id.value, user)
                   .catch((err) => {
                       if (err instanceof
                           mongoose.Error) {
                           throw new DuplicateKeyException(err.message);
                       } else {
                           throw new UndefinedException(err.message);
                       }
                   });
    }

    public async search(id: UserId): Promise<Nullable<User>> {
        let document = await this.findByID(id.value);
        return document ? User.fromPrimitives({...document, id: id.value}) : null;
    }

    public async searchAll(): Promise<Nullable<User[]>> {
        const documents = await this.findAll();

        let result: User[] = [];

        if (documents) {

            await documents.forEach(document => {
                result.push(User.fromPrimitives({...document, id: document._id}));
            });
        }
        return result.length >
        0 ? result : null;
    }

    public async loginUser(username: string, password: string): Promise<Nullable<UserId>> {
        return this.classModel().find({username: username}).select('password').exec()
                   .then((elements: any[]) => {
                       if (!elements) return null;
                       const element = elements[0].toObject({getters: true});
                       if(!Password.comparePassword(password, element.password)) return null;
                       return new UserId(element._id);
                   });
    }

    protected classModel(): Model<any> {
        return UserModel;
    }

    public async update(id: UserId, user: User): Promise<void> {
        return this.modify(id.value, user);
    }

}
