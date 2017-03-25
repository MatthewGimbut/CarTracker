/**
 * Validates fields in the registration form and then accesses
 * the database in order to create the user's profile information
 *
 * @author Mike Moscariello, Mike Crinite
 */
$(document).ready(function(){
    $('#register').on('click', function(event){
        var email = $("#email").val();
        var confirmEmail = $("#confirmEmail").val();
        if(email === confirmEmail) {
            var password = $("#password").val();
            var confirmPassword = $("#confirmPassword").val();
            if (password === confirmPassword) {

                var firstName = $("#firstName").val();
                var lastName = $("#lastName").val();
                var username = $("#username").val();
                var bDay = $("#bDay").val();
                var bMonth = $("#bMonth").val();
                var bYear = $("#bYear").val();

                if(validateNames(firstName, lastName, username)){
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
                            alert("Error " + errorThrown);
                        }
                    })
                }

            }
            else {
                alert("The passwords entered do not match!");
            }
        }
        else{
            alert("The email addresses entered do not match!");
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
        alert("Error: Fields cannot be blank.\nFirst Name and Username must be 20 characters or less.\n" +
            "Last Name must be 30 characters or left");
        return false;
    }

    //Check first name, last name for valid characters
    if(!regex.test(firstName)
        || !regex.test(lastName)){
        console.log(firstName + ", " + lastName);
        alert("Error: First Name or Last Name contains invalid characters");
        return false;
    }

    regex = /^[a-zA-Z0-9_-]+$/; //Lower, upper, digits, underscore, hyphen

    if(!regex.test(username)){
        alert("Error: Username contains invalid characters");
        return false;
    }

    return true;
}

function validatePassword(password, confirmPassword){
    if (password === confirmPassword) {
        return true;
    }
    return false;
}

function validateEmail(email, confirmEmail) {
    //Found this at emailregex.com. It "99.99% works"
    regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (!email === confirmEmail) {
        alert("Error: Emails do not match");
        return false;
    }else if(!regex.test(email)){
        alert("Error: Email contains invalid characters");
        return false;
    }
    return true;
}