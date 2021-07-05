const md5 = require("md5");

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
            res.send(err);
    });
}

//Verifying user and then redirecting it to "/home" route
function authenticateLogin(req, res){

    const email = req.body.email.toLowerCase();
    const pass = md5(req.body.pass);

    User.find({email: email}, function(err, result){
        if(!err){
            // console.log(result);
            if(result.length === 0){
                res.send({user: false, pass: false});
            }
            else{
                if(result[0].password === pass){
                    isUserAuthenticated = true;
                    UserDetails.user = result[0].username;
                    res.send({user: true, pass: true});
                }
                else{
                    res.send({user:true, pass: false});
                }
            }

        } else{
           console.log(err);
        }
    });
}

//REGISTER THE USER USING SIGNUP FORM DATA
function registerUser(req, res){
    const username = req.body.username;
    const email = req.body.email.toLowerCase();
    const pass = req.body.pass;
    const confirmPass= req.body.confirmPass;

   const user = new User({
        username: username,
        email: email,
        password: md5(pass)
   });

   if(pass === confirmPass){
        user.save()
        .then( (result) => {
            console.log(result + 'added to the database');
            res.send(`Congratulations ${username}, you have been successfully registered with the email: ${email}`);
        })
        .catch( (err) =>{
            console.log(err);
        });
   }
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