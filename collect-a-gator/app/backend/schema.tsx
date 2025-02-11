const mongoose = require('mongoose');

/** export interface JournalEntry {
  id: number;
  title: string;
  content: string;
  date: string;
}*/
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
