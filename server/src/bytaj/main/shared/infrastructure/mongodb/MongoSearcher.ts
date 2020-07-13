import {Model, Document, Query} from 'mongoose';

export function publish (elementToPublish:Document):Promise<any>{
    return elementToPublish.save();
}


export function consultByID (model:Model<any>, data:any):Promise<any>{
    return model.findById(data).exec();
}

export function consult (model:Model<any>, query:Query<any>):Promise<any[]>{
    return query.exec();
}

export async function modify (model:Model<any>, data:any, checkConditions: (objPassed:any, objFromDB:any) => any):Promise<any>{
    return await model.findById(data.getId()).then((result) => {
        checkConditions(data, result);
        if (result){
            result.overwrite(data);
            return result.save();
        }
    });
    //TODO Comprobar
}

export function remove (model:Model<any>, id:any){
    return model.deleteOne({"_id": id}, function (err) {
        //if (err) return handleError(err);
    });
}