/**
 * Validates fields in the registration form and then accesses
 * the database in order to create the user's profile information
 *
 * @author Mike Moscariello, Mike Crinite
 */
$(document).ready(function(){
    $('#register').on('click', function(event){
        var firstName = $("#firstName").val();
        var lastName = $("#lastName").val();
        var username = $("#username").val();
        var email = $("#email").val();
        var confirmEmail = $("#confirmEmail").val();
        var password = $("#password").val();
        var confirmPassword = $("#confirmPassword").val();
        var bDay = $("#bDay").val();
        var bMonth = $("#bMonth").val();
        var bYear = $("#bYear").val();

        if(validateNames(firstName, lastName, username)
            && validateEmail(email, confirmEmail)
            && validatePassword(password, confirmPassword)){
            $.ajax({
                async: false,
                type: 'GET',
                url: 'http://localhost/postUser.php',
                dataType: 'jsonP',
                contentType:'application/javascript',
                jsonp: 'callback',
                jsonpcallback: 'logResults',
                data: {firstName: firstName,
                    lastName: lastName,
                    username: username,
                    email: email,
                    password: password,
                    bDay: bDay,
                    bMonth: bMonth,
                    bYear: bYear},
                success: function(response, textStatus){
                    console.log(textStatus);
                    console.log(JSON.stringify(response));
                },
                error: function(jqXHR, textStatus, errorThrown) {
                    alert("Error " + errorThrown + "\nPlease contact the webmaster with this error.");
                }
            })
        }

    });
});

/**
 * Checks whether entered names are valid
 *
 * @param firstName Must contain either letters (currently English alphabet only) or spaces
 * @param lastName Must contain either letters (currently English alphabet only) or spaces
 * @param username Must contain either letters, digits, underscore or hyphen
 * @returns {boolean} True if all tests pass
 */
function validateNames(firstName, lastName, username){
    firstName = firstName.trim();
    lastName = lastName.trim();
    username = username.trim();
    var regex = /^[a-zA-Z ]+$/; //Lower, upper, space character

    //Check for blank
    if(firstName === ""
            || firstName.length > 20
            || lastName === ""
            || lastName.length > 30
            || username === ""
            || username.length > 20 ){
        alert("Error:\nFields cannot be blank.\nFirst Name and Username must be 20 characters or less.\n" +
            "Last Name must be 30 characters or left");
        return false;
    }

    //Check first name, last name for valid characters
    if(!regex.test(firstName)
        || !regex.test(lastName)){
        console.log(firstName + ", " + lastName);
        alert("Error:\nFirst Name or Last Name contains invalid characters");
        return false;
    }

    regex = /^[a-zA-Z0-9_-]+$/; //Lower, upper, digits, underscore, hyphen

    if(!regex.test(username)){
        alert("Error:\nInvalid username");
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
function validatePassword(password, confirmPassword){
    //Assert a string has at least one number,
    //Assert a string has at least one special character
    //Assert a string has at least one letter
    //Allow lowercase, uppercase, digits, special chars. min length 8, max length 16
    var regex = /^(?=.*[0-9])(?=.*[!@#$%^&*])(?=.*[a-zA-Z])[a-zA-Z0-9!@#$%^&*]{8,16}$/;

    if (password !== confirmPassword) {
        alert("Error:\nPasswords do not match!");
        return false;
    }else if(!regex.test(password)){
        alert("Error:\nValid characters for a password are:" +
            "\n    -Lowercase or capital letters\n    -Digits\n    -!@#$%^&*" +
            "\nPasswords must be between 8 and 16 characters and contain one of each of the above.");
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
function validateEmail(email, confirmEmail) {
    //Found this at emailregex.com. It "99.99% works"
    regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (email !== confirmEmail) {
        alert("Error:\nEmails do not match");
        return false;
    }else if(!regex.test(email)){
        alert("Error:\nNot a valid e-mail address");
        return false;
    }
    return true;
}