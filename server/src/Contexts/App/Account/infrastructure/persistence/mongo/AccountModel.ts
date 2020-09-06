import { model, Schema } from 'mongoose';
import uniqueValidator from 'mongoose-unique-validator';

const accountSchema = new Schema({
                                  _id: {type: String},
                                  userId: {type: String, required: true},
                                  name: {type: String, required: true},
                                  balance: {type: Number, required: true},
                                  netBalance:{type: Number, required: true}
                              }, {
                                  _id: false,
                                  timestamps: true,
                              });

accountSchema.plugin(uniqueValidator);
export default model('Account', accountSchema);