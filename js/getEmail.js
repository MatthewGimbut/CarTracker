/**
 * Connects to php database for the Car Tracker email
 *
 * @author Joseph Mecca
 */

var userJSON;

/**
 * This will send a test notification to the currently logged in user (for debugging purposes, such as testing the email server).
 */
function sendTestNotification(){
    var params = {toEmail: userJSON.email, details: "This is a test notification from CarTracker", preview: "Test Preview"};

    // Change to your service ID, or keep using the default service
    var service_id = "default_service";

    var template_id = "notification";
    src="https://cdn.emailjs.com/dist/email.min.js";
    src="//ajax.googleapis.com/ajax/libs/jquery/2.1.1/jquery.min.js";

    emailjs.init("user_5MjWrl8xxvlAXf4o7epDE");
    emailjs.send(service_id,template_id,params)
        .then(function(){
            alert("Sent!");
        }, function(err) {
            alert("Send email failed!\r\n Response:\n " + JSON.stringify(err));
        });
}

/**
 * This method is to be used outside of the user being logged in, so there is no database calls.
 * They must be performed outside and the email string must be sent into this method to have
 * an email be sent correctly.
 * @param toEmail the target Email
 * @param messageDetails the details of the message. This is the ENTIRETY of the email details, so make sure it's descriptive for the situation at hand.
 * @param alertSeverity an int containing the severity of the alert. The following values determine which type of alert is sent:
 *          0: Highest Severity, Critical
 *          1: Medium Severity, Moderate
 *          2: Low Severity, Notification
 *          3: Update, Update Email
 *          currently no other values will be accepted. An invalid severity will produce no email.
 * @param alertPreviewType a string with a 'preview'. This should be categorized so that at the top of the email, this is what a user would see:
 *          What this alert is about:
 *          Oil Change <-- alertPreviewType
 *
 */
function sendAlertNotification(toEmail, messageDetails, alertSeverity, alertPreviewType) {
    var params = {toEmail: toEmail, details: messageDetails, preview: alertPreviewType};

    var severityFlag = true; //flag for ensuring the severity type is valid
    var emailJSAccount = 0; //identifier for which EmailJS account to use.

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
            template_id = "moderateAlert";
            break;
        case 2: //Low, notification
            template_id = "notification";
            break;
        case 3: //update, Update Email
            template_id = "update";
            emailJSAccount = 1;
            break;
        default: //invalid
            severityFlag = false;
    }

    if (severityFlag) {
        //set the correct account for sending, since EmailJS only has 3 templates per account
        switch(emailJSAccount){
            case 0:
                emailjs.init("user_5MjWrl8xxvlAXf4o7epDE");
                break;
            case 1:
                emailjs.init("user_P5JsJpV2qiU1B6MpHRqqM");
                break;
        }

        //send the email
        emailjs.send(service_id, template_id, params)
            .then(function () {
                console.log("Sent " + template_id + " Email.");
            }, function (err) {
                console.log("Send email failed!\r\n Response:\n " + JSON.stringify(err));
            });

    }else{ //severity was invalid
        console.log("Error: Severity variable not valid. Email not sent.");
    }
}

/**
 * This function will send an email to a new user to CarTracker and ask them to verify their email. A randomly generated link
 * should have already been made to accommodate for this to happen.
 * @param toEmail the email that needs to be verified
 * @param verificationLink the weblink to where the verification can be completed for the user. This should be randomly-generated
 */
function sendVerificationEmail(toEmail, verificationLink){
    var params = {toEmail: toEmail, verifyLink: verificationLink};

    // Change to your service ID, or keep using the default service
    var service_id = "default_service";

    var template_id = "verifyEmail";
    src = "https://cdn.emailjs.com/dist/email.min.js";
    src = "//ajax.googleapis.com/ajax/libs/jquery/2.1.1/jquery.min.js";

    //This email type uses Account 1, which has the template for Verification
    emailjs.init("user_P5JsJpV2qiU1B6MpHRqqM");

    //send the email
    emailjs.send(service_id, template_id, params)
        .then(function () {
            console.log("Sent Verification Email.");
        }, function (err) {
            console.log("Send email failed!\r\n Response:\n " + JSON.stringify(err));
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

        //message details. TODO: currently a skeleton with an example of how the message will be sent once passed to the sendAlertNotification method.
        var details = "This week with your car account:\n" +
            "Your {first car} has X miles and is Y miles away from an oil change.\n" +
            "Your {second car} has Y miles remaining until your tires should be checked or replaced.";
        var preview = "Weekly Update";

        //send update email, severity param is 3 because 3 sends the Update template.
        //from Joe: I noticed that you used your personal email for the first parameter. I kept it in place, but when you do change it for any user, make sure this is the location it goes now.
        sendAlertNotification("mikecrinite@gmail.com", details, 3, preview);
    }, millisTill10);


}

$(document).ready(function(){
    sendUpdate();
});

