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

            // Display weather information
            weatherInfo.innerHTML = `
            <h2>Weather in ${cityName}</h2>
            <p>Temperature: ${temperature}°C</p>
            <p>${descriptionCapitalized}</p>
        `;
        })
});