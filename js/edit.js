/**
 * Created by Andrew Genova on 4/13/2017.
 */

var user = JSON.parse(localStorage.getItem('userJSON'));

$(document).ready(function () {
    $("#saveChanges").on("click", function () {
        var firstName = $("#firstName").val();
        var lastName = $("#lastName").val();
        var bDay = $("#bDay").val();
        var bMonth = $("#bMonth").val();
        var bYear = $("#bYear").val();
        var username = user.username;

        if (validateNames(firstName, lastName)
            || validateDOB(bDay, bMonth, bYear)) {
            $.ajax({
                async: false,
                type: 'GET',
                url: '../php/editProfile.php',
                dataType: 'jsonp',
                contentType: 'application/javascript',
                jsonp: 'callback',
                jsonpcallback: 'logResults',
                data: {
                    username: username,
                    firstName: firstName,
                    lastName: lastName,
                    bDay: bDay,
                    bMonth: bMonth,
                    bYear: bYear
                },
                success: function (response, textStatus) {
                    saveCookies(JSON.stringify(response[0]));
                    alert("Profile Updated");
                },
                error: function (jqXHR, textStatus, errorThrown) {
                    alert("Error " + errorThrown);
                }
            })
        }
        else {
            alert("Please verify that you have entered a valid name and/or birth date!");
        }
    })
});

function saveCookies(userJSON){
    localStorage.setItem('userJSON', null);
    localStorage.setItem('userJSON', userJSON);
}

/**
 * Checks whether entered names are valid
 *
 * @param firstName Must contain either letters (currently English alphabet only) or spaces
 * @param lastName Must contain either letters (currently English alphabet only) or spaces
 * @returns {boolean} True if all tests pass
 */
function validateNames(firstName, lastName) {
    firstName = firstName.trim();
    lastName = lastName.trim();
    var regex = /^[a-zA-Z ]+$/; //Lower, upper, space character

    //Check for blank
    if (firstName === ""
        || firstName.length > 20
        || lastName === ""
        || lastName.length > 30) {
        alert("Error:\nFields cannot be blank.\nFirst Name.\n" +
            "Last Name must be 30 characters or less");
        return false;
    }

    //Check first name, last name for valid characters
    if (!regex.test(firstName)
        || !regex.test(lastName)) {
        console.log(firstName + ", " + lastName);
        alert("Error:\nFirst Name or Last Name contains invalid characters");
        return false;
    }
    return true;
}

function validateDOB(bDay, bMonth, bYear) {
    var date = new Date();

    if (bDay <= 31 && bDay > 0) {
        if (bMonth <= 12 && bMonth > 0) {
            if (bYear <= (date.getFullYear() - 13) && bYear > 1900) {
                return true;
            }
            else {
                alert("Year not in range!");
                return false;
            }
        } else {
            alert("Month not in range!");
            return false;
        }
    } else {
        alert("Day not in range!");
        return false;
    }
}
