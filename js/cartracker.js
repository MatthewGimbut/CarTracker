var currentCarList = [];
var savedCarList = [];

/**
 * Created by Matthew on 2/7/2017.
 */
function searchCarInfo() {
    currentCarList = [];
    console.log("This should probably do" +
        " something in the future");
    //TODO Do something

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
        if(make == "") {
            errorString += "Please enter a make.\n";
        }
        if(model == "") {
            errorString += "Please enter a model.\n";
        }
        if(year == "") {
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

function displayVehicles() {
    var savedCarList = JSON.parse(localStorage.getItem("savedCarList"));
    console.log(savedCarList);
    var currentRow = document.getElementById("car-list-container");
    for (var i = 0; i < savedCarList.length; i++) {
        var div = document.createElement("div");
        div.className = "row";
        var car = savedCarList[i];

        div.innerHTML = '<br><div class="col-lg-4 carSearchDiv">' +
            '<div class="panel panel-info">' +
            '<div class="panel-heading">' +
            car.year + " " + car.make + " " + car.model +
            '</div>' +
            '<div class="panel-body">' +
            '<p>' + 'Style: ' + car.carStyle + '</p>' +
            '</div>' +
            '<div class="panel-footer">' +
            'Click <a id="carClick" href="#" onclick="#">here</a> to view/edit maintenance details.' +
            '</div>' +
            '</div>' +
            '</div>';

        currentRow.appendChild(div);
    }
}

function userSelectVehicle(source) {
    // TODO Add selected vehicle to user's car list
    console.log(source.id);
    console.log(currentCarList[source.id]);
    savedCarList.push(currentCarList[source.id]);
    source.innerHTML = "Car has been successfully added to list!";
    source.onclick = "#";
    source.disabled = true;
    localStorage.setItem("savedCarList", JSON.stringify(savedCarList));
}

function Car(make, model, year, carStyle, trim) {
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
            if(this.alerts[i].priority == priority) {
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