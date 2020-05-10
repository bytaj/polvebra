import {Schema, model} from 'mongoose';
import Tag from '../../../core/model/Tag';
import Account from '../../../core/model/Account';
import PeriodicTransaction from '../../../core/model/PeriodicTransaction';

const UserSchema = new Schema({
    name: {type: String, required: true},
    email: {type: String, required: true, unique:true},
    password: {type: String, required: true},
    tags: {type: [Tag], required:true},
    accounts: {type: [Account], required:true},
    periodicTransactions: {type: [PeriodicTransaction], required:true}
});

export default model('User', UserSchema);