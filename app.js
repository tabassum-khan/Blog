//jshint esversion:6

const express = require("express");
const mongoose = require('mongoose');

//import files
const blogController = require("./controllers/blogController.js");
// const userController = require("./controllers/userController.js");

//instantiate the app
const app = express();

app
.set('view engine', 'ejs') //set the path to ejs files
.use(express.static("public")) //static files - css and js and bodyparser for parsing req.body
.use(express.urlencoded({ extended: false })) // to parse the req.body
// .use(userController); // User Controller --> demonstrating through express.router()

//call the controller - controls the get post request
blogController(app);


//connect to the database and then connect to the server
// dbURI = "mongodb+srv://tabassum-khan:Tab_A135$$@cluster0.w1zon.mongodb.net/testDB?retryWrites=true&w=majority";

dbURI = "mongodb+srv://tabassum-khan:Tab_A135$$@blogcluster.ayqek.mongodb.net/testDB?retryWrites=true&w=majority";

mongoose.connect(dbURI, { useNewUrlParser: true , useUnifiedTopology: true})
.then(() => app.listen(3000, function() {
    console.log("Server started on port 3000");
  })
).catch((err) => console.log(err));


