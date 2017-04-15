/**
 * Created by Andrew Genova on 4/13/2017.
 */

$(document).ready(function(){
    $("#saveChanges").on("click", function(){
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
                    alert("Profile Updated");
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