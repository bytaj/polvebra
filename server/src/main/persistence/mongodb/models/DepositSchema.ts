import mongoose, {Schema, model} from 'mongoose';

const DepositSchema = new Schema({
    name: {type: String, required: true},
    tag: {type: Schema.Types.ObjectId, required:true},
    amount : {type: Number, required:true},
    date : {type: Date, required:true},
    subtransaction : {type:[Schema.Types.ObjectId]},
    paid :{type: Boolean, default:true}
},{
    timestamps:true,
});

export default model('Deposit', DepositSchema);