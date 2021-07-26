$(document).ready(function() {

    let isTitle = true;
    let isPost = true;

    // Check if post title is there on blur
    $("#postTitle").blur(function(e){
        isTitle = checkTitle(e.target);
    });

    // Check if post is there on blur
    $("#postBody").blur(function(e){
        isPost = checkContent(e.target);
    });


    //On submitting the post, check if all the required inputs are there
    $("#blogForm").submit(function(e){
        e.preventDefault();
        isTitle = checkTitle($("#postTitle"));
        isPost = checkContent($("#postBody"));        
        
        if(isTitle && isPost){
            console.log("Post is being saved to the database");

            $.ajax({
                type: "POST", 
                data: {
                    id: $("#postID").val().trim(),
                    postTitle: $("#postTitle").val().trim(),
                    postBody: $("#postBody").val().trim() 
                },
                url: "/compose",

                success: function(result){
                    if(result.errors === "")
                        location.href= "/home";
                    else{
                        if(result.errors.title !== "")
                            isTitle = setError($("#postTitle").parent(), result.errors.title);
                        if(result.errors.content !== "")
                            isPost = setError($("#postBody").parent(), result.errors.content)
                    }
                },

                error: function(err){
                    console.log(error);
                }
            });
        }

    });
});

function checkTitle (target){
    if($(target).val().trim() === "" ){
        return setError($(target).parent(), "Please enter a title for the post");
    }
    else
        return removeError($(target).parent());
}

function checkContent (target){
    if($(target).val().trim() === "" ){
        return setError($(target).parent(), "Please enter the content for the post");
    }
    else    
        return removeError($(target).parent());

}

function setError(parent, message){
    parent.addClass("error");
    parent.find(".error-message").text(message); 
    return false;
}

function removeError(parent){
    if(parent.hasClass("error"))
        parent.removeClass("error");
    return true;
}
