import {Schema, model} from 'mongoose';
import Tag  from '../../../core/model/Tag';

const TagSchema = new Schema({
    name: {type: String, required: true},
    description: {type: String},
    parentTag: {type: Tag, default:null},
});

export default model('Tag', TagSchema);