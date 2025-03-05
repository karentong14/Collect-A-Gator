import mongoose from "mongoose";

const entrySchema = new mongoose.Schema({
    token: {
        type: String,
        required: [true, "Entry must be assigned to a specific user"],
    },
    id: {
        type: String,
        required: [true, "Entry must have an ID"],
    },
    date: { 
        type: String,
        required: [true, "Entry must have a date"],
    },
    location: {
        type: String, 
        required: [true, "Entry must have a location"],  
    },
    title: {
        type: String,
        required: [true, "Entry must have a title"],
    },
    content: {
        type: String, 
        required: [true, "Entry should have content"],
    }
    
});


export const Entry = mongoose.model('Entry', entrySchema);
