import mongoose from 'mongoose';
import { Model } from 'mongoose';
import { DuplicateKeyException } from '../../../../Shared/domain/exceptions/DuplicateKeyException';
import { UndefinedException } from '../../../../Shared/domain/exceptions/UndefinedException';
import { Nullable } from '../../../../Shared/domain/Nullable';
import { MongoRepository } from '../../../../Shared/infrastructure/persistence/mongo/MongoRepository';
import { TagId } from '../../../Shared/domain/Tag/TagId';
import { UserId } from '../../../Shared/domain/User/UserId';
import Tag from '../../domain/Tag';
import TagRepository from '../../domain/TagRepository';
import TagModel from './mongo/TagModel';

export class MongoTagRepository extends MongoRepository<Tag> implements TagRepository {

    public async save(tag: Tag): Promise<void> {
        return this.publish(tag.id.value, tag)
            .catch((err) => {
                if (err instanceof
                    mongoose.Error) {
                    throw new DuplicateKeyException(err.message);
                } else {
                    throw new UndefinedException(err.message);
                }
            });
    }

    public async search(id: TagId): Promise<Nullable<Tag>> {
        let document = await this.findByID(id.toString());
        return document ? Tag.fromPrimitives({...document, id: id.value}) : null;
    }

    public async searchAll(): Promise<Nullable<Tag[]>> {
        const documents = await this.findAll();

        let result: Tag[] = [];

        if (documents) {

            await documents.forEach(document => {
                result.push(Tag.fromPrimitives({...document, id: document._id}));
            });
        }
        return result.length >
        0 ? result : null;
    }

    public async searchAllTagsFromUser(id: UserId): Promise<Nullable<Tag[]>> {
        const documents = await this.findByParams({userId:id.value});

        let result: Tag[] = [];

        if (documents) {

            await documents.forEach(document => {
                result.push(Tag.fromPrimitives({...document, id: document._id}));
            });
        }
        return result.length >
        0 ? result : null;
    }

    public async searchTagsSon(id: TagId): Promise<Nullable<Tag[]>> {
        const documents = await this.findByParams({parentTagId:id.value});

        let result: Tag[] = [];

        if (documents) {

            await documents.forEach(async document => {
                result.push(Tag.fromPrimitives({...document, id: document._id}));
                const newSons:Nullable<Tag[]> = await this.searchTagsSon(document._id);
                if (newSons) result.concat(newSons) ;
            });
        }
        return result.length >
        0 ? result : null;
    }

    public update(id: TagId, aggregateRoot: Tag): Promise<void> {
        return this.modify(id.value, aggregateRoot);
    }

    protected classModel(): Model<any> {
        return TagModel;
    }
}
