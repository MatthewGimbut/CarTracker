/**
 * Connects to webclient for the Car Tracker email and sends emails to
 * addresses for notifications and updates
 *
 * @author Joseph Mecca
 */

/**
 * Initializes the emailjs connection
 */
function initializeEmailJS(){
    emailjs.init("user_5MjWrl8xxvlAXf4o7epDE");
}

/**
 * @param toEmail target Email
 */
function sendTestNotification(toEmail){
    emailjs.send("default_service","notification", toEmail);
}