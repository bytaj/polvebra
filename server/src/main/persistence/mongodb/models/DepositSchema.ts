import mongoose, {Schema, model} from 'mongoose';
import Tag  from '../../../core/model/Tag';
import Deposit from '../../../core/model/Deposit';

const DepositSchema = new Schema({
    name: {type: String, required: true},
    tag: {type: Tag, required:true},
    amount : {type: Number, required:true},
    date : {type: Date, required:true},
    subtransaction : {type:[Deposit]},
    paid :{type: Boolean, default:true}
});

export default model('Deposit', DepositSchema);