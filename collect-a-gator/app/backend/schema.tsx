
import mongoose from "mongoose";
const entrySchema = new mongoose.Schema({
    id: {
        type: Number,
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    content: {
        type: String, 
        required: false,
    },
    date: {
        type: String,
        required: true,
    }
});

module.exports = mongoose.model('Entry', entrySchema);
