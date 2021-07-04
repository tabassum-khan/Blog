const express = require("express");
const router = express.Router();
const md5 = require("md5");

//import userModel
const User = require("../models/userModel.js");
const UserDetails = require("./user.js");

let isUserAuthenticated = false;

//LOGIN ROUTE
    router.get("/", function(req, res){
        isUserAuthenticated = false;
        res.render("login");
    });

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
    router.post("/login", function(req, res){

        const email = req.body.email.toLowerCase();
        const pass = md5(req.body.pass);

        User.find({email: email}, function(err, result){
            if(!err){
                console.log(result);
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
    })

//Handle the request for duplicate email id
    .post("/login/:email", checkUserExists);

//REGISTER THE USER USING SIGNUP FORM DATA
    router
    .post("/register", function(req, res){
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
                res.send(`Congratulations, you have been successfully registered with the email: ${email}`);
            })
            .catch( (err) =>{
                console.log(err);
            });
       }
    })
//Handle the request for duplicate email id
    .post("/register/:email", checkUserExists);

function getUserAuthentication(){
    if(isUserAuthenticated)
        return true;
    else   
        return false;
}

module.exports = {
    router,
    getUserAuthentication
};