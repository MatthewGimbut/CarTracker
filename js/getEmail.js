/**
 * Connects to php database for the Car Tracker email
 *
 * @author Joseph Mecca
 */

var userJSON;

/**
 * Initializes the emailjs connection
 */
function initializeEmailJS(){
    src="https://cdn.emailjs.com/dist/email.min.js";
    src="//ajax.googleapis.com/ajax/libs/jquery/2.1.1/jquery.min.js";
    emailjs.init("user_5MjWrl8xxvlAXf4o7epDE");
}

/**
 * @param toEmail target Email
 */
function sendTestNotification(){
    var params = {toEmail: userJSON.email};
    initializeEmailJS();

    // Change to your service ID, or keep using the default service
    var service_id = "default_service";

    var template_id = "notification";
    src="https://cdn.emailjs.com/dist/email.min.js";
    src="//ajax.googleapis.com/ajax/libs/jquery/2.1.1/jquery.min.js";
    emailjs.send(service_id,template_id,params)
        .then(function(){
            alert("Sent!");
        }, function(err) {
            alert("Send email failed!\r\n Response:\n " + JSON.stringify(err));
        });
}

function sendTestNotif(){
    var params = {toEmail: "masterhalo812@yahoo.com"};
    initializeEmailJS();

    // Change to your service ID, or keep using the default service
    var service_id = "default_service";

    var template_id = "notification";
    src="https://cdn.emailjs.com/dist/email.min.js";
    src="//ajax.googleapis.com/ajax/libs/jquery/2.1.1/jquery.min.js";
    emailjs.send(service_id,template_id,params)
        .then(function(){
            alert("Sent!");
        }, function(err) {
            alert("Send email failed!\r\n Response:\n " + JSON.stringify(err));
        });
}

function sendUpdate(){
    var now = new Date();
    var millisTill10 = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 10, 0, 0, 0) - now;
    if (millisTill10 < 0) {
        millisTill10 += 86400000; // it's after 10am, try 10am tomorrow.
    }
    setTimeout(function(){
        //Currently just sends an update at 10am. Let's see if it works.
        var params = {toEmail: "mikecrinite@gmail.com"};
        initializeEmailJS();

        // Change to your service ID, or keep using the default service
        var service_id = "default_service";

        var template_id = "notification";
        src="https://cdn.emailjs.com/dist/email.min.js";
        src="//ajax.googleapis.com/ajax/libs/jquery/2.1.1/jquery.min.js";
        emailjs.send(service_id,template_id,params)
            .then(function(){
                alert("Sent!");
            }, function(err) {
                alert("Send email failed!\r\n Response:\n " + JSON.stringify(err));
            });
        console.log("sent!");
    }, millisTill10);


}

$(document).ready(function(){
    sendUpdate();
});

