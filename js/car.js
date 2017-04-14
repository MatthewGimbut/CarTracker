/**
 * Defines the Car objects to store car info.
 * @author Matthew Gimbut
 */

/**
 * Constructor for Car objects
 * @param make The make of the car
 * @param model The model of the car
 * @param year The year the car was manufactured
 * @param carStyle The style of the car (ex. 2 door or 4 door, engine size, etc.)
 * @param trim The trim of the car (information already contained in carStyle, maybe unnecessary?)
 * @param mileage The current mileage of the car
 * @param alerts An array of Alert objects that contain all important information which the user needs to see.
 * @constructor
 */
function Car(make, model, year, carStyle, trim, mileage, alerts, carID) {
    this.make = make;
    this.model = model;
    this.year = year;
    this.carStyle = carStyle;
    this.trim = trim;
    this.mileage = mileage;
    this.alerts = [];
    this.carID = carID;

    /**
     * Pulls up image for car
     * @returns {null}
     */
    this.getCarImage = function() {
        return null;
    };

    /**
     * Gets a list of all alerts of a certain priority
     * @param priority The desired priority
     * @returns An array containing all of the appropriate Alert objects
     */
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

    /**
     * Generates a small preview panel when adding a car to the search results.
     * Slightly different from the full car display panel of a car already added.
     * @returns {string}
     */
    this.getFormattedSearchHTML = function() {
        return '<div class="col-lg-4 carSearchDiv">' +
            '<div class="panel panel-info">' +
            '<div class="panel-heading">' +
            this.year + " " + this.make + " " + this.model +
            '</div>' +
            '<div class="panel-body">' +
            '<p>' + 'Style: ' + this.carStyle + '</p>' +
            '</div>' +
            '<div class="panel-footer">' +
            '<a id="carClick" href="#" onclick="userSelectVehicle(this)">Click here to add to car list.</a>' +
            '</div>' +
            '</div>' +
            '</div>';
    };

    /**
     * Small preview widget for Car objects.
     * Will display basic information about the car such as the make, model, year, and details.
     * Allows the user to select a car and view more details quickly.
     * @param carID Car's carID field in the database
     * @returns {string}
     */
    this.getFormattedCarHTML = function() {
        return '<br><div class="col-lg-4 carSearchDiv">' +
            '<div class="panel panel-info">' +
            '<div class="panel-heading">' +
            this.year + " " + this.make + " " + this.model +
            '<span class="pull-right">' +
            '<a data-original-title="Remove this car" data-toggle="tooltip" type="button"' +
            ' class="btn btn-sm btn-danger" onclick="removeCar(' + this.carID + ');">' +
            '<div><i class="glyphicon glyphicon-remove"></i></a></span></div>' +
            '</div>' +
            '<div class="panel-body">' +
            '<p>' + 'Style: ' + this.carStyle + '</p>' +
            '<div class="panel-body">'+
            '<p id="mileage' + this.carID + '">Current Mileage: ' + this.mileage + '</p>' +
            '<input id="car' + this.carID + '">' +
            '<button onclick="updateMileage(' + this.carID + ',' + this.mileage + ')">Update Car Mileage</button>' +
            '</div>' +
            '</div>' +
            '<div class="panel-footer">' +
            'Click <a id="carClick" href="#" onclick="#">here</a> to view/edit maintenance details.' +
            '</div>' +
            '</div>' +
            '</div>';
    };
}
