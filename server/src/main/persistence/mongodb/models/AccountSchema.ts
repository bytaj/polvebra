import {Schema, model} from 'mongoose';
import AbstractTransaction from '../../../core/model/AbstractTransaction';

const AcountSchema = new Schema({
    name: {type: String, required: true},
    transactions : {type:[AbstractTransaction]},
});

export default model('Account', AcountSchema);