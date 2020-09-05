import { model, Schema } from 'mongoose';
import uniqueValidator from 'mongoose-unique-validator';

const tokenSchema = new Schema({
  userId: {type: String, required: true, unique: true},
  value: {type: String, required: true, unique: true},
});

tokenSchema.plugin(uniqueValidator);
export default model('token', tokenSchema);