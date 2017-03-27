/**
 * Retrieves the mileage of cars THAT ARE CLOSE TO DUE FOR SERVICE
 *
 * Do not use this to retrieve all of a user's vehicles, but it can be used as a template for that
 *
 * @author Michael Crinite
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
                url: 'http://localhost/updateMileage.php',
                dataType: 'jsonp',
                contentType:'application/javascript',
                jsonp: 'callback',
                jsonpcallback: 'logResults',
                data: {mileage: newMileage,
                    monthMileage: currentMonth,
                    dayMileage: currentDay,
                    yearMileage: currentYear},
                success: function(response, textStatus){
                    console.log(response);
                    alert("New mileage at " + response.mileage + " updated for current car on " +
                        response.monthMileage + "/" + response.dayMileage + "/" + response.yearMileage);
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
