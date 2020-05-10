import mongoose, {Schema, model} from 'mongoose';
import Tag  from '../../../core/model/Tag';
import Outlay from '../../../core/model/Outlay';

const OutlaySchema = new Schema({
    name: {type: String, required: true},
    tag: {type: Tag, required:true},
    amount : {type: Number, required:true},
    date : {type: Date, required:true},
    subtransaction : {type:[Outlay]},
    paid :{type: Boolean, default:true}
});

export default model('Outlay', OutlaySchema);