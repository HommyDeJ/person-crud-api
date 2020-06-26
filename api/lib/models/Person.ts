import * as mongoose from 'mongoose';

const Schema = mongoose.Schema;

export const PersonSchema = new Schema({
    name: {
        type: String
    },
    last_name: {
        type: String
    },
    email: {
        type: String            
    },
    cellphone_number: {
        type: Number            
    },
    created_date: {
        type: Date,
        default: Date.now
    }
});