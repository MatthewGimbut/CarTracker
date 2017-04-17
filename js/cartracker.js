/**
 * This file contains most of the code regarding searching for cars
 * and manipulating the corresponding data.
 * @author Matthew Gimbut, Michael Crinite
 */

var currentCarList = [];
var savedCarList = [];

var userJSON = JSON.parse(localStorage.getItem('userJSON'));
var username = userJSON.username;
var userID, edmMake, edmModel, edmYear, edmStyle, edmTrim;

/**
 * For formatting search results.
 * Adds a function to all strings to make sure they are all lowercase
 * except for the first letter, which is always capitalized.
 * @returns {string}
 */
function capitalize(toCap) {
    return toCap.toLowerCase().charAt(0).toUpperCase() + toCap.slice(1);
}

/**
 * Gathers information from the user and uses it to find and display
 * the results of the search.
 * This is the only place that Edmunds API is called.
 * Additionally, the car-search.html page is the only page that accesses the API.
 */
function searchCarInfo() {
    currentCarList = [];

    var make = $("#makeInput").val();
    var model = $("#modelInput").val();
    var year = $("#yearInput").val();
    var carInfo = $("#carInfo");

    console.log(typeof make);
    console.log(capitalize(make));

    //Remove previous cars from list
    while (carInfo.firstChild) {
        carInfo.removeChild(carInfo.firstChild);
    }

    if(make !== "" && model !== "" && year !== "") {
        var url = "https://api.edmunds.com/api/vehicle/v2/" +
            make + "/" +
            (model !== null ? (model + "/"): "") +
            (year !== null ? year: "") +
            "?fmt=json&api_key=2873ck8xzdvuhyh4trmr7axu";

        $.ajax({
            url:(url),
            dataType:'json',
            type: 'get',
            success:function(response){
                carInfo.text("");
                console.log(response);

                var currentRow = document.createElement("div");
                currentRow.className = "row col-lg-16";
                carInfo.append(currentRow);
                for(var i = 0; i < response.styles.length; i++) {
                    var car = new Car(
                        capitalize(make),
                        capitalize(model),
                        year,
                        response.styles[i].name,
                        response.styles[i].trim
                    );
                    currentCarList.push(car);
                    var div = document.createElement("div");
                    div.innerHTML = car.getFormattedSearchHTML();
                    currentRow.appendChild(div);
                    var footer = document.getElementById("carClick");
                    footer.id = i.toString();
                }
            },

            error: function(data) {
                carInfo.text("");
                carInfo.text("Search failed!");
            }
        });
    } else {
        var errorString = "Search failed.\n";
        if(make === "") {
            errorString += "Please enter a make.\n";
        }
        if(model === "") {
            errorString += "Please enter a model.\n";
        }
        if(year === "") {
            errorString += "Please enter a year.\n";
        }
        carInfo.text("");
        carInfo.text(errorString);
    }
}

/**
 * Disables clicks on car links after adding to car list.
 */
function clickAndDisable(link) {
    link.onclick = function(event) {
        event.preventDefault();
    }
}

/**
 * Redirects web page to the car search place
 */
function addVehicle() {
    window.location.href = "../pages/car-search.html";
}

/**
 * Small preview widget for Car objects.
 * Will display basic information about the car such as the make, model, year, and details.
 * Allows the user to select a car and view more details quickly.
 * @param car Car object to be displayed on the screen.
 * @param carID Car's carID field in the database
 * @returns {string}
 */
/*function getAddedCarPreview(car, carID) {
    return '<br><div class="col-lg-4 carSearchDiv">' +
        '<div class="panel panel-info">' +
        '<div class="panel-heading">' +
        car.year + " " + car.make + " " + car.model +
        '<span class="pull-right">' +
        '<a data-original-title="Remove this car" data-toggle="tooltip" type="button"' +
        ' class="btn btn-sm btn-danger" onclick="removeCar(' + carID + ');">' +
        '<i class="glyphicon glyphicon-remove"></i></a></span>' +
        '</div>' +
        '<div class="panel-body">' +
        '<p>' + 'Style: ' + car.carStyle + '</p>' +
        '<div class="panel-body">'+
        '<p id="mileage' + carID + '">Current Mileage: ' + car.mileage + '</p>' +
        '<input id="car' + carID + '">' +
        '<button onclick="updateMileage(' + carID + ',' + car.mileage + ')">Update Car Mileage</button>' +
        '</div>' +
        '</div>' +
        '<div class="panel-footer">' +
        'Click <a id="carClick" href="#" onclick="#">here</a> to view/edit maintenance details.' +
        '</div>' +
        '</div>' +
        '</div>';
}*/

function removeCar(carID){
    console.log(carID);
    var confirmDel = confirm("THIS WILL REMOVE YOUR CAR FROM YOUR ACCOUNT AND IS NOT REVERSIBLE!");

    if(confirmDel) {
        $.ajax({
            async: false,
            url: '../php/removeCar.php',
            dataType:'json',
            contentType:'application/javascript',
            jsonp: 'callback',
            jsonpcallback: 'logResults',
            type: 'get',
            data: {carID: carID}
        });

        alert("Car removed");
        window.location.reload(true); //Force hard reload
    }

}

/**
 * Queries db for vehicles belonging to userID, displays them on car-list.html
 */
function displayVehicles() {
    //loadCookies();
    //console.log(savedCarList);

    //Saving the length of response check this way because only testing on local.
    //Will work this way without having to change when on local/live.
    var responseCheck = 0;
    //Database call
    $.ajax({
        async: false,
        type: 'GET',
        url: '../php/getAllCars.php',
        dataType: 'jsonP',
        contentType: 'application/javascript',
        jsonp: 'callback',
        jsonpcallback: 'logResults',
        data: {username: username},
        success: function (response, textStatus) {
            var currentRow = document.getElementById("car-list-container");
            responseCheck = response.length;
            console.log("response length: " + responseCheck);
            console.log(textStatus);
            console.log(JSON.stringify(response));
            //saveCookies(JSON.stringify(response));
            //window.open("../pages/car-list.html", "_self");

            var div;
            if (currentRow === null) {
                currentRow = document.createElement("div");
            }
            var curr, retMake, retModel, retYear, retStyle, retTrim, retMileage, retMileMonth, retMileDay,
                retMileYear, retInspectMile, retInspectMonth, retInspectDay, retInspectYear, retId;

            var container = document.getElementById("carList");
            console.log(container === null);

            if (responseCheck === undefined || responseCheck === 0) {
                var noCars = document.createElement("p");
                var a = document.createElement("a");
                a.title = "Add cars";
                a.innerHTML = "To add a vehicle, click here.";
                a.href = "../pages/car-search.html";
                noCars.innerHTML = "You have no cars to display.";
                var newDiv = document.createElement("div");
                var col = document.createElement("div");
                col.className = "col-lg-4";
                newDiv.className = "row";
                col.appendChild(noCars);
                col.appendChild(a);
                newDiv.appendChild(col);
                document.getElementById("carListTitleDiv").appendChild(newDiv);
            }

            for (var i = 0; i < response.length; i++) {
                div = document.createElement("div");

                //Generate a car object for each response to user below
                retMake = response[i].make;
                retModel = response[i].model;
                retYear = response[i].year;
                retStyle = response[i].style;
                retTrim = response[i].trim;
                retMileage = response[i].mileage;
                retMileMonth = response[i].monthMileage;
                retMileDay = response[i].dayMileage;
                retMileYear = response[i].yearMileage;
                retInspectMile = response[i].mileageLastInspection;
                retInspectMonth = response[i].monthInspection;
                retInspectDay = response[i].dayInspection;
                retInspectYear = response[i].yearInspection;
                retId = response[i].carID;


                curr = new Car(
                    retMake,
                    retModel,
                    retYear,
                    retStyle,
                    retTrim,
                    retMileage,
                    retMileMonth,
                    retMileDay,
                    retMileYear,
                    retInspectMile,
                    retInspectMonth,
                    retInspectDay,
                    retInspectYear,
                    retId
                );

                //savedCarList.push(curr);

                div.className = "row";
                div.innerHTML = curr.getFormattedCarHTML(retId);
                currentRow.appendChild(div);

                //Set homepage must be done here because
                //async calls do things at the same time
                //so cars won't be loaded before it sets up
                if (container !== null) {
                    // Set home page
                    if (i === 0) {
                        container.removeChild(container.children[0]); // Remove div saying there's no cars
                    }

                    var hpCar = document.createElement("div");
                    hpCar.className = "row";
                    hpCar.style.width = "100%";
                    //TODO Ask mike about this
                    hpCar.innerHTML = curr.getFormattedCarHTML(retId);
                    container.appendChild(hpCar);

                    document.getElementById("numCars").innerHTML = (i + 1).toString();

                }
            }
            try {
                document.getElementById("welcome-message").innerHTML = "Welcome " + username + "!";
            } catch (err) {
            }
        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.log("Error " + errorThrown);
            alert("\nYou have to be logged in to store cars. Please register an account or log in."
            + "\nIf this problem still persists, contact the webmaster.");


        }
    });


 /*
    Checks to see if the response was not received or the response contained nothing.
    Tells the user they have no cars and directs them to add some.
 */



}




/**
 * When a user selects a car, saves the car to the database under the user's name
 * @param source Car to add
 */
function userSelectVehicle(source) {
    var carobj = currentCarList[source.id];

    console.log(source.id);
    console.log(carobj);
    //savedCarList.push(carobj); //No longer save as cookies
    source.innerHTML = "Car has been successfully added to list!";
    source.onclick = "#";
    source.disabled = true;
    clickAndDisable(source);
    edmMake = carobj.make;
    edmModel = carobj.model;
    edmStyle = carobj.carStyle;
    edmTrim = carobj.trim;
    edmYear = carobj.year;
    insertCarToDB();
    //saveCookies(); //No longer save cars in cookie
}

/**
 * Makes call to storeCars.php to insert a car into the database
 */
function insertCarToDB(){
    //Database call
    $.ajax({
        async: false,
        type: 'GET',
        url: '../php/storeCars.php',
        dataType: 'jsonP',
        contentType:'application/javascript',
        jsonp: 'callback',
        jsonpcallback: 'logResults',
        data: {make: edmMake,
            model: edmModel,
            trim: edmTrim,
            year: edmYear,
            style: edmStyle,
            username: username},
        success: function(response, textStatus){
            console.log(textStatus);
            console.log(JSON.stringify(response));
            //saveCookies(JSON.stringify(response));
            window.open("../pages/car-list.html", "_self");
        },
        error: function(jqXHR, textStatus, errorThrown) {
            alert("Error " + errorThrown + "\nPlease contact the webmaster with this error.");
        }
    })
}

function updateMileage(carID, mileage){
            var newMileage = $("#car" + carID).val();
            var currentDate = new Date();
            var currentMonth = currentDate.getMonth() + 1;
            var currentDay = currentDate.getDate();
            var currentYear = currentDate.getFullYear();

            if(!isNaN(newMileage)){
                if(newMileage > mileage ||
                    (newMileage < mileage && confirm("WARNING: Updated mileage is lower than current recorded mileage. Continue to update?"))) {
                    $.ajax({
                        async: false,
                        type: 'GET',
                        url: '../php/updateMileage.php',
                        dataType: 'jsonp',
                        contentType: 'application/javascript',
                        jsonp: 'callback',
                        jsonpcallback: 'logResults',
                        data: {
                            carID: carID,
                            mileage: newMileage,
                            monthMileage: currentMonth,
                            dayMileage: currentDay,
                            yearMileage: currentYear
                        },
                        success: function (response, textStatus) {
                            console.log(response);
                            alert("New mileage at " + response.mileage + " updated for current car on " +
                                response.monthMileage + "/" + response.dayMileage + "/" + response.yearMileage);
                            $("#mileage" + carID).text("Current Mileage: " + newMileage);
                        },
                        error: function (jqXHR, textStatus, errorThrown) {
                            alert("Error " + errorThrown);
                        }
                    })
                }
            }
            else{
                alert("New mileage must be a number!");
            }
}

function validateNumbericInput(input) {
    
}


//deprecated
function loadCookies() {
    savedCarList = JSON.parse(localStorage.getItem("savedCarList"));
}

//deprecated
function saveCookies() {
    localStorage.setItem("savedCarList", JSON.stringify(savedCarList));
}