const Blog = require("../models/blogModel.js");
const User = require("./user.js");

//import usercontroller.js
const userController = require("./userController");

const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const days = ["Sun", "Mon", "Tue", "Wed", "Thurs", "Fri", "Sat"];

module.exports = function(app){

    app.all("*", function(req, res, next){
        if( userController.getUserAuthentication() )
            next();
        else
            res.redirect("/");  
    });

    /***********    All GET ROUTES  *****************/
    
    //HOME ROUTE
    app.get("/home", function(req, res){
        Blog.find().sort({createdAt: -1})
        .then( (result) => {
            res.render("home", {
                user:User.user,
                startingContent: User.userInfo,
                posts: result
            });
        })  
        .catch( (err) => console.log(err) );
    });

    //COMPOSE ROUTE
    app.get("/compose", function(req, res){
        res.render("compose", {
            id: "",
            title: "",
            content: ""
        });
    });

    //Fetch the required post based on :_id from the databse
    app.get("/posts/:postId", function(req, res){
        const requestedPostId = req.params.postId;

        Blog.find({_id: requestedPostId}, function(err, post){
            if(!err){
                res.render("post", {post: post[0]});
            }else{
                console.log(err);
            }
        });
    });

    //Edit the items in the database based on their ids
    app.get("/edit/:postId", function(req, res){
        const requestedPostId = req.params.postId;

        Blog.find({_id: requestedPostId}, function(err, post){
            if(!err){
                res.render("compose", {
                    id: post[0]._id,
                    title: post[0].title,
                    content: post[0].content
                });
            }else{
                console.log(err);
            }
        });
    });

    //Delete from the database
    app.get("/delete/:postId", function(req, res){
        const requestedPostId = req.params.postId;

        Blog.findByIdAndDelete(requestedPostId, function(err, post){
            if(!err){
                console.log(post);
                console.log("The post has been successfully deleted! ");
                res.json({post: post});
            }   
            else{
                console.log(err);
            }
        });
    });

    /***********    All POST ROUTES  *****************/

    //CREATE POSTS IN DATABSE
    app.post("/compose", function(req, res){

        //get todays date
        const today = new Date();
        const dd = today.getDate().toString();
        const yyyy = today.getFullYear().toString();
        const sup = `<span class="sup">th</span> `;

        //convert date into string and format pattern
        const restOfTheDate = months[today.getMonth()] + " " + yyyy + ", " + days[today.getDay()];

        //if the data(id) already exists in the db, then update it else create it
        const id = req.body.postId;
        
        if (id === "")
            createPost(req, dd, restOfTheDate);
        else
            updatePost(req, id, dd, restOfTheDate);

        res.redirect("/home");

    });

}


function createPost(req, dd, restOfTheDate){
    const newBlog = new Blog({
        title: req.body.postTitle,
        content: req.body.postBody,
        date: dd,
        remainingDate: restOfTheDate
    });

    //save the new blog into the database
    newBlog.save()
    .then((result) => {
        console.log(result + "has been saved to the database")
    }).catch((err) => {
        console.log(err)
    });
}

function updatePost(req, id, dd, restOfTheDate){
    const update = {
        $set: {
            title: req.body.postTitle,
            content: req.body.postBody,
            date: dd,
            remainingDate: restOfTheDate
        }
    }

    Blog.findByIdAndUpdate(id, update, function(err, post){
        if(!err){
            if (!post)
                console.log("Post does not exist! Please create it../");
            else
                console.log("Data updated successfully!");
        }else{
            console.log(err);
        }
    });
}


// IF WE WANT TO DELETE WITH ANOTHER PAGE - delete.ejs

        // //find if the post exists in the database
        // Blog.findById(requestedPostId, function(err, post){
        //     if(!err){
                
                // if (!post){ //if there is no post, then send the error
                //     res.render("delete", {
                //         title: "The blog does not exist",
                //         heading: "",
                //         links: [
                //             {
                //                 name: "GO HOME",
                //                 url: "/"
                //             }
                //         ]
                //     });
                // }
                // else{//if the pose exists, ask for surety
                //     res.render("delete", {
                //         title: post.title,
                //         date: post.date,
                //         remainingDate: post.remainingDate,
                //         heading: "The story is going to be deleted permanently. Are you sure?",
                //         links: [
                //             {
                //                 name: "YES",
                //                 url: "/deleteForSure/" + post._id
                //             },
                //             {
                //                 name: "NO",
                //                 url: "/"
                //             }
                //         ]
                //     });
                // }
        //     }else{  
        //         console.log(err);
        //     }
        // });