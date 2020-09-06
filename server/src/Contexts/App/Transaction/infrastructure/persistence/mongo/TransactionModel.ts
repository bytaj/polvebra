import { model, Schema } from 'mongoose';
import uniqueValidator from 'mongoose-unique-validator';

const transactionSchema = new Schema({
                                         _id: {type: String},
                                         userId: {type: String, required: true},
                                         accountId: {type: String, required: true},
                                         tagId: {type: String, required: true},
                                         transactionParentId: {type: String},
                                         name: {type: String, required: true},
                                         amount: {type: Number, required: true},
                                         paid: {type: Boolean, required: true},
                                         subTransactionTotal: {type: Number, required: true},
                                         date: {type: String, required: true}
                                     }, {
                                         _id: false,
                                         timestamps: true,
                                     });

transactionSchema.plugin(uniqueValidator);
export default model('Transaction', transactionSchema);