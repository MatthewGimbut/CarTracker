/**
 * Created by Mike on 4/14/2017.
 */

function deleteUser(){
    var confirmDelete = confirm("THIS WILL DELETE YOUR ACCOUNT AND IS NOT REVERSIBLE!");

    if(confirmDelete){
        var userJSON = localStorage.getItem("userJSON");
        var userID = userJSON.userID;

        $.ajax({
            url: '../php/removeUser.php',
            dataType:'json',
            type: 'get',
            data: {userID: userID},
            success:function(){
                alert("User deleted");
                localStorage.setItem('savedCarList', null);
                localStorage.setItem('userJSON', null);
                window.location="cartrackerproject.me";
            },
            error: function() {
                alert("Removal of user was not successful.");
            }
        });
    }
}