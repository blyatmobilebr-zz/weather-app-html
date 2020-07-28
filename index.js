import { key } from "config.json";
const axios = require("axios");

// Show data
button.addEventListener("click", async function() {
  try {
    let city = document.querySelector("#city").value;
    let temperature = document.querySelector("#temperature");
    let button = document.querySelector("#button");
    let weatherDescription = document.querySelector("#description");
    let location = document.getElementsByTagName("p")[2];

    let apiResponse = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}`
    );

    // Get current, minimum, maximum temperature in Kelvin and humidity in %
    let {
      main: { temp, temp_min, temp_max, humidity }
    } = apiResponse.data;

    // Get city name
    let { name } = apiResponse.data;

    // Get country name
    let {
      sys: { country }
    } = apiResponse.data;

    // Get weather description
    let {
      weather: [{ description }]
    } = apiResponse.data;

    // Get the weather icon in order to display it
    let {
      weather: [{ icon }]
    } = apiResponse.data;

    document.querySelector("#image").src = `http://openweathermap.org/img/wn/${icon}@2x.png`;
    weatherDescription.innerHTML = description;
    location.innerHTML = `${name}, ${country}`;
    temperature.innerHTML = `${(temp - 273.15).toFixed(1)}°C`;
  } catch (error) {
    console.log(`The error is: ${error}.`);
  }
});
