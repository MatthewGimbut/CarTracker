/**
 * Validates fields in the registration form and then accesses
 * the database in order to create the user's profile information
 *
 * @author Mike Moscariello, Mike Crinite
 */
var userExists = false; //Variable to track whether the username already exists in the DB (true) or not (false).
var emailExists = false; //Variable to track whether the email already exists in the DB (true) or not (false).

function createUser(){
        var firstName = $("#firstName").val();
        var lastName = $("#lastName").val();
        var username = $("#username").val();
        var email = $("#email").val();
        var confEmail = $("#confirmEmail").val();
        var password = $("#password").val();
        var confPassword = $("#confirmPassword").val();
        var bDay = $("#bDay").val();
        var bMonth = $("#bMonth").val();
        var bYear = $("#bYear").val();



        if(validateFirstName(firstName) && validateLastName(lastName) && validateUsername(username)){
            if (validateEmail(email) && confirmEmail(email, confEmail)) {
                if (validatePassword(password) && confirmPassword(password, confPassword)) {
                    if (validateMonth(bMonth) && validateDay(bDay) && validateYear(bYear)) {
                        if(userExists === false) {
                            if(emailExists === false) {
                                //sending verification email BEFORE the new window opens
                                sendVerificationEmail(email, username);

                                $.ajax({
                                    async: false,
                                    type: 'GET',
                                    url: '../php/postUser.php',
                                    //url: 'http://localhost/postUser.php',
                                    dataType: 'jsonP',
                                    contentType: 'application/javascript',
                                    jsonp: 'callback',
                                    jsonpcallback: 'logResults',
                                    data: {
                                        firstName: firstName,
                                        lastName: lastName,
                                        username: username,
                                        email: email,
                                        password: password,
                                        bDay: bDay,
                                        bMonth: bMonth,
                                        bYear: bYear
                                    },
                                    success: function (response, textStatus) {
                                        saveCookies(JSON.stringify(response));
                                        console.log("This happened");
                                        window.open("../pages/userProfile.html", "_self");
                                    },
                                    error: function (jqXHR, textStatus, errorThrown) {
                                        alert("Error " + errorThrown + "\nPlease contact the webmaster with this error.");
                                    }
                                })
                            }
                            else{
                                alert("The selected email already exists! Please choose a different one.");
                            }
                        }
                        else{
                            alert("The selected username already exists! Please choose a different one.");
                        }
                    }
                    else{
                        //validateDOB
                        alert("Invalid birth date! (Must be 13 years or older to register!)");
                    }
                }
                else{
                    //validatePassword
                    alert("Error: Check your password and the confirmation!\nValid characters for a password are:" +
                        "\n    -Lowercase or capital letters\n    -Digits\n    -!@#$%^&*" +
                        "\nPasswords must be between 8 and 16 characters and contain one of each of the above.");
                }
            }
            else{
                //validateEmail
                alert("Error:Check the email field and its confirmation field!\nNot a valid e-mail address");
            }
        }
        else{
            //validateFirstName, lastName, username
            alert("Error:\n-Fields cannot be blank.\n-First Name and Username must be 20 characters or less.\n" +
                "-Last Name must be 30 characters or less \n-First and last names can only contain letters\n" +
                "-Username can only contain letters, numbers, underscores and dashes.");
        }
}


$(document).ready(function() {
    $('#register').on('click', function (event) {

        var username = $("#username").val();
        var email = $("#email").val();

        $.ajax({
            async: false,
            type: 'GET',
            //url: 'http://localhost/checkExistingUser.php',
            url: '../php/checkExistingUser.php',
            dataType: 'jsonP',
            contentType: 'application/javascript',
            jsonp: 'callback',
            jsonpcallback: 'logResults',
            data: {
                username: username,
                email: email
            },
            success: function (response, textStatus) {
                if (response.userFields > 0) {
                    userExists = true;
                    console.log(response.userFields);
                }
                else {
                    userExists = false;
                    console.log(response.userFields);
                }

                if (response.emailFields > 0) {
                    emailExists = true;
                    console.log(response.emailFields);
                }
                else {
                    emailExists = false;
                    console.log(response.emailFields);
                }
                createUser();
            },
            error: function (jqXHR, textStatus, errorThrown) {
                alert("Error " + errorThrown + "\nPlease contact the webmaster with this error.");
            }
        });

    });
});

$("#firstName").keyup(function(){
   var firstName = $('#firstName').val();

   if(!validateFirstName(firstName)){
       $("#firstName").css("background-color", "Tomato")
   }
   else{
       $("#firstName").css("background-color", "Chartreuse")
   }
});

$("#lastName").keyup(function(){
    var lastName = $('#lastName').val();

    if(!validateLastName(lastName)){
        $("#lastName").css("background-color", "Tomato")
    }
    else{
        $("#lastName").css("background-color", "Chartreuse")
    }
});

$("#username").keyup(function(){
    var username = $('#username').val();

    if(!validateUsername(username)){
        $("#username").css("background-color", "Tomato")
    }
    else{
        $("#username").css("background-color", "Chartreuse")
    }
});

$("#email").keyup(function(){
    var email = $("#email").val();

    if(!validateEmail(email)) {
        $("#email").css("background-color", "Tomato");
    }
    else{
        $("#email").css("background-color", "Chartreuse");
    }
});


$("#confirmEmail").keyup(function(){
    var email = $("#email").val();
    var confEmail = $("#confirmEmail").val();

    if(!confirmEmail(email, confEmail)) {
        $("#confirmEmail").css("background-color", "Tomato");
    }
    else{
        $("#confirmEmail").css("background-color", "Chartreuse");
    }
});

$("#password").keyup(function(){
    var password = $("#password").val();

    if(!validatePassword(password)) {
        $("#password").css("background-color", "Tomato");
    }
    else{
        $("#password").css("background-color", "Chartreuse");
    }
});

$("#confirmPassword").keyup(function(){
    var password = $("#password").val();
    var confPassword = $("#confirmPassword").val();

    if(!confirmPassword(password, confPassword)) {
        $("#confirmPassword").css("background-color", "Tomato");
    }
    else{
        $("#confirmPassword").css("background-color", "Chartreuse");
    }
});

$("#bMonth").keyup(function(){
   var bMonth = $("#bMonth").val();

   if(!validateMonth(bMonth)){
       $("#bMonth").css("background-color", "Tomato");
   }
   else{
       $("#bMonth").css("background-color", "Chartreuse");
   }
});

$("#bDay").keyup(function(){
    var bDay = $("#bDay").val();

    if(!validateDay(bDay)){
        $("#bDay").css("background-color", "Tomato");
    }
    else{
        $("#bDay").css("background-color", "Chartreuse");
    }
})

$("#bYear").keyup(function(){
    var bYear = $("#bYear").val();

    if(!validateYear(bYear)){
        $("#bYear").css("background-color", "Tomato");
    }
    else{
        $("#bYear").css("background-color", "Chartreuse");
    }
})


/**
 * Checks whether entered first name is valid
 *
 * @param firstName Must contain either letters (currently English alphabet only) or spaces
 * @returns {boolean} True if all tests pass
 */
function validateFirstName(firstName){
    firstName = firstName.trim();

    var regex = /^[a-zA-Z ]+$/; //Lower, upper, space character

    //Check for blank
    if(firstName === "" || firstName.length > 20){
        return false;
    }

    if(!regex.test(firstName)) {

        return false;
    }

    return true;
}

/**
 * Checks whether entered last name is valid
 *
 * @param lastName Must contain either letters (currently English alphabet only) or spaces
 * @returns {boolean} True if all tests pass
 */
function validateLastName(lastName){
    lastName = lastName.trim();

    var regex = /^[a-zA-Z ]+$/; //Lower, upper, space character

    //Check for blank
    if(lastName === "" || lastName.length > 30){
        return false;
    }

    if(!regex.test(lastName)) {
        return false;
    }

    return true;
}

/**
 * Checks whether entered username is valid
 *
 * @param username Must contain either letters, digits, underscore or hyphen
 * @returns {boolean} True if all tests pass
 */
function validateUsername(username){
    username = username.trim();
    var regex = /^[a-zA-Z0-9_-]+$/; //Lower, upper, digits, underscore, hyphen

    if(username === "" || username.length > 20){
        return false;
    }

    if(!regex.test(username)){
        return false;
    }

    return true;
}


/**
 * Determines whether password matches its confirmation, and whether it is valid.
 * @param password User's target password
 * @param confirmPassword Confirmation of password
 * @returns {boolean} True if all tests pass
 */
function validatePassword(password){
    //Assert a string has at least one number,
    //Assert a string has at least one special character
    //Assert a string has at least one letter
    //Allow lowercase, uppercase, digits, special chars. min length 8, max length 16
    var regex = /^(?=.*[0-9])(?=.*[!@#$%^&*])(?=.*[a-zA-Z])[a-zA-Z0-9!@#$%^&*]{8,16}$/;

    if(!regex.test(password)){
        return false;
    }
    return true;
}

function confirmPassword(password, confPassword){
    if (password !== confPassword) {
        return false;
    }
    return true;
}

/**
 * Determines whether email matches its confirmation, and whether it is valid
 * @param email Email address for user
 * @param confirmEmail Confirmation of email
 * @returns {boolean} True if all tests pass
 */
function validateEmail(email) {
    //Found this at emailregex.com. It "99.99% works"
    regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (!regex.test(email)) {
        return false;
    }
    return true;
}

function confirmEmail(email, confEmail) {

    if (email !== confEmail) {
        // alert("Error:\nEmails do not match");
        return false;
    }
    return true;

}

function validateMonth(bMonth){
    if(bMonth <= 12 && bMonth > 0){
        return true;
    }
    return false;
}

function validateDay(bDay){
    if(bDay <= 31 && bDay > 0){
        return true;
    }
    return false;
}

function validateYear(bYear){
    var date = new Date();
    if(bYear <= (date.getFullYear() - 13) && bYear >= 1900){
        return true;
    }
    return false;
}


function saveCookies(userJSON){
    localStorage.setItem('userJSON', userJSON);
}