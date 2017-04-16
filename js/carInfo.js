/**
 * Created by Mike on 4/15/2017.
 */
var savedCarList = [];

var userJSON = JSON.parse(localStorage.getItem('userJSON'));
var username = userJSON.username;

/**
 * Function below is used with car-info.html to insert the user's cars into a dropdown box
 */
function retrieveCars(){

    $.ajax({
        async: false,
        type: 'GET',
        url: ../php/getAllCars.php',
        dataType: 'jsonP',
        contentType:'application/javascript',
        jsonp: 'callback',
        jsonpcallback: 'logResults',
        data: {username: username},
        success: function(response, textStatus){
            console.log(textStatus);
            console.log(JSON.stringify(response));

            var curr, retMake, retModel, retYear, retStyle, retTrim, retMileage, retMileMonth, retMileDay, retMileYear,
                retInspectMile, retInspectMonth, retInspectDay, retInspectYear, retId;

            for (var i = 0; i < response.length; i++) {

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

                savedCarList.push(curr);

                $("#carList").append($('<option>', {
                    text: curr.make + " " + curr.model + " " + curr.year
                }));
            }
        },
        error: function(jqXHR, textStatus, errorThrown) {
            alert("Error " + errorThrown + "\nPlease contact the webmaster with this error.");
        }
    })
}

/**
 * carList is a dropdown box in car-info.html with access of all the user's current cars.
 */
$('#carList').change(function(){
    var currentIndex = ($('select[id="carList"]')[0].selectedIndex - 1);

    if(currentIndex >= 0){

        var currentCar = savedCarList[currentIndex];

        $("#make").val(currentCar.make);
        $("#model").val(currentCar.model);
        $("#year").val(currentCar.year);

        if(currentCar.mileage == 0){
            $("#mileageDate").html('Mileage : Not Yet Recorded:');
        }
        else {
            $("#mileageDate").html('Mileage : Last Updated ' + currentCar.monthMileage + '/' + currentCar.dayMileage + '/'
                + currentCar.yearMileage);
        }

        $("#mileage").val(currentCar.mileage);

        if(currentCar.inspectionMileage == 0){
            $("#lastOilChange").val("[Car Inspection Not Recorded]");
            $("#mileageLastOilChange").val("[Car Inspection Not Recorded]");
            $("#nextOilChange").val("[Car Inspection Not Recorded]");
            $("#mileageEstimate").val("[Car Inspection Not Recorded]");
        }
        else {
            $("#lastOilChange").val(currentCar.inspectMonth + '/' + currentCar.inspectDay + '/' + currentCar.inspectYear);

            $("#mileageLastOilChange").val(currentCar.inspectionMileage);

            //If the month is 8 or above, you have set the date to the respective month of next year
            if (currentCar.inspectMonth < 8) {
                var monthNextInspection = currentCar.inspectMonth + 5;
                $("#nextOilChange").val(monthNextInspection + '/' + currentCar.inspectDay + '/' + currentCar.inspectYear);
            }
            else {
                var monthNextInspection = currentCar.inspectMonth - 7;
                var yearNextInspection = currentCar.inspectYear + 1;
                $("#nextOilChange").val(monthNextInspection + '/' + currentCar.inspectDay + '/' + yearNextInspection);
            }

            var mileageEstimate = currentCar.inspectionMileage + 5000 - currentCar.mileage;
            $("#mileageEstimate").val(mileageEstimate);
        }

    }
    else{
        $("#make").val('[Make]');
        $("#model").val('[Model]');
        $("#year").val('[Year]');
        $("#mileageDate").val('Mileage : Last Updated [mm/dd/yyyy]');
        $("#mileage").val('[Mileage]');
        $("#lastOilChange").val("[Date Of Last Inspection]");
        $("#mileageLastOilChange").val("[Mileage Last Inspection]");
        $("#nextOilChange").val("[Recommended Date Next Inspection]");
        $("#mileageEstimate").val("[Estimated Miles to Next Inspection]");
    }
});

/**
 * For use with car-info.html
 */
function carInfoUpdateMileage(){
    var currentIndex = ($('select[id="carList"]')[0].selectedIndex - 1);
    if(currentIndex >= 0) {
        var currentCar = savedCarList[currentIndex];
        var currentDate = new Date();
        var currentMonth = currentDate.getMonth() + 1;
        var currentDay = currentDate.getDate();
        var currentYear = currentDate.getFullYear();

        var carID = currentCar.carID;

        var newMileage = $("#newMileage").val();
        var mileage = currentCar.mileage;

        if (!isNaN(newMileage)) {
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
                        $("#mileage").val(newMileage);
                    },
                    error: function (jqXHR, textStatus, errorThrown) {
                        alert("Error " + errorThrown);
                    }
                })
            }
        }
        else {
            alert("New mileage must be a number!");
        }
    }
    else{
        alert("You must select a car to update mileage!");
    }
}

$("#updateInspection").on('click', function(){

    var currentIndex = ($('select[id="carList"]')[0].selectedIndex - 1);
    var currentCar = savedCarList[currentIndex];
    var carID = currentCar.carID;

    //Retrieves Inspection Mileage and date from the respective fields in car-info.html
    var newMileage = $("#mileageNewInspection").val();

    var inspectionMonth = $('select[id="selectMonth"]')[0].selectedIndex + 1;
    var inspectionDay = $("#inspectionDay").val();
    var inspectionYear = $("#inspectionYear").val();

    if(!isNaN(newMileage)){
        if(isValidDate(inspectionMonth, inspectionDay, inspectionYear)){
            if(newMileage > currentCar.inspectionMileage || newMileage < currentCar.inspectionMileage &&
                confirm("WARNING: The current mileage is lower than the mileage recorded at the last inspection. Continue?")) {

                $.ajax({
                    async: false,
                    type: 'GET',
                    url: '../php/updateInspection.php',
                    dataType: 'jsonp',
                    contentType: 'application/javascript',
                    jsonp: 'callback',
                    jsonpcallback: 'logResults',
                    data: {
                        carID: carID,
                        inspectionMileage: newMileage,
                        monthInspection: inspectionMonth,
                        dayInspection: inspectionDay,
                        yearInspection: inspectionYear
                    },
                    success: function (response, textStatus) {
                        console.log(response);
                        confirm("Car last inspected at " + response.mileage + " miles on " +
                            response.monthMileage + "/" + response.dayMileage + "/" + response.yearMileage);

                        location.reload();

                    },
                    error: function (jqXHR, textStatus, errorThrown) {
                        alert("Error " + errorThrown);
                    }
                })
            }
        }
    }
    else{
        alert("Mileage, must be a number!");
    }
});

function isValidDate(inspectionMonth, inspectionDay, inspectionYear){
    var date = new Date();
    var currentMonth = date.getMonth() + 1;
    var currentDay = date.getDate();
    var currentYear = date.getFullYear();

    if(isNaN(inspectionDay) || isNaN(inspectionYear)){
        alert("The day and year fields must be numbers!");
        return false;
    }
    else if(inspectionMonth > currentMonth && inspectionYear >= currentYear){
        alert('The entered date must be current or previous date!');
        return false;
    }
    else if(inspectionDay > currentDay && inspectionMonth >= currentMonth && inspectionYear >= currentYear){
        alert('The entered date must be current or previous date!');
        return false;
    }
    else if(inspectionYear > currentYear){
        alert('The entered date must be current or previous date!');
        return false
    }
    else{
        return true;
    }
}