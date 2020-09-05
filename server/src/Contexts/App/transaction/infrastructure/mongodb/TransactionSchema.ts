import mongoose, {Schema, model} from 'mongoose';

const OutlaySchema = new Schema({
    account: {type: Schema.Types.ObjectId, ref: 'Account', required:true},
    name: {type: String, required: true},
    tag: {type: Schema.Types.ObjectId, ref: 'Tag', required:true},
    amount : {type: Number, required:true},
    date : {type: Date, required:true},
    parenTransaction : {type:Schema.Types.ObjectId,  ref:'Transaction'},
    paid :{type: Boolean, default:true}
},{
    timestamps:true,
});

export default model('Transaction', OutlaySchema);