/**
 * Created by Mike on 3/25/2017.
 */
$(document).ready(function(){
    $("#login").on("click", function(){
        var email = $("#email").val();
        var password = $("#password").val();

        $.ajax({
            async: false,
            type: 'GET',
            url: 'http://localhost/getUser.php',
            dataType: 'jsonp',
            contentType:'application/javascript',
            jsonp: 'callback',
            jsonpcallback: 'logResults',
            data: {email: '"'+email+'"'},
            success: function(response, textStatus){
                if(email == response[0].email && password == response[0].password){
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
    console.log(userJSON);
    localStorage.setItem('userJSON', userJSON);
}