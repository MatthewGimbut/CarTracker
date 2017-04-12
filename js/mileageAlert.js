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
        //url: '../php/alert.php',
        url: '/localhost/alert.php',
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
                var message = false;
                while(index < response.length) {
                    var car = response[index].make + " " + response[index].model;
                    var miles = response[index].mileage - response[index].mileageLastInspection;

                    if(window.location.pathname === '/message-center.html'){
                        console.log("Right page");
                        //First create row to put alert in
                        var row = document.createElement("div");
                        row.className = "row";

                        //Create another div for column
                        var col = document.createElement("div");
                        col.className = "col-lg-4";
                        row.appendChild(col);

                        var color;
                        if (miles > 5000) {
                            color = " panel-red";
                            message = true;
                        } else if (miles > 2500) {
                            color = " panel-yellow";
                        } else {
                            color = " panel-green";
                        }

                        //Create alert object
                        var alert = document.createElement("div");
                        alert.id = "alert" + index;
                        alert.className = "panel" + color;
                        col.appendChild(alert);

                        //Create heading
                        var heading = document.createElement("div");
                        heading.className = "panel-heading";
                        heading.innerHTML = car;
                        alert.appendChild(heading);

                        //Create body
                        var body = document.createElement("div");
                        body.className = "panel-body";
                        body.innerHTML = "It has been " + miles + " miles since your last maintenance";
                        alert.appendChild(body);

                        //Create footer (empty for now)
                        var footer = document.createElement("div");
                        body.className = "panel-footer";
                        alert.appendChild(footer);

                        document.getElementById("page-wrapper").appendChild(row);

                        //index = index + 1;
                    }
                    //Add messages to messagebar

                // <li>
                //     <a href="#">
                //         <div>
                //         <strong>John Smith</strong>
                //     <span class="pull-right text-muted">
                //         <em>Yesterday</em>
                //         </span>
                //         </div>
                //         <div>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque eleifend...</div>
                //     </a>
                //     </li>


                    //Create listitem
                    var listItem = document.createElement("li");
                    //Create link
                    var link = document.createElement("a");
                    link.setAttribute("href", "message-center.html");
                    //Create div for text
                    var carCont = document.createElement("div");
                    carCont.innerHTML = "<strong>" + car +"</strong>";
                    //Span for information
                    var spanner = document.createElement("span");
                    spanner.className = "pull-right text-muted";
                    spanner.innerHTML = "Requires attention!";

                    carCont.append(spanner);
                    link.appendChild(carCont);
                    listItem.appendChild(link);

                    var messageList = document.getElementbyId("messageList");
                    messageList.appendChild(listItem);


                    index = index + 1;
                }
                index = 0;



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