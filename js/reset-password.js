/**
 * Created by Sean on 4/10/2017.
 */
var userJSON = JSON.parse(localStorage.getItem('userJSON'));
var username = userJSON.username;

document.getElementById("panel-header").innerHTML = "Reset Password for " + username;

$(document).ready(function(){
    $('#reset-password').on('click', function(event) {
        var newPassword1 = $("#new-password").val();
        var newPassword2 = $("#confirm-new-password").val();
        var regex = /^(?=.*[0-9])(?=.*[!@#$%^&*])(?=.*[a-zA-Z])[a-zA-Z0-9!@#$%^&*]{8,16}$/;

        if(validatePassword(newPassword1,newPassword2)==true) {
            alert("good");
            //ready to update password
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