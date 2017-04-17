/**
 * Created by Sean on 4/11/2017.
 */
$(document).ready(function(){
    $('#forgot-password').on('click', function(event) {
        var email = $("#email").val();
        var bDay = $("#bDay").val();
        var bMonth = $("#bMonth").val();
        var bYear = $("#bYear").val();


        //testing
        /*alert(
            "Email: " + email +
            "\nB Day: " + bDay +
            "\nB Month: " + bMonth +
            "\nB Year: " + bYear
        );*/

        if(validateEmail(email) && validateDOB(bDay,bMonth,bYear)) {
            //alert("good");
            //data valid
            //  if there is a user with this email and DOB
            //      generate random temp password
            //      change password to the temp password
            //      email the user with the temp password
            //  esle notify that user is not found
            newPassword = generateRandomPassword();
            var emailMessage = "Your temporary password is " + newPassword +
                "\nPlease log in using this temporary password and go to user profile page and manually change your password";
            $.ajax({
                async: false,
                type: 'GET',
                url: '../php/forgot-password.php',
                //url: '//localhost/forgot-password.php',
                dataType: 'jsonP',
                contentType:'application/javascript',
                jsonp: 'callback',
                jsonpcallback: 'logResults',
                data: {
                    email: email,
                    bDay: bDay,
                    bMonth: bMonth,
                    bYear: bYear,
                    newPassword: newPassword
                },
                success: function(response, textStatus){
                    console.log(textStatus);
                    if(response.length > 0) {
                        //found the user, can reset password
                        console.log(textStatus);
                        console.log(JSON.stringify(response));
                        //sendTestNotification();
                        sendAlertNotification(email,emailMessage,0,"Password");
                        alert("An Email Has Been Sent to " + email + " With A Temporary Password");
                        window.open("../pages/login.html", "_self");
                    }
                    else {
                        alert("user with that email and birth date not found");
                    }
                },
                error: function(jqXHR, textStatus, errorThrown) {
                    alert("Error " + errorThrown + "\n       Please contact the webmaster with this error.");
                }
            })
        }
    });
});

function validateEmail(email) {
    regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (!regex.test(email)) {
        alert("Error:\nNot a valid e-mail address");
        return false;
    }
    return true;
}

function validateDOB(bDay, bMonth, bYear){
    var date = new Date();

    if(bDay <= 31 && bDay > 0){
        if(bMonth <= 12 && bMonth > 0){
            if(bYear <= (date.getFullYear() - 13) && bYear > 1900){
                return true;
            }
            else{
                alert("Year not in range!\nMust be between 1900 and " + (date.getFullYear() - 13));
                return false;
            }
        }else{
            alert("Month not in range!\nMust be between 1 and 12");
            return false;
        }
    }else{
        alert("Day not in range!\nMust be between 1 and 31");
        return false;
    }
}

function generateRandomPassword() {
    var text = "";
    var capitol = "ABCDEFGHJKMNPQRSTUVWXYZ";
    var lower = "abcdefghjkmnpqrstuvwxyz";
    var number = "123456789";
    var symbol = "@#$%^&";
    text += capitol.charAt(Math.floor(Math.random() * capitol.length));
    text += lower.charAt(Math.floor(Math.random() * lower.length));
    text += number.charAt(Math.floor(Math.random() * number.length));
    text += symbol.charAt(Math.floor(Math.random() * symbol.length));
    text += capitol.charAt(Math.floor(Math.random() * capitol.length));
    text += lower.charAt(Math.floor(Math.random() * lower.length));
    text += number.charAt(Math.floor(Math.random() * number.length));
    text += symbol.charAt(Math.floor(Math.random() * symbol.length));
    text += capitol.charAt(Math.floor(Math.random() * capitol.length));
    text += lower.charAt(Math.floor(Math.random() * lower.length));

    return text;
}
