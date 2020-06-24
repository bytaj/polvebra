import mongoose, {Schema, Model} from 'mongoose';

export function publish (modelCreated:Model<any>, data:any):Promise<any>{
    var elementToPublish = new modelCreated(data);
    return elementToPublish.save();
}


export function consultByID (model:Model<any>, data:any):Promise<any>{
    return model.findById(data).exec();
}

export function consult (model:Model<any>, data:any):Promise<any[]>{
    return model.find(data).exec();
}

export async function modify (model:Model<any>, data:any):Promise<any>{
    return await model.findById(data.getId()).then((result) => {
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