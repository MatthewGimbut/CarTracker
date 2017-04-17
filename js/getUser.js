/**
 * Retrieves and creates a session for a user (if their email and password were correct)
 *
 * @author Mike Moscariello, Mike Crinite
 */
$(document).ready(function(){
    $("#login").on("click", function(){
        var email = $("#email").val();
        var password = $("#password").val();

        $.ajax({
            async: false,
            type: 'GET',
            url: '../php/getUser.php',
            dataType: 'jsonp',
            contentType:'application/javascript',
            jsonp: 'callback',
            jsonpcallback: 'logResults',
            data: {email: email,
                   password: password},
            success: function(response, textStatus){
                if(response.length > 0 && email === response[0].email){
                    saveCookies(JSON.stringify(response[0]));
                    window.open("../pages/userProfile.html", "_self");
                }
                else{
                    alert("Incorrect username or password entered!");
                }
            },
            error: function(jqXHR, textStatus, errorThrown) {
                alert("Error " + errorThrown);
            }
        })
    })
});

function saveCookies(userJSON){
    localStorage.setItem('userJSON', userJSON);
}