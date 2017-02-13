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

    /**
     * Pulls up image for car
     * @returns {null}
     */
    this.getCarImage = function() {
        return null;
    }

}