import {Schema, model} from 'mongoose';

const AcountSchema = new Schema({
    user: {type: Schema.Types.ObjectId, ref: 'User', required:true},
    name: {type: String, required: true},
},{
    timestamps:true,
});

export default model('Account', AcountSchema);