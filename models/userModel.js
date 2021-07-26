const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
// const passRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d!@#$%^&*_-]{8,16}$/;

function validateEmail (val){
    return emailRegex.test(String(val));
}

// function validatePass(val){
//     console.log( val );
//     return passRegex.test(String(val));
// }

const userSchema = new Schema({
    username : {
        type: String, 
        required: [true, "Please enter a Username"],
        maxLength: [20, "Username cannot contain more than 20 characters"],
        trim: true
    }, 

    email : {
        type: String, 
        required: [true, "Please enter an Email ID"],
        trim: true,
        lowercase: true,
        unique: true, 
        validate: [validateEmail, "Email ID must be of pattern abc@xyz.com"]
    }, 

    password:{
        type: String, 
        required: [true, "Please enter a password"],
        trim: true,
        // validate: [validatePass, "Password should be a combination of atleast one uppercase letter, one lowercase letter, one special character (!,@,#,$,%,^,&,*,(,),_,-,+,=) and a number"]
        // minlength: [8, "Password is less than 8 characters"], 
        // maxlength: [16, "Password is greater than 16 characters"]
    }

    // add blog array of blogSchema
});

const User = mongoose.model("user", userSchema);

module.exports = User;