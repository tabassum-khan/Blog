const express = require("express");
const router = express.Router();
const blogController = require("../controllers/blogController.js");


//  Check if user is authenticated before going to any of the routes
router
    .all("*", blogController.checkUserAuthentication);


//  GET ROUTES
router
    .get("/home", blogController.getHome) // gets home page
    .get("/compose", blogController.getCompose) // gets Compose Page
    .get("/posts/:postId", blogController.fetchPost) // Gets a post based on their requested id
    .get("/edit/:postId", blogController.editPost) //  Edits post
    .get("/delete/:postId", blogController.deletePost) //   Deletes Post


//  POST ROUTES
router
    .post("/compose", blogController.composePost); // Creates post if present in the database, else updates the edited post


module.exports = router;
