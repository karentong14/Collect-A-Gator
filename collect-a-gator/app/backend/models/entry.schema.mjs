import mongoose from "mongoose";

const entrySchema = new mongoose.Schema({
    id: {
        type: Number,
        required: [true, "Entry should have an ID"],
    },
    date: { 
        type: String,
        required: false,
    },
    title: {
        type: String,
        required: [true, "Entry should have a title"],
    },
    content: {
        type: String, 
        required: [true, "Entry should have content"],
    }
    
});


export const Entry = mongoose.model('Entry', entrySchema);
