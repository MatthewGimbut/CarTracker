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

/*
 * This method is to be used outside of the user being logged in, so there is no database calls.
 * They must be performed outside and the email string must be sent into this method to have
 * an email be sent correctly.
 * @param toEmail the target Email
 * @param messageDetails the details of the message. This is the ENTIRETY of the email details, so make sure it's descriptive for the situation at hand.
 * @param alertSeverity an int containing the severity of the alert. The following values determine which type of alert is sent:
 *          0: Highest Severity, Critical
 *          1: Medium Severity, Moderate
 *          2: Low Severity, Alert
 *          3: Notification, Notification
 *          currently no other values will be accepted. An invalid severity will produce no email.
 * @param alertPreviewType a string with a 'preview'. This should be categorized so that at the top of the email, this is what a user would see:
 *          What this alert is about:
 *          Oil Change <-- alertPreviewType
 *
 */
function sendAlertNotification(toEmail, messageDetails, alertSeverity, alertPreviewType) {
    var params = {toEmail: toEmail, details: messageDetails, preview: alertPreviewType};
    initializeEmailJS();

    var severityFlag = true; //flag for ensuring the severity type is valid

    // Change to your service ID, or keep using the default service
    var service_id = "default_service";

    var template_id;
    src = "https://cdn.emailjs.com/dist/email.min.js";
    src = "//ajax.googleapis.com/ajax/libs/jquery/2.1.1/jquery.min.js";

    switch (alertSeverity) {
        case 0: //Highest, critical
            template_id = "criticalAlert";
            break;
        case 1: //Medium, moderate
            template_id = "";
            break;
        case 2: //Low, alert
            template_id = "";
            break;
        case 3: //notification, notification
            template_id = "";
            break;
        default: //invalid
            severityFlag = false;
    }

    if (severityFlag) {
        emailjs.send(service_id, template_id, params)
            .then(function () {
                console.log("Sent Critical Notification Email.");
            }, function (err) {
                console.log("Send email failed!\r\n Response:\n " + JSON.stringify(err));
            });
    }else{ //severity was invalid
        console.log("Error: Severity variable not valid. Email not sent.");
    }
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

