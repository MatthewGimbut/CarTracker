/**
 * Created by Mike on 3/21/2017.
 */
$(document).ready(function(){
    $('#register').on('click', function(event){
        console.log("This happened");
        var email = $("#email").val();
        var confirmEmail = $("#confirmEmail").val();
        if(email == confirmEmail) {
            var password = $("#password").val();
            var confirmPassword = $("#confirmPassword").val();
            if (password == confirmPassword) {

                var firstName = $("#firstName").val();
                var lastName = $("#lastName").val();
                var username = $("#username").val();
                var bDay = $("#bDay").val();
                var bMonth = $("#bMonth").val();
                var bYear = $("#bYear").val();

                console.log(firstName + lastName + username + email + password + bDay + bMonth + bYear);

                $.ajax({
                    async: false,
                    type: 'GET',
                    url: 'http://localhost/postUser.php',
                    dataType: 'jsonP',
                    contentType:'application/javascript',
                    jsonp: 'callback',
                    jsonpcallback: 'logResults',
                    data: {firstName: firstName,
                            lastName: lastName,
                            username: username,
                            email: email,
                            password: password,
                            bDay: bDay,
                            bMonth: bMonth,
                            bYear: bYear},
                    success: function(response, textStatus){
                        console.log(textStatus);
                        console.log(JSON.stringify(response));
                    },
                    error: function(jqXHR, textStatus, errorThrown) {
                        alert("Error " + errorThrown);
                    }
                })

            }
            else {
                alert("The passwords entered do not match!");
            }
        }
        else{
            alert("The email addresses entered do not match!");
        }
    });
});