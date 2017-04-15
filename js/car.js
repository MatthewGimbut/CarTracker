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
        var trimmedStyle = this.trimParenthesis(this.carStyle);
        var doors = this.formatDoorString(this.carStyle);
        var cyl = this.formatCylinderSting(this.carStyle);
        var liters = this.formatLitersString(this.carStyle);
        var transmission = this.formatTransmissionString(this.carStyle);
        return '<div class="col-lg-4 carSearchDiv">' +
            '<div class="panel panel-info">' +
            '<div class="panel-heading">' +
            this.year + " " + this.make + " " + this.model + " - " + trimmedStyle +
            '</div>' +
            '<div class="panel-body">' +
            '<p>' + 'Style: ' + '</p>' +
            '<ul><li>'+ doors + '</li>' +
            '<li>'+ cyl + '</li>' +
            '<li>'+ liters + '</li>' +
            '<li>'+ transmission + '</li></ul>' +
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
     * @returns {string}
     */
    this.getFormattedCarHTML = function() {
        var trimmedStyle = this.trimParenthesis(this.carStyle);
        var doors = this.formatDoorString(this.carStyle);
        var cyl = this.formatCylinderSting(this.carStyle);
        var liters = this.formatLitersString(this.carStyle);
        var transmission = this.formatTransmissionString(this.carStyle);
        return '<br><div class="col-lg-4 carSearchDiv">' +
            '<div class="panel panel-info">' +
            '<div class="panel-heading">' +
            this.year + " " + this.make + " " + this.model + " - " + trimmedStyle +
            '<span class="pull-right">' +
            '<a data-original-title="Remove this car" data-toggle="tooltip" type="button"' +
            ' class="btn btn-sm btn-danger" onclick="removeCar(' + this.carID + ');">' +
            '<div><i class="glyphicon glyphicon-remove"></i></a></span></div>' +
            '</div>' +
            '<div class="panel-body">' +
            '<p>' + 'Style: ' + '</p>' +
            '<ul><li>'+ doors + '</li>' +
            '<li>'+ cyl + '</li>' +
            '<li>'+ liters + '</li>' +
            '<li>'+ transmission + '</li></ul>' +
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

    /**
     * Formats the style string to be more readable.
     * Edits the formatting of the number of doors.
     * @param style The string that contains all style information.
     * @return {string}
     */
    this.formatDoorString = function(style) {
        //Matches any digit 0-9 followed by 'dr'.
        var doorRegex = /[0-9]dr/;
        //Removes the 'dr' letters for only the number.
        var doorString = style.match(doorRegex)[0];
        console.log(doorString);
        if(doorString) {
            //doorString = doorString.replace( /^\D+/g, '');
            doorString = doorString.replace("dr", "");
            style.replace(style.match(doorRegex)[0], "");
            //Appends the full word 'doors' to the end.
            doorString += " doors";
        }
        return doorString;
    };

    /**
     * Formats the style string to be more readable.
     * Edits the formatting of the number of cylinders.
     * @param style The string that contains all style information.
     * @return {string}
     */
    this.formatCylinderSting = function(style) {
        //Matches any digit 0-9 followed by 'cyl'.
        var cylRegex = /[0-9]+cyl/;
        //Removes the 'cyl' letters for only the number.
        var cylString = style.match(cylRegex)[0];
        if(cylString) {
            //cylString = cylString.replace( /^\D+/g, '');
            cylString = cylString.replace("cyl", "");
            style.replace(style.match(cylRegex)[0], "");
            //Appends the full word 'cylinders' to the end.
            cylString += " cylinders";
        }
        return cylString;
    };

    /**
     * Formats the style string to be more readable.
     * Edits the formatting of the number of liters.
     * @param style The string that contains all style information.
     * @return {string}
     */
    this.formatLitersString = function(style) {
        //Matches any digit 0-9 followed by an optional '.' and optional 0-9 digit, followed by 'L'.
        var literRegex = /[0-9]\.?[0-9]?L/;
        var literString = style.match(literRegex)[0];
        if(literString) {
            literString = literString.replace("L", "");
            style.replace(style.match(literRegex)[0], "");
            literString += " liters";
        }
        return literString;
    };

    /**
     * Formats the style string to be more readable.
     * Edits the formatting of the type of transmission.
     * @param style The string that contains all style information.
     * @return {string}
     */
    this.formatTransmissionString = function(style) {
        var transmission = "No transmission information present.";
         //'Truthy' value to see if string contains 'CVT' for automatic transmission
        if(~style.indexOf("CVT")) {
            transmission = "Automatic transmission";
        } else {
            var transmissionRegex = /[1-9]M/;
            transmission = style.match(transmissionRegex)[0];
            if(transmission) {
                transmission = transmission.replace("M", "");
                style.replace(style.match(transmissionRegex)[0], "");
                transmission += " speed manual transmission"
            }
        }
        return transmission;
    };

    /**
     * Removes the parenthesis from the end of the style string.
     * We no longer need them after extracting information to format better.
     * @param style The string that contains all style information.
     * @return {string}
     */
    this.trimParenthesis = function(style) {
        var parenRegex = /\s*\(.*\)\s*/;
        return style.replace(style.match(parenRegex)[0], "");
    };
}
