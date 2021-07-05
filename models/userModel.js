const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const passRegex = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*_-]{8,16}$/;

const userSchema = new Schema({
    username : {
        type: String, 
        required: [true, "Username is required"],
        max: 20,
        trim: true
    }, 

    email : {
        type: String, 
        required: [true, "Email ID is required"],
        trim: true,
        lowercase: true,
        unique: true
    }, 

    password:{
        type: String, 
        required: [true, "Password is required"],
        trim: true,
        // minlength: [8, "Password is less than 8 characters"], 
        // maxlength: [16, "Password is greater than 16 characters"]
    }

    // add blog array of blogSchema
});

const User = mongoose.model("user", userSchema);

module.exports = User;