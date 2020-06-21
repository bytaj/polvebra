import {Schema, model} from 'mongoose';

const TagSchema = new Schema({
    name: {type: String, required: true},
    description: {type: String},
    parentTag: {type: Schema.Types.ObjectId, default:null},
},{
    timestamps:true,
});

export default model('Tag', TagSchema);