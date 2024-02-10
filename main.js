// main.js

const apiKey = "24684bc34c2d0e144149eb2467e0c1ba";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const searchBox = document.querySelector(".search-bar");
const searchBtn = document.querySelector(".search-button");
const weatherIcon = document.querySelector(".weather-icon");

async function checkWeather(city) {
  const response = await fetch(apiUrl + city + '&appid=' + apiKey);

  if (response.status == 404) {
    // City not found, display error message and hide inside-box
    document.querySelector(".error").style.display = "block";
    document.querySelector(".inside-box").style.display = "none";
  } else {
    document.querySelector(".error").style.display = "none";
    document.querySelector(".inside-box").style.display = "block";

    const data = await response.json();
    document.querySelector(".city").textContent = data.name;
    document.querySelector(".temp").textContent = Math.round(data.main.temp) + " °C"; 

    // Decide the picture based on the weather
    if (data.weather[0].main == "Clouds") {
      weatherIcon.src = "clouds.png";
    } else if (data.weather[0].main == "Clear") {
      weatherIcon.src = "clear.png";
    } else if (data.weather[0].main == "Rain") {
      weatherIcon.src = "rain.png";
    } else if (data.weather[0].main == "Mist") {
      weatherIcon.src = "mist.png";
    }
  }
}

searchBtn.addEventListener("click", () => {
  const city = searchBox.value.trim(); // Trim whitespace from the city name
  if (city) {
    checkWeather(city);
  } else {
    alert("Please enter a city name.");
  }
});
