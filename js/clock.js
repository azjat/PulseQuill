var hour = document.getElementById("hour");
var minute = document.getElementById("minute");
var seconds = document.getElementById("seconds");

var set_clock = setInterval(
    function clock(){
        var date_now = new Date();
        var hr = date_now.getHours();
        var min = date_now.getMinutes();
        var sec = date_now.getSeconds();

        var calc_hr = (hr * 30) + (min / 2);
        var calc_min =    (min * 6)  ;
        var calc_sec = sec * 6 ;

        hour.style.transform = "rotate(" + calc_hr + "deg)";
        minute.style.transform = "rotate(" + calc_min + "deg)";
        seconds.style.transform = "rotate(" + calc_sec + "deg)";
    }, 1000);

// const hour = document.getElementById("hour");
// const minute = document.getElementById("minute");
// const seconds = document.getElementById("seconds");

// // Retrieve the timezone offset from local storage


// // Function to update the clock
// function updateClock() {

//     const timezoneOffset = localStorage.getItem("timezone");
//     let date_now;
    
//     if (timezoneOffset !== null) {
//         // If a timezone offset is available, use it to calculate the time
//         const localTime = new Date();
//         const offsetTime = new Date(localTime.getTime() + parseInt(timezoneOffset) * 1000);
//         date_now = offsetTime;
//     } else {
//         // If no timezone offset is available, use the current time
//         date_now = new Date();
//     }

//     const hr = date_now.getHours();
//     const min = date_now.getMinutes();
//     const sec = date_now.getSeconds();

//     const calc_hr = (hr * 30) + (min / 2);
//     const calc_min = (min * 6);
//     const calc_sec = sec * 6;

//     hour.style.transform = "rotate(" + calc_hr + "deg)";
//     minute.style.transform = "rotate(" + calc_min + "deg)";
//     seconds.style.transform = "rotate(" + calc_sec + "deg)";
// }

// const set_clock = setInterval(updateClock, 1000);

// // Initial clock update
// updateClock();
