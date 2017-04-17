/**
 * Created by Joe Mecca on 4/17/2017.
 */

var userJSON = JSON.parse(localStorage.getItem('userJSON'));
var username = userJSON.username;

function verifyEmail(){
    //console.log("verifyEmail function called");
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
            username: username
        },
        success: function(response, textStatus){
            console.log(textStatus);
            console.log(JSON.stringify(response));
            console.log("You have been verified!");
        },
        error: function(jqXHR, textStatus, errorThrown) {
            console.log("Error " + errorThrown + "\nPlease contact the webmaster with this error.");
        }
    })
}