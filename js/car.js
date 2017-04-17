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
function Car(make, model, year, carStyle, trim, mileage, monthMileage, dayMileage, yearMileage, inspectionMileage, inspectMonth, inspectDay,
             inspectYear, carID, alerts) {

    this.make = make;
    this.model = model;
    this.year = year;
    this.carStyle = carStyle;
    this.trim = trim;
    this.mileage = mileage;
    this.monthMileage = monthMileage;
    this.dayMileage = dayMileage;
    this.yearMileage = yearMileage;
    this.inspectionMileage = inspectionMileage;
    this.inspectMonth = inspectMonth;
    this.inspectDay = inspectDay;
    this.inspectYear = inspectYear;
    this.carID = carID;
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
        var finalStyle = this.removeDoors(trimmedStyle);
        var doors = this.formatDoorString(this.carStyle);
        var cyl = this.formatCylinderSting(this.carStyle);
        var liters = this.formatLitersString(this.carStyle);
        var transmission = this.formatTransmissionString(this.carStyle);
        return '<div class="col-lg-4 carSearchDiv">' +
            '<div class="panel panel-info">' +
            '<div class="panel-heading">' +
            this.year + " " + this.make + " " + this.model + " - " + finalStyle +
            '</div>' +
            '<div class="panel-body">' +
            '<p>' + 'Style: ' + '</p>' +
            (doors !== null ? '<ul><li>'+ doors + '</li>' : "") +
            (cyl !== null ? '<li>'+ cyl + '</li>' : "") +
            (liters !== null ? '<li>'+ liters + '</li>' : "") +
            (transmission !== null ? '<li>'+ transmission + '</li></ul>' : "") +
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
        var doorString = style.match(doorRegex);
        if(doorString !== null) {
            //doorString = doorString.replace( /^\D+/g, '');
            doorString = doorString[0].replace("dr", "");
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
        var cylString = style.match(cylRegex);
        if(cylString !== null) {
            //cylString = cylString.replace( /^\D+/g, '');
            cylString = cylString[0].replace("cyl", "");
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
        var literString = style.match(literRegex);
        if(literString !== null) {
            literString = literString[0].replace("L", "");
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
            transmission = style.match(transmissionRegex);
            if(transmission !== null) {
                transmission = transmission[0].replace("M", "");
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
        if(style.match(parenRegex) !== null) {
            var matches = style.match(parenRegex);
            return style.replace(matches[0], "");
        } else {
            return style;
        }
    };

    /**
     * Removes [0-9]dr string from style.
     * Ex: S 4dr Wagon AWD -> S Wagon AWD
     * @param style The string that contains all style information.
     */
    this.removeDoors = function(style) {
        var doorRegex = / *[0-9]dr/;
        if(style.match(doorRegex) !== null) {
            var matches = style.match(doorRegex);
            return style.replace(matches[0], "");
        } else {
            return style;
        }
    }
}
