const express = require("express");
const router = express.Router();
const md5 = require("md5");

//import userModel
const User = require("../models/userModel.js");

//LOGIN ROUTE
    router.get("/", function(req, res){
        res.render("login");
    });

//Login
    router.post("/login", function(req, res){

        const username = req.body.login_username;
        const pass = md5(req.body.login_pass);

        User.find({username: username}, function(err, result){
           if(!err){
                console.log(result);
                if(result.length === 0){
                    res.send("User doesnt exist");
                }
                else{
                    if(result[0].password === pass){
                        console.log("Password matched");
                        res.redirect("/home");
                    }
                    else{
                        res.send("Password doesnt match")
                    }
                }

           } else{
               console.log(err);
           }
        });
    });

//REGISTER THE USER USING SIGNUP FORM DATA
    router.post("/register", function(req, res){
        const username = req.body.username;
        const pass = req.body.pass;
        const confirmPass= req.body.confirmPass;

       const user = new User({
            username: username,
            password: md5(pass)
       });

       if(pass === confirmPass){
            user.save()
            .then( (result) => {
                console.log(result + 'added to the database');
                res.send(`Congratulations, you have been successfully registered with the username: ${username}`);
            })
            .catch( (err) =>{
                console.log(err);
            });
       }
    });


//Function to check if user already exists or not
let checkUserExists = function(req, res){
    const username = req.params.username;
    
    User.find({username: username}, function(err, result){
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

//Handle the request for duplicate email id
router.post("/register/:username", checkUserExists);

module.exports = router;