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

    if(make !== "" && model !== "" && year !== "") {
        var url = "https://api.edmunds.com/api/vehicle/v2/" +
            make + "/" +
            (model !== null ? (model + "/"): "") +
            (year !== null ? year: "") +
            "?fmt=json&api_key=2873ck8xzdvuhyh4trmr7axu";
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
        carInfo.text(errorString);
    }

    
    $.ajax({
        url:(url),
        dataType:'json',
        type: 'get',
        //data: yourForm.serialize(),
        success:function(response){
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
                div.innerHTML =
                    '<div class="col-lg-4 carSearchDiv">' +
                    '<div class="panel panel-info">' +
                    '<div class="panel-heading">' +
                    car.year + " " + car.make + " " + car.model +
                    '</div>' +
                    '<div class="panel-body">' +
                    '<p>' + 'Style: ' + car.carStyle + '</p>' +
                    '</div>' +
                    '<div class="panel-footer">' +
                    '<a id="carClick" href="#" onclick="userSelectVehicle(this)">Click here to add to car list.</a>' +
                    '</div>' +
                    '</div>' +
                    '</div>';
                currentRow.appendChild(div);
                var footer = document.getElementById("carClick");
                footer.id = i.toString();
                //currentRow.insertAdjacentHTML('beforeend', carDiv);
            }
        },

        error: function(data) {
            carInfo.text("Search failed!");
        }
    });
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

//deprecated
function loadCookies() {
    savedCarList = JSON.parse(localStorage.getItem("savedCarList"));
}

//deprecated
function saveCookies() {
    localStorage.setItem("savedCarList", JSON.stringify(savedCarList));
}


/**
 * Small preview widget for Car objects.
 * Will display basic information about the car such as the make, model, year, and details.
 * Allows the user to select a car and view more details quickly.
 * @param car Car object to be displayed on the screen.
 * @returns {string}
 */
function getAddedCarPreview(car, carID) {
    return '<br><div class="col-lg-4 carSearchDiv">' +
        '<div class="panel panel-info">' +
        '<div class="panel-heading">' +
        car.year + " " + car.make + " " + car.model +
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
}

/**
 * Queries db for vehicles belonging to userID, displays them on car-list.html
 */
function displayVehicles() {
    //loadCookies();
    //console.log(savedCarList);

    //Database call
    $.ajax({
        async: false,
        type: 'GET',
        url: '../php/getAllCars.php',
        dataType: 'jsonP',
        contentType:'application/javascript',
        jsonp: 'callback',
        jsonpcallback: 'logResults',
        data: {username: username},
        success: function(response, textStatus){
            console.log(textStatus);
            console.log(JSON.stringify(response));
            //saveCookies(JSON.stringify(response));
            //window.open("../pages/car-list.html", "_self");

            var div;
            var currentRow = document.getElementById("car-list-container");
            if(currentRow === null){
                currentRow = document.createElement("div");
            }
            var curr, retId, retMake, retModel, retYear, retStyle, retTrim, retMileage;

            var container = document.getElementById("carList");

            for (var i = 0; i < response.length; i++) {
                div = document.createElement("div");

                //Generate a car object for each response to user below
                retId = response[i].carID;
                retMake = response[i].make;
                retModel = response[i].model;
                retYear = response[i].year;
                retStyle = response[i].style;
                retTrim = response[i].trim;
                retMileage = response[i].mileage;

                curr = new Car(
                    retMake,
                    retModel,
                    retYear,
                    retStyle,
                    retTrim,
                    retMileage
                );

                savedCarList.push(curr);

                div.className = "row";
                div.innerHTML = getAddedCarPreview(curr, retId);
                currentRow.appendChild(div);

                //Set homepage must be done here because
                //async calls do things at the same time
                //so cars won't be loaded before it sets up
                if (container !== null) {
                    // Set home page
                    if (i === 0) {
                        container.removeChild(contain.children[0]); // Remove div saying there's no cars
                    }

                    var hpCar = document.createElement("div");
                    hpCar.className = "row";
                    hpCar.style.width = "100%";
                    hpCar.innerHTML = getAddedCarPreview(curr);
                    container.appendChild(hpCar);

                    document.getElementById("numCars").innerHTML = (i + 1);

                }
            }
        },
        error: function(jqXHR, textStatus, errorThrown) {
            alert("Error " + errorThrown + "\nPlease contact the webmaster with this error.");
        }
    })
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

/**
 * Called when the homepage is loaded, Displays the cars (if any)
 * the user has on the screen.
 */
function loadHomePage() {
    //console.log("list contains:\n" + savedCarList);
    //document.getElementById("numCars").innerHTML = savedCarList.length.toString(); //Added toString so WebStorm wouldn't yell at me for inconsistent types
    // var container = document.getElementById("carList");
    // if (savedCarList.length !== 0) {
    //     for (var i = 0; i < savedCarList.length; i++) {
    //         var div = document.createElement("div");
    //         div.className = "row";
    //         div.style.width = "100%";
    //         div.innerHTML = getAddedCarPreview(savedCarList[i]);
    //         container.appendChild(div);
    //     }
    // }
    //Set username
    document.getElementById("welcome-message").innerHTML = "Welcome " + username + "!";
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

/*function Car(make, model, year, carStyle, trim, mileage) {

    this.make = make;
    this.model = model;
    this.year = year;
    this.carStyle = carStyle;
    this.trim = trim;
    this.mileage = mileage;
    this.alerts = [];

    /**
     * Pulls up image for car
     * @returns {null}
     */
   /* this.getCarImage = function() {
        return null;
    };

    this.getPriorityAlerts = function(priority) {
        var priorityAlerts = null;
        var numAlerts = 0;
        for(var i = 0; i < this.alerts.length; i++) {
            if(this.alerts[i].priority === priority) {
                priorityAlerts[numAlerts] = this.alerts[i];
                numAlerts++;
            }
        }
        return priorityAlerts;
    };
}

function Alert(priority, message) {
    this.priority = priority;
    this.message = message;
}*/
