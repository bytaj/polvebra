import { Document, Model } from 'mongoose';
import { AggregateRoot } from '../../../domain/AggregateRoot';
import { Nullable } from '../../../domain/Nullable';

export abstract class MongoRepository<T extends AggregateRoot> {

    public async publish(id: string, aggregateRoot: T): Promise<any> {
        let doc: Document = this.objectToDocument(id, aggregateRoot);
        return doc.save();
    }

    public findByID(id: string): Promise<Nullable<any>> {
        return this.classModel().findById(id).exec().then(doc => {
            return doc.toObject({getters: true});
        });
    }

    public findAll(): Promise<Nullable<any[]>> {
        return this.classModel().find({}).exec().then(documents => {
            return documents.map(doc => doc.toObject({getters: true}));
        });
    }

    public findByParams(params:any):Promise<Nullable<any[]>>{
        return this.classModel().find(params).exec();
    }

    public remove(model: Model<any>, id: any) {
        return model.deleteOne({'_id': id});
    }

    protected objectToDocument(id: string, aggregateRoot: T): Document{
        let model:Model<any> = this.classModel();
        return new model({_id: id, ...aggregateRoot.toPrimitives()});
    }
    protected abstract classModel(): Model<any>;
}