import { model, Schema } from 'mongoose';
import uniqueValidator from 'mongoose-unique-validator';

const userSchema = new Schema({
                                  _id: {type: String},
                                  username: {type: String, required: true, unique: true},
                                  name: {type: String, required: true},
                                  email: {type: String, required: true, unique: true},
                                  password: {type: String, required: true},
                              }, {
                                  _id: false,
                                  timestamps: true,
                              });

userSchema.plugin(uniqueValidator);
export default model('User', userSchema);