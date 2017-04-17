/**
 *
 * @author Michael Moscariello
 * This file is deprecated; the contents of this file were moved to cartracker.js
 */
$(document).ready(function(){
    $("#update").on("click", function(){
        var newMileage = $("#mileage").val();
        var currentDate = new Date();
        var currentMonth = currentDate.getMonth() + 1;
        var currentDay = currentDate.getDate();
        var currentYear = currentDate.getFullYear();

        if(!isNaN(newMileage)){
            $.ajax({
                async: false,
                type: 'GET',
                url: '../php/updateMileage.php',
                dataType: 'jsonp',
                contentType:'application/javascript',
                jsonp: 'callback',
                jsonpcallback: 'logResults',
                data: {mileage: newMileage,
                    monthMileage: currentMonth,
                    dayMileage: currentDay,
                    yearMileage: currentYear},
                success: function(response, textStatus){
                    alert("New mileage at " + response.mileage + " updated for current car on " +
                        response.monthMileage + "/" + response.dayMileage + "/" + response.yearMileage);
                    location.reload(true); //Force server reload
                },
                error: function(jqXHR, textStatus, errorThrown) {
                    alert("Error " + errorThrown);
                }
            })
        }
        else{
            alert("New mileage must be a number!");
        }
    })
});
