import {Schema, model} from 'mongoose';

const PeriodicTransactionSchema = new Schema({
    name: {type: String, required: true},
    tag: {type: Schema.Types.ObjectId, ref:'Tag', required:true},
    amount : {type: Number, required:true},
    date : {type: Date, required:true},
    account: {type: Schema.Types.ObjectId, ref:'Account', require:true},
    endDate: {type: Date},
    interval : {type: Number, require:true},
    transactionType : {type:String, require:true},
    lastDate: {type:Date},
},{
    timestamps:true,
});

export default model('PeriodicTransaction', PeriodicTransactionSchema);