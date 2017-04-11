/**
 * Created by Sean on 4/10/2017.
 */
var userJSON = JSON.parse(localStorage.getItem('userJSON'));
var username = userJSON.username;
var email = userJSON.email;

document.getElementById("panel-header").innerHTML = "Reset Password for " + username;

$(document).ready(function(){
    $('#reset-password').on('click', function(event) {
        var newPassword1 = $("#newPassword1").val();
        var newPassword2 = $("#newPassword2").val();
        var regex = /^(?=.*[0-9])(?=.*[!@#$%^&*])(?=.*[a-zA-Z])[a-zA-Z0-9!@#$%^&*]{8,16}$/;

        if(validatePassword(newPassword1,newPassword2)==true) {
            //change password in database
            //take back to userProfile.html
            $.ajax({
                async: false,
                type: 'GET',
                //url: '../php/reset-password.php',
                url: '//localhost/reset-password.php',
                dataType: 'jsonP',
                contentType:'application/javascript',
                jsonp: 'callback',
                jsonpcallback: 'logResults',
                data: {
                    username: username,
                    newPassword1: newPassword1,
                    email: email
                },
                    success: function(response, textStatus){
                    console.log(textStatus);
                    console.log(JSON.stringify(response));
                    alert("Your Password Has Been Changed");
                    window.open("../pages/userProfile.html", "_self");
                },
                error: function(jqXHR, textStatus, errorThrown) {
                    alert("Error " + errorThrown + "\nPlease contact the webmaster with this error.");
                }
            })
        }
    });
});

function validatePassword(newPassword1,newPassword2) {
    if(newPassword1==newPassword2) {
        var regex = /^(?=.*[0-9])(?=.*[!@#$%^&*])(?=.*[a-zA-Z])[a-zA-Z0-9!@#$%^&*]{8,16}$/;
        if(regex.test(newPassword1)) {
            //passwords match and meet requirements
            return true;
        }
        else {
            alert("Password does not meet requirementts:\nValid characters for a password are:" +
                "\n    -Lowercase or capital letters\n    -Digits\n    -!@#$%^&*" +
                "\nPasswords must be between 8 and 16 characters and contain one of each of the above.");
            return false;
        }
    }
    else {
        alert("passwords do not match");
        return false
    }
}