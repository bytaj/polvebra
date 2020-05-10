import {Schema, model} from 'mongoose';
import Tag  from '../../../core/model/Tag';
import Account from '../../../core/model/Account';

const PeriodicTransactionSchema = new Schema({
    name: {type: String, required: true},
    tag: {type: Tag, required:true},
    amount : {type: Number, required:true},
    date : {type: Date, required:true},
    account: {type: Account, require:true},
    endDate: {type: Date},
    interval : {type: Number, require:true},
    transactionType : {type:String, require:true},
    lastDate: {type:Date},
});

export default model('PeriodicTransaction', PeriodicTransactionSchema);