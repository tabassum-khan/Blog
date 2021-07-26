const bcrypt = require("bcrypt");
const saltRounds = 12;

//import userModel
const User = require("../models/userModel.js");

//import user data
const UserDetails = require("./user.js");

let isUserAuthenticated = false;

//LOGIN function
function login(req, res){
    res.render("login");
}
    
//Logout function
function logout (req, res){
    isUserAuthenticated = false;
    res.redirect("/");
}

//Function to check if user already exists or not
let checkUserExists = function(req, res){
    const email = req.params.email.toLowerCase();
    
    User.find({email: email}, function(err, result){
        if(!err){
            if(result.length === 0)
               res.send(false);
            else
                res.send(true);
        }
        else
           console.log(err); //not handling errors
    });
}

//Verifying user and then redirecting it to "/home" route
function authenticateLogin(req, res){

    const email = req.body.email.toLowerCase();
    const pass = req.body.pass;

    User.find({email: email}, function(err, foundUser){
        if(!err){
            // console.log(result);
            if(foundUser.length === 0){
                res.send({user: false, pass: false});
            }
            else{
                bcrypt.compare(pass, foundUser[0].password, function(error, result) {
                    if(result){
                        isUserAuthenticated = true;
                        UserDetails.user = foundUser[0].username;
                        res.send({user: true, pass: true});
                    }
                    else{
                        res.send({user:true, pass: false});
                    }
                });
            }

        } else{
           console.log(err);//not handling errors
        }
    });
}

//REGISTER THE USER USING SIGNUP FORM DATA
function registerUser(req, res){
    const username = req.body.username;
    const email = req.body.email.toLowerCase();
    const pass = req.body.pass;
    const confirmPass= req.body.confirmPass;

    bcrypt.hash(pass, saltRounds, function(err, hash) {
        const user = new User({
            username: username,
            email: email,
            password: hash
        });
    
        if(pass === confirmPass){
            user.save()
            .then( (result) => {
                console.log(result + 'added to the database');
                res.send(`Congratulations ${username}, you have been successfully registered with the email: ${email}`);
            })
            .catch( (err) =>{
                const errors = handleErrors(err);
                res.json({ errors });
                // console.log(errors);
                // res.send(`Unable to create the user`);
            });
        }
    });
}


//Handle signup errors
function handleErrors(err){
    const errors = {
        username: "",
        email: "", 
        password: ""
    };

    if(err.name === "ValidationError"){
        Object.values(err.errors).forEach( ({properties}) => {
            errors[ properties.path ] = properties.message;
        });
    }
    return errors;
}


function getUserAuthentication(){
    if(isUserAuthenticated)
        return true;
    else   
        return false;
}


module.exports = {
    login,
    logout,
    checkUserExists,
    authenticateLogin,
    registerUser,
    getUserAuthentication
};