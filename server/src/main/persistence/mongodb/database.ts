import mongoose from 'mongoose';
import {mongodb} from './keys'

mongoose.connect(mongodb.URI, {
    useUnifiedTopology: true,
    useNewUrlParser: true
}).then(db => console.log('MongoDB is conected'))
   .catch(err => console.log(err)); 