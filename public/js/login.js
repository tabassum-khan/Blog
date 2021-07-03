// hide signup form when website first loads
$(document).ready(function() {

    $('#signup-box').hide();
    $('.success-register').hide();
    $('#login-link').css({
      "color": "#ccc",
      "border": "1px solid #59B4B4"
    });

    validateSignUpForm();

  });

  /***********************************************************************************************************************/
  //show signup and hide login after on clicking signup link
  $('#signup-link').click(function() {
    $('#login-box').hide(500, function() {
      $('#signup-box').show(500); //show signup box
      linkStyleOnClick($('#signup-link')); //CSS on click of signup link
      linkStyleOffClick($('#login-link')) //change the color and border of login link to its original color
      resetForm($("#login-form")); //resetting login Form
      resetEyeToggle($('#toggle-login-pass')); //Resetting login eye toggle
    });
  });

  //show login and hide signup on clicking login link
  $('#login-link').click(function(e) {
    $('#signup-box').hide(500, function() {
      $('#login-box').show(500); //show login box
      linkStyleOnClick($('#login-link')); //CSS on click of login link
      linkStyleOffClick($('#signup-link')) //change the color and border of signup link to its original color
      resetForm($("#signup-form")); //resetting singup Form
      //Resetting signup pass and confirm eye toggle
      resetEyeToggle($('#toggle-signup-pass'));
      resetEyeToggle($('#toggle-confirm-pass'));
    });
  });

  function linkStyleOnClick(link) {
    link.css({
      "color": "#ccc",
      "border": "1px solid #59B4B4"
    });
  }

  function linkStyleOffClick(link) {
    link.css({
      "color": "#59B4B4",
      "border": "none"
    });
  }

  //Resetting Eye Toggle on leaving the particular box
  function resetEyeToggle(eye) {
    if (eye.hasClass('fa-eye-slash')) {
      eye.removeClass('fa-eye-slash');
      eye.addClass('fa-eye');
      var input = $(eye.attr("toggle"));
      input.attr("type", "password");
    }
  }


  function resetForm(target_form){
    target_form.trigger("reset"); //Reset target form
    //discard few classes
    target_form.find(".form-group").removeClass("success");
    target_form.find(".form-group").removeClass("error");
  }

  /***********************************************************************************************************************/
  //changing color hovering on login-link and returning back to its original color if its in signup-box
  $(document).ready(function() {
    $('.login-tab').find('.col').hover(function() {
      $(this).css("color", "#ccc");
    }, function() {
      // out hover function --- change the color if only that box is not visible
      if ($('#login-box').is(':hidden')) {
        $('#login-link').css("color", "#59B4B4");
      }

      if ($('#signup-box').is(':hidden')) {
        $('#signup-link').css("color", "#59B4B4");
      }
    });
  });

  /***********************************************************************************************************************/
  //Toggle eye icon of login pass
  $('#toggle-login-pass').click(function() {
    toggleEye($(this));
  });

  //Toggle eye icon of signup pass
  $('#toggle-signup-pass').click(function() {
    toggleEye($(this));
  });

  //Toggle eye icon of confirm pass
  $('#toggle-confirm-pass').click(function() {
    toggleEye($(this));
  });

  //function TO toggle EYE ICON of passwords
  function toggleEye(eye) {
    eye.toggleClass("fa-eye fa-eye-slash");
    var input = $(eye.attr("toggle"));
    if (eye.hasClass("fa-eye-slash")) {
      input.attr("type", "text");
    } else {
      input.attr("type", "password");
    }
  }


/************************************   Login FORM VALIDATION   **************************************/
// let isLoginEMailValid = false;
// let isLoginPassValid = false;

//When user is pressing the keys, check for input
// $("#login-username").on("keyup blur", function(e){
//   const value = $(e.target).val().trim();

//   if(value === ""){
//     isLoginEMailValid = setError( $(e.target), $(e.target).parent() , "Email ID is required.") ;
//   }
//   else if (e.type==="blur"){
//     //check if user exists in the database
//     $.ajax({
//       type: "POST", 
//       url: "/userExists/" + value,
      
//       success: function(result){
//         if(result === "not_found")
//           isLoginEMailValid = setError( $(e.target), $(e.target).parent() , "User does not exist.") ;
//         else
//           isLoginEMailValid = setSuccess( $(e.target).parent() );
//       },
      
//       error: function(err){
//         console.log(err);
//       }
//     });

//   }
//   else{
//     $(e.target).parent().removeClass("error");
//   }
// });

// $("#login-pass").on("keyup blur", function(e){
//   const value = $(e.target).val().trim();

//   if(value === ""){
//     isLoginPassValid = setError( $(e.target), $(e.target).parent() , "Password is required.") ;
//   }
//   //check if user exists in the database
//   else if(e.type === "blur"){
//     if(isLoginEMailValid){
      
//           $.ajax({
//             type: "POST", 
//             url: "/passwordExists",
//             data: {
//               username: $("#login-username").val().trim(),
//               pass: $("#login-pass").val().trim(),
//             },
      
//             success: function(result){
//               // console.log(result);
//               if(result.message === "nouser")
//                 isLoginEMailValid = setError( $("#login-username"), $("#login-username").parent() ,  "User does not exist.") ;
//               else if(result.message === "nopass")
//                 isLoginPassValid = setError( $(e.target), $(e.target).parent() ,  "Password does not match with the username.") ;
//               else{
//                 isLoginPassValid = setSuccess( $(e.target).parent() );
//               }
//             },
      
//             error: function(error){
//               console.log(error);
//             }
      
//           });
//     }
//   }
//   else{
//     $(e.target).parent().removeClass("error");
//     $(e.target).parent().find(".toggle-password").css("right", "10px");
//   }
  
// });

// $("#login-form").keyup(function(e){
//   console.log("Clicked on form");
// })

// $("#login-form").submit(function(e){
 
//   if (isLoginEMailValid && isLoginPassValid){
//     console.log("Login form Success");
//   }
//   else{
//     e.preventDefault();
//     console.log("Login Form Failed");

//     const form = $(e.target);
//     const username = form.find("#login-username");
//     const pass = form.find("#login-pass");

//     if (username.val().trim() === "")
//       isLoginEmailValid = setError( username, username.parent() , "Email ID is required.") ;
//     if (pass.val().trim() === "")
//       isLoginPassValid = setError( pass, pass.parent() , "Password is required.") ;
//   }
// });


/************************************   Signup Client Side FORM VALIDATION   **************************************/

  let isEmailValid = false;
  let isPassValid = false;
  let isConfirmPassValid = false;

  ////////////////  VALIDATE EMAIL
    $("#signup-username").on("keyup focus", function(e){

      const value = $(e.target).val().trim();
      const regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

      //if email is empty
      if (value === ""){
        isEmailValid = setError( $(e.target), $(e.target).parent() , "Email ID is required.") ;
      }
      //if email doesnt match the given pattern
      else if( !regex.test(String(value).toLowerCase()) ){
        isEmailValid = setError ( $(e.target), $(e.target).parent() , "Email ID must be of pattern abc@xyz.com");
      }
      
      //If email is valid, then check if the user already exists in the database
      else{ 
        //To check how many events are attached to the #signup-username 
        // var events = $._data($('#signup-username')[0], "events");
        // console.log(events);

        $.ajax({
          type: "POST", 
          url: "/register/" + value,
          
          success: function(result){
            if(result)
              isEmailValid = setError( $(e.target), $(e.target).parent() , "Email ID already exists.") ;
            else if(!result)
              isEmailValid = setSuccess( $(e.target).parent() );
            else
              console.log(result);
          },
          
          error: function(err){
            console.log(err);
          }
        });

      } 

    });

  ////////////////  VALIDATE PASSWORD
    $("#signup-pass").on("keyup focus", function(e){

      const value = $(e.target).val().trim();
      const regex = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*_-]{8,16}$/;

      //if password is empty
      if (value === "" || value === undefined ){
        isPassValid = setError( $(e.target), $(e.target).parent() , "Password is required.") ;
      }
      //if password length is less than 8 or more than 16
      else if(value.length < 8 || value.length > 16){
        isPassValid = setError( $(e.target), $(e.target).parent() , "Password length must be betweeen 8 and 16.") ;
      }
      //if password doesnt match the given pattern - sho
      else if( !regex.test(String(value)) ){
        isPassValid = setError(  $(e.target), $(e.target).parent() , "Your password must contain atleast one uppercase letter, one lowercase letter, one special character (!,@,#,$,%,^,&,*,(,),_,-,+,=) and a number.") ;
      }
      else{ 
        isPassValid = setSuccess( $(e.target).parent() );
        matchPassword();
      }
    });


  ////////////////  VALIDATE CONFIRM PASSWORD
    $("#confirm-pass").on("keyup focus", function(e){
      const value = $("#confirm-pass").val().trim();

      //if confirm password is empty
      if(value === "" || value === undefined){
        isConfirmPassValid = setError( $(e.target), $(e.target).parent() , "Please confirm your password.");
      }
      //if password doesnt match with the confirm password
      else 
        matchPassword();
    });

// function to match the password
    function matchPassword(){
      const passValue = $("#signup-pass").val().trim();
      const confirmPassValue = $("#confirm-pass").val().trim();

      if(confirmPassValue !== "" && confirmPassValue !== passValue)
          isConfirmPassValid = setError( $("#confirm-pass"), $("#confirm-pass").parent() , "Passwords do not match.");

      if(confirmPassValue !== "" && confirmPassValue === passValue)
        isConfirmPassValid = setSuccess( $("#confirm-pass").parent() );
    }


  //Add Error class to the form-group
  function setError(target, parent, message){
      if(parent.hasClass("success")){
        parent.removeClass("success");
      }
      parent.addClass("error");
      parent.find(".toggle-password").css("right", "30px");
      parent.find(".error-message").text(message); 
      return false;
  }

//Add Success class to the form-group
  function setSuccess(parent){
      if(parent.hasClass("error")){
        parent.removeClass("error");
      }
      parent.addClass("success");
      parent.find(".toggle-password").css("right", "30px");
      return true;
  }

  /*************VALIDATING SIGNUP FORM******************** */

  function validateSignUpForm(){

    $("#signup-form").submit(function(e){

      e.preventDefault();

      //if all the validations and constraints on signup form is successful, then pass the data to the server  
      if(isEmailValid && isPassValid && isConfirmPassValid){
        console.log("Singnup form success");

        $.ajax({
          type: "POST", 
          url: "/register",
          data: {
            username: $("#signup-username").val().trim(),
            pass: $("#signup-pass").val().trim(),
            confirmPass: $("#confirm-pass").val().trim()
          },

          success: function(result){
            $("#message").text(result);
            $(".box").hide(500, function(){
              $(".success-register").show(500);
            });
          },

          error: function(error){
            console.log(error);
          }
        });
      }
      else{
        console.log("Signup Form Submission Failed");

        const form = $(e.target);
        const username = form.find("#signup-username");
        const pass = form.find("#signup-pass");
        const confirmPass = form.find("#confirm-pass");

        //If any of the required fields are empty, then throw the error
        if (username.val().trim() === "")
          isEmailValid = setError( username, username.parent() , "Email ID is required.") ;
        if (pass.val().trim() === "")
          isPassValid = setError( pass, pass.parent() , "Password is required.") ;
        if (confirmPass.val().trim() === "")
          isConfirmPassValid = setError( confirmPass, confirmPass.parent() , "Please confirm your password.") ;

      }

    });

  }
