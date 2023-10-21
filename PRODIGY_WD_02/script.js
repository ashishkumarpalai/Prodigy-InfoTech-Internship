let hours = 0;
let minutes = 0;
let seconds = 0;
let miliseconds = 0;

let displayMilisec = miliseconds;
let displaySec = seconds;
let displayMins = minutes;
let displayHours = hours;

let interval = null;

let status = "stopped";

let lapNow = null;

function start() {
    miliseconds++;



    if (miliseconds / 100 === 1) {
        seconds++;
        miliseconds = 0;
        if (seconds / 60 === 1) {
            minutes++;
            seconds = 0;
            if (minutes / 60 === 1) {
                hours++;
                minutes = 0;
            }
        }
    }
    if (miliseconds < 10) {
        displayMilisec = "0" + miliseconds;
    }
    else {
        displayMilisec = miliseconds;
    }

    if (seconds < 10) {
        displaySec = "0" + seconds;
    }
    else {
        displaySec = seconds;
    }

    if (minutes < 10) {
        displayMins = "0" + minutes;
    }
    else {
        displayMins = minutes;
    }

    if (hours < 10) {
        displayHours = "0" + hours;
    }
    else {
        displayHours = hours;
    }


    document.getElementById("timerMilisec").innerHTML = displayMilisec;
    document.getElementById("timerSec").innerHTML = displaySec;
    document.getElementById("timerMins").innerHTML = displayMins;
    document.getElementById("timerHrs").innerHTML = displayHours;

}

function startStop() {
    if (status === "stopped") {
        interval = window.setInterval(start, 10);
        document.getElementById('startBtn').innerHTML = "Stop";
        status = "started";
    }
    else {
        window.clearInterval(interval);
        document.getElementById('startBtn').innerHTML = "Start";
        status = "stopped";
    }
}

function reset() {
    window.clearInterval(interval);
    miliseconds = 0;
    seconds = 0;
    minutes = 0;
    hours = 0;
    displayMilisec = "00";
    displaySec = "00";
    displayMins = "00";
    displayHours = "00";
    document.getElementById("timerMilisec").innerHTML = "00";
    document.getElementById("timerSec").innerHTML = "00";
    document.getElementById("timerMins").innerHTML = "00";
    document.getElementById("timerHrs").innerHTML = "00";
    document.getElementById('startBtn').innerHTML = "Start";
    status = "stopped";
    document.getElementById('lapRecord').innerHTML = "";
}

function lap() {

    lapNow = displayHours + " : " + displayMins + " : " + displaySec + " : " + displayMilisec;

    document.getElementById('lapRecord').innerHTML = document.getElementById('lapRecord').innerHTML + "<p>" + "*  " + lapNow + "</p>";
}
