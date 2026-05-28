const mongoose = require("mongoose");
const validator = require('validator');

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        trim: true,
        maxLength: 50,
        minLength: 2

    },

    lastName: {
        type: String,
        required: true,
        trim: true,
        maxLength: 50,
        minLength: 2
    },

    emailId: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,

        validate(value){
            if(!validator.isEmail(value)){
                throw new Error("Invalid email address");
            }
        }
    },

    password: {
        type: String,
        required: true,
        minLength: 8
    }
},
{
    timestamps: true
});

module.exports = mongoose.model("User", userSchema);