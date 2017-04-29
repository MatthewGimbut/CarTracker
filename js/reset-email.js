/**
 * Created by Sean on 4/10/2017.
 */
var userJSON = JSON.parse(localStorage.getItem('userJSON'));
var username = userJSON.username;
var email = userJSON.email;

document.getElementById('emailLabel').innerHTML = "Current Email: " + email;

$(document).ready(function(){
    $('#reset-email').on('click', function(event) {
        var newEmail1 = $("#newEmail1").val();
        var newEmail2 = $("#newEmail2").val();

        if(validateEmail(newEmail1,newEmail2)==true) {
            //change email in database
            $.ajax({
                async: false,
                type: 'GET',
                url: '../php/reset-email.php',
                //url: '//localhost/reset-email.php',
                dataType: 'jsonP',
                contentType:'application/javascript',
                jsonp: 'callback',
                jsonpcallback: 'logResults',
                data: {
                    username: username,
                    newEmail1: newEmail1,
                    email: email
                },
                success: function(response, textStatus){
                    console.log(textStatus);
                    console.log(JSON.stringify(response));
                    alert("Your Email Has Been Changed To " + newEmail1);
                },
                error: function(jqXHR, textStatus, errorThrown) {
                    alert("Error " + errorThrown + "\nPlease contact the webmaster with this error.");
                }
            })
        }
    });
});

function validateEmail(email, confirmEmail) {
    //Found this at emailregex.com. It "99.99% works"
    regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (email !== confirmEmail) {
        alert("Error:\nEmails do not match");
        return false;
    } else if (!regex.test(email)) {
        alert("Error:\nNot a valid e-mail address");
        return false;
    }
    return true;
}
