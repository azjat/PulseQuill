const apiKey = "dc7ee58adb3effd37322f78b3c370c66";
const cityInput = document.querySelector(".city-input");
const fetchWeatherButton = document.querySelector(".fetch-weather");
const weatherInfo = document.querySelector(".weather-info");

fetchWeatherButton.addEventListener("click", () => {
    const cityName = cityInput.value;
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

            const cityName = data.name;

            const icon = data.weather[0].icon;
            console.log(icon);

            weatherInfo.innerHTML = `
            <div class="weather-desc-div"> 
                <p class="weather-city">${cityName}</p>
                <p class="weather-desc">${temperature}°C, <br><span class="desc-span">${descriptionCapitalized}</span></p>
            </div>
            <div class="weather-icon-div">
                <img class="weather-icon" src="/PulseQuill/icons/${icon}.png" alt="Can't get the icon">
            </div>
        `;
        })
});