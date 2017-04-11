/**
 * Created by Sean on 4/11/2017.
 */
$(document).ready(function(){
    $('#forgot-password').on('click', function(event) {
        var email = $("#email").val();
        var bDay = $("#bDay").val();
        var bMonth = $("#bMonth").val();
        var bYear = $("#bYear").val();

        alert(
            "Email: " + email +
            "\nB Day: " + bDay +
            "\nB Month: " + bMonth +
            "\nB Year: " + bYear
        );

        if(validateEmail(email) && validateDOB(bDay,bMonth,bYear)) {
            alert("good");
            //data valid
            //  if there is a user with this email and DOB
            //      login to that user
            //      take to reset-password.html
            //  esle notify that user is not found
        }
    });
})

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