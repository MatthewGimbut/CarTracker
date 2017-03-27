/**
 * Created by Mike on 3/26/2017.
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
