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
    },
    restaurantCounter: {
        type: Number,
        required: [true, "Each user must have a restaurant counter"],
        default: 0
    },
    cafeCounter: {
        type: Number,
        required: [true, "Each user must have a cafe counter"],
        default: 0
    },
    natureCounter: {
        type: Number,
        required: [true, "Each user must have a nature counter"],
        default: 0
    },
    artCounter: {
        type: Number,
        required: [true, "Each user must have a art counter"],
        default: 0
    },
    ufCounter: {
        type: Number,
        required: [true, "Each user must have a uf counter"],
        default: 0
    },
    germainesBool: {
        type: Boolean,
        required: [true, "Each user must have a germainesBool"],
        default: false
    }, 
    depotParkBool: {
        type: Boolean,
        required: [true, "Each user must have a depotParkBool"],
        default: false
    },
    karmaCreamBool: {
        type: Boolean,
        required: [true, "Each user must have a karmaCreamBool"],
        default: false
    },
    butterflyGardenBool: {
        type: Boolean,
        required: [true, "Each user must have a butterflyGardenBool"],
        default: false
    },
    marstonBool: {
        type: Boolean,
        required: [true, "Each user must have a marstonBool"],
        default: false
    },
});

export const User = mongoose.model('User', userSchema);
