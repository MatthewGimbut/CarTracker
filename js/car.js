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
 * @param monthMileage month that the last mileage was entered
 * @param dayMileage day that the last mileage was entered
 * @param yearMileage year that the last mileage was entered
 * @param alerts An array of Alert objects that contain all important information which the user needs to see.
 * @constructor
 */
function Car(make, model, year, carStyle, trim, mileage, monthMileage, dayMileage, yearMileage, carID, alerts) {
    this.make = make;
    this.model = model;
    this.year = year;
    this.carStyle = carStyle;
    this.trim = trim;
    this.mileage = mileage;
    this.monthMileage = monthMileage;
    this.dayMileage = dayMileage;
    this.yearMileage = yearMileage;
    this.carID = carID;
    this.alerts = [];

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
}
