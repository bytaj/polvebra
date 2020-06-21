import {Schema, model} from 'mongoose';

const AcountSchema = new Schema({
    name: {type: String, required: true},
    transactions : {type:[Schema.Types.ObjectId]},
},{
    timestamps:true,
});

export default model('Account', AcountSchema);