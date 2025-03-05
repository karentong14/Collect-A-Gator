import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    token: {
        type: String,
        required: [true, "Each user must have a token"],
        unique: [true, "Users must have a unique token"]
    },
    firstName: {
        type: String,
        required: [true, "Each user must have a first name"],
    },
    lastName: {
        type: String, 
        required: [true, "Each user must have a last name"],
    },
    email: {
        type: String, 
        required: [true, "Each user must have an email"],
        unique: [true, "Users must have a unique email"]
    }
});

export const User = mongoose.model('User', userSchema);
