import {Schema, model} from 'mongoose';

const TagSchema = new Schema({
    user: {type: Schema.Types.ObjectId, ref: 'User', required:true},
    name: {type: String, required: true},
    description: {type: String},
    parentTag: {type: Schema.Types.ObjectId, ref: 'Tag', default:null},
},{
    timestamps:true,
});

export default model('Tag', TagSchema);