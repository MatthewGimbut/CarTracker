/**
 * JS to show progress to next inspection for user's vehicles
 *
 * Should be included in every page to change the "tasks" progress levels
 */
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
        url: 'http://localhost/getAllCars.php',
        dataType: 'jsonp',
        contentType:'application/javascript',
        jsonp: 'callback',
        jsonpcallback: 'logResults',
        data: {username: username},
        success: function(response, textStatus){
            console.log(response);
            try {
                if (response.length > 0) { //Then at least one car was returned
                    //Generate bars (1 per car)

                    //Car vars
                    var car, milesSince, window, progress, percent;

                    var index = 0;

                    //HTML vars
                    var separator, listItem, alink, container, textP, bar, innerbar, innerHTML;

                    var rounded, type;

                    while (index < response.length) {
                        car = response[index].make + " " + response[index].model;
                        milesSince = response[index].mileage - response[index].mileageLastInspection;
                        window = 5000; //Miles between oil changes
                        progress = milesSince / window;
                        percent = progress * 100;
                        rounded = roundup(percent);

                        if (rounded < 40 && rounded > 20) {
                            type = "(success)";
                        } else if (rounded < 60) {
                            type = "(warning)";
                        } else {
                            type = "(danger)";
                        }

                        if (index > 0) {
                            separator = document.createElement("li");
                            separator.className = "divider";

                            document.getElementById("dropdown-miles").appendChild(separator);
                        }

                        //List Item
                        listItem = document.createElement("li");

                        //For some reason there's an a link with no url?
                        alink = document.createElement("a");
                        listItem.appendChild(alink);

                        //Container for
                        container = document.createElement("div");
                        alink.appendChild(container);

                        //Description
                        textP = document.createElement("p");
                        innerHTML = "<Strong>" + car + "</Strong>";
                        innerHTML = innerHTML + "<span class=\"pull-right text-muted\">" +
                            percent + "% To Next Service</span>";
                        textP.innerHTML = innerHTML;
                        container.appendChild(textP);

                        //Display bar

                        bar = document.createElement("div");
                        bar.className = "progress progress-striped active";
                        container.appendChild(bar);

                        //Actual progressbar
                        innerbar = document.createElement("div");
                        innerbar.className = "progress-bar progress-bar-success";
                        innerbar.setAttribute("role", "progressbar");
                        innerbar.setAttribute("aria-valuenow", "" + percent);
                        innerbar.setAttribute("aria-valuemin", "0");
                        innerbar.setAttribute("aria-valuemax", "100");
                        innerbar.setAttribute("style", "width: " + percent + "%");
                        innerHTML = "<span class=\"sr-only\">" + percent + "Complete" + type + "</span>";
                        innerbar.innerHTML = innerHTML;
                        bar.appendChild(innerbar);

                        document.getElementById("dropdown-miles").appendChild(listItem);

                        index = index + 1;
                    }
                }
                else {
                    console.log("User has no cars in need of maintenance");
                }
            }catch(e){
                console.log("No Progress Bars To Set");
            }
        },
        error: function(jqXHR, textStatus, errorThrown) {
            alert("Error " + errorThrown);
        }
    })
});

function roundup(value){
    if(value ===0) {
        return 0;
    }else if(value < 20){
        return 20;
    }else if(value < 40){
        return 40;
    }else if(value <60){
        return 60;
    }else if(value < 80){
        return 80;
    }else{
        return 100;
    }
}

function extracode(){
    var elem = document.getElementById("defaultAlertPanel");
    elem.parentNode.removeChild(elem);

    var index = 0;
    while(index < response.length){

        //First create row to put alert in
        var row = document.createElement("div");
        row.className = "row";

        //Create another div for column
        var col = document.createElement("div");
        col.className = "col-lg-4";
        row.appendChild(col);

        //Create alert object
        var alert = document.createElement("div");
        alert.id = "alert" + index;
        alert.className = "panel panel-yellow";
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

        index = index + 1;
    }
}
