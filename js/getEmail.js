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
    var params = {tloEmai: userJSON.email};
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
