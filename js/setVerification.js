/**
 * Created by Joe Mecca on 4/17/2017.
 */

var userJSON = JSON.parse(localStorage.getItem('userJSON'));
var username = userJSON.username;
var verified = userJSON.verified;

function verifyEmail(){
    $.ajax({
        async: false,
        type: 'GET',
        url: '../php/setVerification.php',
        //url: '//localhost/setVerification.php',
        dataType: 'jsonP',
        contentType:'application/javascript',
        jsonp: 'callback',
        jsonpcallback: 'logResults',
        data: {
            username: username,
            verified: 1
        },
        success: function(response, textStatus){
            console.log(textStatus);
            console.log(JSON.stringify(response));
            alert("You have been verified!");
        },
        error: function(jqXHR, textStatus, errorThrown) {
            alert("Error " + errorThrown + "\nPlease contact the webmaster with this error.");
        }
    })
}