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
                alert("Sent " + template_id + " Email.");
            }, function (err) {
                alert("Send email failed!\r\n Response:\n " + JSON.stringify(err));
            });

    }else{ //severity was invalid
        alert("Error: Severity variable not valid. Email not sent.");
    }
}

/**
 * This function will send an email to a new user to CarTracker and ask them to verify their email. A randomly generated link
 * should have already been made to accommodate for this to happen.
 * The randomly generated link is created within this method.
 * @param toEmail the email that needs to be verified
 * @param username the username of the account getting the verification email
 */
function sendVerificationEmail(toEmail, username){
    var params = {toEmail: toEmail, username: username, verifyLink: getVerificationLink()};

    // Change to your service ID, or keep using the default service
    var service_id = "default_service";

    var template_id = "confirmEmail";

    src="https://cdn.emailjs.com/dist/email.min.js";
    src="//ajax.googleapis.com/ajax/libs/jquery/2.1.1/jquery.min.js";

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

/**
 * Function that sends an update to a user with car information
 * @param email the email address to which the update is sent to
 * @param details the details within the message: i.e "Your Car1 has an oil change in 200 miles."
 * @param preview should note the type of update based on their preferences. i.e. "Your Weekly Update."
 */
function sendUpdate(email, details, preview){
    var now = new Date();
    var millisTill10 = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 10, 0, 0, 0) - now;
    if (millisTill10 < 0) {
        millisTill10 += 86400000; // it's after 10am, try 10am tomorrow.
    }
    setTimeout(function(){
        //Currently just sends an update at 10am.

        //send update email, severity param is 3 because 3 sends the Update template.
        sendAlertNotification(email, details, 3, preview);
    }, millisTill10);


}

/**
 * This method will generate a verification link with a randomly set of alphanumeric characters
 */
function getVerificationLink(){
    var link = "http://www.cartrackerproject.me/CarTracker/pages/confirm.html?";
    length = 25; //25 characters to append link with
    var charset = "abcdefghijklmnopqrstuvwxyz0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    for (var i = length; i > 0; --i) link += charset[Math.floor(Math.random() * charset.length)];

    //console.log("generated link: " + link);

    return link;
}

/** Method that checks the verification status of a particular email.
 * If the email is not verified, the website will be redirected to the login page.
 * @returns a boolean if the email is verified or not.
 */
function redirectIfNotVerified(){
    if(!userJSON.verified){
        //window.location.href = "http://www.cartrackerproject.me/CarTracker/pages/login.html";
        window.location.href = "http://localhost/CarTracker/pages/login.html";
        return 0;
    }
    return 1;
}



$(document).ready(function(){
    $.ajax({
        async: false,
        type: 'GET',
        url: '../php/updateDaily.php',
        dataType: 'jsonP',
        contentType:'application/javascript',
        jsonp: 'callback',
        jsonpcallback: 'logResults',
        data: {
            username: username
        },
        success: function(response, textStatus){
            var resp = JSON.stringify(response);
            sendUpdate(userJSON.email, resp.details, "Your Weekly Update!");
        },
        error: function(jqXHR, textStatus, errorThrown) {
            console.log("Error " + errorThrown + "\nPlease contact the webmaster with this error.");
        }
    })

});

