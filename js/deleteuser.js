/**
 * Created by Mike on 4/14/2017.
 */

function deleteUser(){
    var confirmDelete = confirm("THIS WILL DELETE YOUR ACCOUNT AND IS NOT REVERSIBLE!");

    if(confirmDelete){
        var userJSON = localStorage.getItem("userJSON");
        var userID = userJSON.userID;

        $.ajax({
            url:(url),
            dataType:'json',
            type: 'get',
            url: '../php/removeUser.php',
            data: {userID: userID},
            success:function(response){
                window.location="cartrackerproject.me";
            },
            error: function(data) {
                alert("Removal of user was not successful.");
            }
        });
    }
}