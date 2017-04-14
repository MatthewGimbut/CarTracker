/**
 * Created by Mike on 4/14/2017.
 */

var userJSON;

function deleteUser(){
    var confirmDelete = confirm("THIS WILL DELETE YOUR ACCOUNT AND IS NOT REVERSIBLE!");

    if(confirmDelete){
        userJSON = JSON.parse(localStorage.getItem('userJSON'));
        var username = userJSON.username;
        console.log(username);

        $.ajax({
            async: false,
            url: '../php/removeUser.php',
            dataType:'json',
            contentType:'application/javascript',
            jsonp: 'callback',
            jsonpcallback: 'logResults',
            type: 'get',
            data: {username: username}
        });

        alert("User deleted");
        localStorage.setItem('savedCarList', null);
        localStorage.setItem('userJSON', null);
        window.location="login.html";
    }
}