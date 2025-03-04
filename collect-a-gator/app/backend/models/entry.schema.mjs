import mongoose from "mongoose";

const entrySchema = new mongoose.Schema({
    token: {
        type: String,
        required: [true, "An entry must be assigned to a specific user"],
    },
    id: {
        type: String,
        required: [true, "Entry should have an ID"],
    },
    date: { 
        type: String,
        required: false,
    },
    location: {
        type: String, 
        required: [true, "Entry should have a location"],  
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
