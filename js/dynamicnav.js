/**
 * Retrieves cookies for user's session and determines if they are logged in.
 * If they are, changes some parts of the page
 *
 * @author Michael Crinite
 */
var userJSON;

function loadCookies() {
    userJSON = JSON.parse(localStorage.getItem('userJSON'));
}


$(document).ready(function(){
    loadCookies();
    var username = userJSON.username;
    console.log(userJSON);

    if(userJSON !== null){
        //Remove register option
        var currentItem = document.getElementById("reg");
        currentItem.parentNode.removeChild(currentItem);

        //Change login to logout
        currentItem = document.getElementById("loginitem");
        var href = currentItem.children[0];
        href.innerHTML = "Log out";
        currentItem.setAttribute("id", "logout");
    }
});
