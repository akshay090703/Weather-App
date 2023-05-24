const apiKey = "ad43ccedd44e6ba318ac651cd56ce516";

const weatherDataEl = document.getElementById('weather-output');
const cityInputEl = document.getElementById("city-input");
const formEl = document.querySelector("form");
const feelsLike = document.getElementById('feels-like');
const humidity = document.getElementById('humidity');
const speed = document.getElementById('speed');

formEl.addEventListener('submit', event => {
    event.preventDefault();
    const cityValue = cityInputEl.value;

    getWeatherData(cityValue);
})

async function getWeatherData(cityValue) {
    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityValue}&appid=${apiKey}&units=metric`);
        
        if(!response.ok) {
            throw new Error("Network response was not ok!")
        }

        const data = await response.json();

        const temperature = Math.round(data.main.temp);
        const description = data.weather[0].description;
        const descriptionOutput = description.charAt(0).toUpperCase() + description.slice(1);
        const icon = data.weather[0].icon;

        const extraDetails = [
            `Feels like: ${Math.round(data.main.feels_like)}°C`,
            `Humidity: ${data.main.humidity}%`,
            `Wind: ${data.wind.speed}m/s`,
        ]


        weatherDataEl.querySelector('.icon').innerHTML = `<img src="http://openweathermap.org/img/wn/${icon}.png" alt="Weather Icon">`;
        weatherDataEl.querySelector('.temperature').textContent = `${temperature}°C`;
        weatherDataEl.querySelector('.description').textContent = `${descriptionOutput}`;

        weatherDataEl.querySelector('.extra-details').innerHTML = extraDetails.map(detail => `<div>${detail}</div>`).join("");
    } catch (error) {
        weatherDataEl.querySelector('.icon').innerHTML = '';
        weatherDataEl.querySelector('.temperature').textContent = '';
        weatherDataEl.querySelector('.description').textContent = 'An error occured, please try again later';

        weatherDataEl.querySelector('.extra-details').innerHTML = '';
    }
}