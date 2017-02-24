/**
 * Created by Matthew on 2/7/2017.
 */
function searchCarInfo() {
    console.log("This should probably do" +
        " something in the future");
    //TODO Do something

    var make = $("#makeInput").val();
    var model = $("#modelInput").val();
    var year = $("#yearInput").val();

    var url = "https://api.edmunds.com/api/vehicle/v2/" +
        (make !== null ? (make + "/"): "") +
        "models?fmt=json&api_key=2873ck8xzdvuhyh4trmr7axu";

    console.log(url);

    $.ajax({
        url:(url),
        dataType:'json',
        type: 'post',
        //data: yourForm.serialize(),
        success:function(response){
            console.log(response);
            for (var i = 0; i < response.models.length; i++) {
                var currentRow = document.createElement("div");
                currentRow.className = "row";
                var currentCar = document.createElement("p");
                currentCar.innerHTML = response.models[i].id;
                currentRow.append(currentCar);
                $("#carInfo").append(currentRow);
            }
        }
    });

    var car = new Car(make, model, year);

    console.log(car.make);
    console.log(car.model);
    console.log(car.year);
}

function addVehicle() {
    window.location.href = "../pages/car-search.html";
}

function Car(make, model, year, carStyle) {
    this.make = make;
    this.model = model;
    this.year = year;
    this.carStyle = carStyle;
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