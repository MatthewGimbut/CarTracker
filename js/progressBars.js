/**
 * JS to show progress to next inspection for user's vehicles
 *
 * Should be included in every page to change the "tasks" progress levels
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

    $.ajax({
        async: false,
        type: 'GET',
        url: '../php/getAllCars.php',
        //url: 'http://localhost/getAllCars.php',
        dataType: 'jsonp',
        contentType:'application/javascript',
        jsonp: 'callback',
        jsonpcallback: 'logResults',
        data: {username: username},
        success: function(response, textStatus){
            try {
                if (response.length > 0) { //Then at least one car was returned
                    //Generate bars (1 per car)

                    //Car vars
                    var car, milesSince, window, progress, percent;

                    var index = 0;

                    //HTML vars
                    var separator, listItem, alink, container, textP, textP2, bar, innerbar, innerHTML;

                    var rounded, type;

                    while (index < response.length) {
                        car = response[index].make + " " + response[index].model;
                        milesSince = response[index].mileage - response[index].mileageLastInspection;
                        window = 5000; //Miles between oil changes
                        progress = milesSince / window;
                        percent = progress * 100;
                        rounded = roundup(percent);

                        if (rounded < 40) {
                            type = " progress-bar-success";
                        } else if (rounded < 60) {
                            type = " progress-bar-warning";
                        } else {
                            type = " progress-bar-danger";
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
                        alink.setAttribute("href", "car-list.html");
                        listItem.appendChild(alink);

                        //Container for
                        container = document.createElement("div");
                        container.setAttribute("title", percent + "% To Next Service");
                        alink.appendChild(container);

                        //Description
                        textP = document.createElement("p");
                        innerHTML = "<Strong>" + car + "</Strong>";
                        textP.innerHTML = innerHTML;
                        container.appendChild(textP);
                        /**
                        textP2 = document.createElement("p");
                        innerHTML = innerHTML + "<span class=\"pull-right text-muted\">" +
                            percent + "% To Next Service</span>";
                        textP.innerHTML = innerHTML;
                        container.appendChild(textP2);
                        */
                        //Display bar

                        bar = document.createElement("div");
                        bar.className = "progress progress-striped active";
                        container.appendChild(bar);

                        //Actual progressbar
                        innerbar = document.createElement("div");
                        innerbar.className = "progress-bar" + type;
                        innerbar.setAttribute("role", "progressbar");
                        innerbar.setAttribute("aria-valuenow", "" + percent);
                        innerbar.setAttribute("aria-valuemin", "0");
                        innerbar.setAttribute("aria-valuemax", "100");
                        innerbar.setAttribute("style", "width: " + percent + "%");
                        innerHTML = "<span class=\"sr-only\">" + percent + "Complete" + "</span>";
                        innerbar.innerHTML = innerHTML;
                        bar.appendChild(innerbar);

                        document.getElementById("dropdown-miles").appendChild(listItem);

                        index = index + 1;
                    }
                }
            }catch(e){
                console.log("Error " + e.message + ": No Progress Bars To Set");
            }
        },
        error: function(jqXHR, textStatus, errorThrown) {
            alert("Error " + errorThrown);
        }
    })
});

/**
 * For setting the color of the bar eventually
 *
 * Ask Mike C
 *
 * @param value Mileage percentage to round
 * @returns {number} Rounded number
 */
function roundup(value){
    if(value === 0) {
        return 0;
    }else if(value <= 20){
        return 20;
    }else if(value <= 40){
        return 40;
    }else if(value <= 60){
        return 60;
    }else if(value <= 80){
        return 80;
    }else{
        return 100;
    }
}
