import {Schema, model} from 'mongoose';

const UserSchema = new Schema({
    username: {type: String, required: true, unique: true},
    name: {type: String, required: true},
    email: {type: String, required: true, unique:true},
    password: {type: String, required: true},
    tags: {type: [Schema.Types.ObjectId], ref: 'Tag', required:true},
    accounts: {type: [Schema.Types.ObjectId], ref: 'Account', required:true},
    periodicTransactions: {type: [Schema.Types.ObjectId], ref: 'PeriodicTransaction', required:true}
},{
    timestamps:true,
});

export default model('User', UserSchema);