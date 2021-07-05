const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController.js"); 

//  GET ROUTES
router
    .get("/", userController.login) // gets login page
    .get("/logout", userController.logout); // logs out the user


// POST ROUTES

router
    .post("/login", userController.authenticateLogin) // validates the login credentials
    .post("/login/:email", userController.checkUserExists) // handles the request for duplicate emails via login id
    .post("/register", userController.registerUser) // registers the user
    .post("/register/:email", userController.checkUserExists); // handles the request for duplicate emails via signup id

module.exports = router;