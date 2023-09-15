const apiKey = "dc7ee58adb3effd37322f78b3c370c66";
const cityInput = document.querySelector(".city-input");
const fetchWeatherButton = document.querySelector(".fetch-weather");
const weatherInfo = document.querySelector(".weather-info");

fetchWeatherButton.addEventListener("click", fetchWeather);
cityInput.addEventListener('keydown', function (event) {
    if (event.key === 'Enter') {
        fetchWeather();
    }
});

function fetchWeather() {
    let cityName;
    if (localStorage.getItem("PrefferedCityName") && cityInput.value === "") {
        cityName = localStorage.getItem("PrefferedCityName");
    } else {
        cityName = cityInput.value;
    }
    cityInput.value = "";
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric`;
    console.log(apiUrl);
    fetch(apiUrl)
        .then((response) => response.json())
        .catch(error => {
            console.log('Error fetching weather data:', error);
        })
        .then(data => {
            console.log(data);

            const rawTemperature = data.main.temp;
            const temperature = Math.round(rawTemperature * 2) / 2;

            const description = data.weather[0].description;
            const descriptionCapitalized = description.charAt(0).toUpperCase() + description.slice(1);

            const cityNameCorrect = data.name;
            localStorage.setItem("PrefferedCityName", cityNameCorrect);

            const timezone = data.timezone;
            localStorage.setItem("timezone", timezone);

            const icon = data.weather[0].icon;
            console.log(icon);
            
            weatherInfo.innerHTML = `
            <div class="weather-desc-div"> 
                <p class="weather-city">${cityNameCorrect}</p>
                <p class="weather-desc">${temperature}°C, <br><span class="desc-span">${descriptionCapitalized}</span></p>
            </div>
            <div class="weather-icon-div">
                <img class="weather-icon" src="/icons/weather/${icon}.png" alt="Can't get the icon">
            </div>
        `;
        });
}
if (localStorage.getItem("PrefferedCityName")) {
    fetchWeather();
}
