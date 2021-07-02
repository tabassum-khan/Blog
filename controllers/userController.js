const express = require("express");
const router = express.Router();

//import userModel
const User = require("../models/userModel.js");

//LOGIN ROUTE
    router.get("/", function(req, res){
        res.render("login");
    });

//Login
    router.post("/login", function(req, res){
        res.redirect("/home");
    });

//REGISTER THE USER USING SIGNUP FORM DATA
    router.post("/register", function(req, res){
        const username = req.body.username;
        const pass = req.body.pass;
        const confirmPass= req.body.confirmPass;

       const user = new User({
            username: username,
            password: pass
       });

       if(pass === confirmPass){
            user.save()
            .then( (result) => {
                console.log(result);
            })
            .catch( (err) =>{
                console.log(err);
            });

            console.log(`${username} added to the database`);
            res.send(`Congratulations, you have been successfully registered with the username: ${username}`);
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