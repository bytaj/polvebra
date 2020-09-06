import { model, Schema } from 'mongoose';
import uniqueValidator from 'mongoose-unique-validator';

const tagSchema = new Schema({
                                  _id: {type: String},
                                  userId: {type: String, required: true},
                                  parentTagId: {type: String},
                                  name: {type: String, required: true},
                                  description: {type: String, required: true},
                                  balance: {type: Number, required: true},
                                  netBalance:{type: Number, required: true}
                              }, {
                                  _id: false,
                                  timestamps: true,
                              });

tagSchema.plugin(uniqueValidator);
export default model('Tag', tagSchema);