
import mongoose from "mongoose";

const entrySchema = new mongoose.Schema({
    id: {
        type: Number,
        required: [true, "object should have an ID"],
    },
    date: {
        type: String,
        required: [true, "entry should have a date"],
    },
    title: {
        type: String,
        required: [true, "entry should have a title"],
    },
    content: {
        type: String, 
        required: [true, "emtry should have content"],
    }
    
});


export const Entry = mongoose.model('Entry', entrySchema);
