import { model, Schema } from 'mongoose';
import uniqueValidator from 'mongoose-unique-validator';

const periodicTransactionSchema = new Schema({
                                         _id: {type: String},
                                         userId: {type: String, required: true},
                                         accountId: {type: String, required: true},
                                         tagId: {type: String, required: true},
                                         transactionParentId: {type: String},
                                         name: {type: String, required: true},
                                         amount: {type: Number, required: true},
                                         interval: {type: Number, required: true},
                                         beginDate: {type: String, required: true},
                                         endDate: {type: String},
                                         lastDate: {type: String, required: true}
                                     }, {
                                         _id: false,
                                         timestamps: true,
                                     });

periodicTransactionSchema.plugin(uniqueValidator);
export default model('PeriodicTransaction', periodicTransactionSchema);