/**
 * Created by Mike on 3/23/2017.
 */
var userJSON;

window.onload = getCurrentDate();
window.onload = display();

function getCurrentDate() {

    var currentdate = new Date();
    var dateTime = (currentdate.getMonth() + 1) + "/"
        + currentdate.getDate() + "/"
        + currentdate.getFullYear() + " @ "
        + currentdate.getHours() + ":"
        + currentdate.getMinutes() + ":"
        + currentdate.getSeconds();

    document.getElementById('currentDate').innerHTML = dateTime;
}


function User(firstName, lastName, username, password, email, age, bMonth, bDay, bYear){
    this.firstName = firstName;
    this.lastName = lastName;
    this.username = username;
    this.password = password;
    this.email = email;
    this.age = age;
    this.bMonth = bMonth;
    this.bDay = bDay;
    this.bYear = bYear;
}

function loadCookies() {
    userJSON = JSON.parse(localStorage.getItem('userJSON'));
    console.log("Stuff: " + userJSON.firstName);
}

function display(){
    loadCookies();
    $("#nameTitle").html("User: " + userJSON.firstName + " " + userJSON.lastName);
    $("#username").html(userJSON.username);
    $("#email").html(userJSON.email);
    $("#DOB").html(userJSON.bMonth + "/" + userJSON.bDay + "/" + userJSON.bYear)

    var currentDate = new Date();

    if(currentDate.getDay() < userJSON.bDay || currentDate.getMonth() < userJSON.bMonth){
        $("#Age").html(currentDate.getFullYear() - userJSON.bYear - 1);
    }
    else{
        $("#Age").html(currentDate.getFullYear() - userJSON.bYear);
    }
    }