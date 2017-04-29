/**
 * Created by Mike on 3/26/2017.
 * This was made specifically for the mid semester review and will have to be modified for use with the final product.
 */

window.onload = getCar();
window.onload = getCurrentDate();

function getCar(){
    $.ajax({
        async: false,
        type: 'GET',
        url: '../php/getCar.php',
        //url: 'http://localhost/getCar.php',
        dataType: 'jsonp',
        contentType:'application/javascript',
        jsonp: 'callback',
        jsonpcallback: 'logResults',
        success: function(response, textStatus){
            display(response);
        },
        error: function(jqXHR, textStatus, errorThrown) {
            alert("Error " + errorThrown);
        }
    })
}

function display(response){
    $("#make").html(response[0].make);
    $("#model").html(response[0].model);
    $("#year").html(response[0].year);
    $("#trim").html(response[0].trim);
    $("#recordedMileage").html(response[0].mileage);
}

function getCurrentDate() {

    var currentdate = new Date();
    var dateTime = (currentdate.getMonth() + 1) + "/"
        + currentdate.getDate() + "/"
        + currentdate.getFullYear() + " @ "
        + currentdate.getHours() + ":"
        + currentdate.getMinutes() + ":"
        + currentdate.getSeconds();

    document.getElementById('currentDate').innerHTML = dateTime;
}