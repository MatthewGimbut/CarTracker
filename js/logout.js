/**
 * Created by Mike on 4/8/2017.
 */

$(document).ready(function() {
    $("#logout").click(function(){
        //alert("clicked");
        localStorage.setItem('userJSON', null);
    });
});