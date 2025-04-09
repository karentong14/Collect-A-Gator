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
    counters: {
        restaurant: {
            type: Number,
            required: [true, "Each user must have a restaurant counter"],
            default: 0
        },
        cafe: {
            type: Number,
            required: [true, "Each user must have a cafe counter"],
            default: 0
        },
        nature: {
            type: Number,
            required: [true, "Each user must have a nature counter"],
            default: 0
        },
        art: {
            type: Number,
            required: [true, "Each user must have an art counter"],
            default: 0
        },
        uf: {
            type: Number,
            required: [true, "Each user must have a uf counter"],
            default: 0
        },
        miscellaneous: {
            type: Number,
            required: [true, "Each user must have a miscellaneous counter"],
            default: 0
        }
    },
    booleans: {
        germaines: {
            type: Boolean,
            required: [true, "Each user must have a germainesBool"],
            default: false
        }, 
        depotPark: {
            type: Boolean,
            required: [true, "Each user must have a depotParkBool"],
            default: false
        },
        karmaCream: {
            type: Boolean,
            required: [true, "Each user must have a karmaCreamBool"],
            default: false
        },
        butterflyGarden: {
            type: Boolean,
            required: [true, "Each user must have a butterflyGardenBool"],
            default: false
        },
        marston: {
            type: Boolean,
            required: [true, "Each user must have a marstonBool"],
            default: false
        }
    }
});

export const User = mongoose.model('User', userSchema);
