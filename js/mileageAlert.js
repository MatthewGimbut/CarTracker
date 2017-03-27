/**
 * Created by Mike on 3/26/2017.
 */
var userJSON;

function loadCookies() {
    userJSON = JSON.parse(localStorage.getItem('userJSON'));
}

$(document).ready(function(){
    loadCookies();
    var username = userJSON.username;

    $.ajax({
        async: false,
        type: 'GET',
        url: 'http://localhost/alert.php',
        dataType: 'jsonp',
        contentType:'application/javascript',
        jsonp: 'callback',
        jsonpcallback: 'logResults',
        data: {username: username},
        success: function(response, textStatus){
            console.log(response);
            if(response.length > 0){ //Then at least one car was returned
                var elem = document.getElementById("defaultAlertPanel");
                elem.parentNode.removeChild(elem);

                var index = 0;
                while(index < response.length){
                    var car = response[index].make + " " + response[index].model;
                    var miles = response[index].mileage - response[index].mileageLastInspection;

                    //First create row to put alert in
                    var row = document.createElement("div");
                    row.class = "row";

                    //Create another div for column
                    var col = document.createElement("div");
                    col.class = "col-lg-4";
                    row.appendChild(col);

                    //Create alert object
                    var alert = document.createElement("div");
                    alert.id = "alert" + index;
                    alert.class = "panel panel-yellow";
                    col.appendChild(alert);

                    //Create heading
                    var heading = document.createElement("div");
                    heading.class = "panel-heading";
                    heading.innerHTML = car;
                    alert.appendChild(heading);

                    //Create body
                    var body = document.createElement("div");
                    body.class = "panel-body";
                    body.innerHTML = "It has been " + miles + " miles since your last maintenance";
                    alert.appendChild(body);

                    //Create footer (empty for now)
                    var footer = document.createElement("div");
                    body.class = "panel-footer";
                    alert.appendChild(footer);

                    document.getElementById("page-wrapper").appendChild(row);

                    index = index + 1;
                }
            }
            else{
                console.log("User has no cars in need of maintenance");
            }
        },
        error: function(jqXHR, textStatus, errorThrown) {
            alert("Error " + errorThrown);
        }
    })
});