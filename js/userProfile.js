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
}

function display(){
    loadCookies();
    $("#nameTitle").html("User: " + userJSON.firstName + " " + userJSON.lastName);
    $("#username").html(userJSON.username);
    $("#email").html(userJSON.email);
    $("#DOB").html(userJSON.birthMonth + "/" + userJSON.birthDay + "/" + userJSON.birthYear)

    var currentDate = new Date();

    if(currentDate.getDay() < parseInt(userJSON.birthDay) || currentDate.getMonth() < parseInt(userJSON.birthMonth)){
        $("#Age").html(currentDate.getFullYear() - parseInt(userJSON.birthYear) - 1);
    }
    else{
        $("#Age").html(currentDate.getFullYear() - parseInt(userJSON.birthYear));
    }
    }