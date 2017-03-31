var currentCarList = [];
var savedCarList = [];

var userJSON = JSON.parse(localStorage.getItem('userJSON'));
var username = userJSON.username;
var userID, edmMake, edmModel, edmYear, edmStyle, edmTrim;

/**
 * @author Matthew Gimbut, Michael Crinite
 */
function searchCarInfo() {
    currentCarList = [];

    var make = $("#makeInput").val();
    var model = $("#modelInput").val();
    var year = $("#yearInput").val();
    var carInfo = $("#carInfo");

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
                    make.capitalize(),
                    model.capitalize(),
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

        fail:function(data) {
            carInfo.text("Search failed!");
        }
    });
}

function addVehicle() {
    window.location.href = "../pages/car-search.html";
}

String.prototype.capitalize = function() {
    return this.toLowerCase().charAt(0).toUpperCase() + this.slice(1);
};

//deprecated
function loadCookies() {
    savedCarList = JSON.parse(localStorage.getItem("savedCarList"));
}

//deprecated
function saveCookies() {
    localStorage.setItem("savedCarList", JSON.stringify(savedCarList));
}

function getAddedCarPreview(car) {
    return '<br><div class="col-lg-4 carSearchDiv">' +
        '<div class="panel panel-info">' +
        '<div class="panel-heading">' +
        car.year + " " + car.make + " " + car.model +
        '</div>' +
        '<div class="panel-body">' +
        '<p>' + 'Style: ' + car.carStyle + '</p>' +
        '<div class="panel-body">'+
        '<input id="car' + car.carId + '">' +
        '<button onclick="updateMileage(' + car.carId + ')">Update Car Mileage</button>' +
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
        url: 'http://localhost/getAllCars.php',
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
                // Not the best way to avoid exceptions stopping the program
                currentRow = document.createElement("div");
            }
            var curr, retId, retMake, retModel, retYear, retStyle, retTrim;

            for (var i = 0; i < response.length; i++) {
                div = document.createElement("div");

                //Generate a car object for each response to user below
                retId = response[i].carID;
                retMake = response[i].make;
                retModel = response[i].model;
                retYear = response[i].year;
                retStyle = response[i].style;
                retTrim = response[i].trim;

                curr = new Car(
                    retId,
                    retMake,
                    retModel,
                    retYear,
                    retStyle,
                    retTrim
                );

                savedCarList.push(curr);

                div.className = "row";
                div.innerHTML = getAddedCarPreview(curr);
                currentRow.appendChild(div);
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
    // TODO Add selected vehicle to user's car list
    var carobj = currentCarList[source.id];

    console.log(source.id);
    console.log(carobj);
    //savedCarList.push(carobj); //No longer save as cookies
    source.innerHTML = "Car has been successfully added to list!";
    source.onclick = "#";
    source.disabled = true;
    edmMake = carobj.make;
    edmModel = carobj.model
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
        url: 'http://localhost/storeCars.php',
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

function loadHomePage() {
    //loadCookies(); //no longer save as cookies
    //displayVehicles();
    console.log("list contains:\n" + savedCarList);
    document.getElementById("numCars").innerHTML = savedCarList.length;
    var container = document.getElementById("carList");
    if (savedCarList.length === 0) {
        var message = document.createElement("div");
        message.innerHTML = "You do not currently have any cars linked to your account. Please click Cars -> Add Cars to begin.";
        container.appendChild(message);
    } else {
        for (var i = 0; i < savedCarList.length; i++) {
            var div = document.createElement("div");
            div.className = "row";
            div.style.width = "100%";
            div.innerHTML = getAddedCarPreview(savedCarList[i]);
            container.appendChild(div);
        }
    }
    //Set username
    document.getElementById("welcome-message").innerHTML = "Welcome " + username + "!";
}

function updateMileage(carID){
    console.log(carID);
}

function Car(carId, make, model, year, carStyle, trim) {
    this.carId = carId;
    this.make = make;
    this.model = model;
    this.year = year;
    this.carStyle = carStyle;
    this.trim = trim;
    this.alerts = [];

    /**
     * Pulls up image for car
     * @returns {null}
     */
    this.getCarImage = function() {
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
}