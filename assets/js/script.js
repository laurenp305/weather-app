//ELEMENTS
const apiKey = "84b79da5e5d7c92085660485702f4ce8";
var cityHeader = document.querySelector('#city-name');
var humidity = document.querySelector('.humidity');
var windSpeed = document.querySelector('.wind-speed');
var uvIndex = document.querySelector('.uv-index');
var description = document.querySelector('.desc');
var clouds = document.querySelector('.clouds');
var cityInput = document.querySelector('#search-input');
var searchButton = document.querySelector('#search-button');
var icon = document.querySelector('.current-icon');
var currentTemperatureEl = document.querySelector('.temperature');
var theLat;
var theLon;

function fetchWeather(cityName) {
  const queryURL = "http://api.openweathermap.org/geo/1.0/direct?q=" + cityName + "&appid=" + apiKey;
  fetch(queryURL)
    .then( function (response) {
      return response.json();
    })
    .then( function (dataObject) {
      console.log('my data is', dataObject);
      let currentDate = new Date();
      let day = currentDate.getDate();
      let month = currentDate.getMonth() + 1;
      let year = currentDate.getFullYear();
      cityHeader.innerHTML = dataObject[0].name + " " + day + "/" + month + "/" + year;
      theLat = dataObject[0].lat;
      theLon = dataObject[0].lon;
      nowReallyGetTheWeather(theLat, theLon);

      // let weatherIcon = response.data.weather[0].icon;
      // currentIconEl.setAttribute("src", "http://openweathermap.org/img/w/" + weatherIcon + ".png");
      // currentIconEl.setAttribute("alt", response.data.weather[0].description);
      // currentTemperatureEl.innerHTML = "Temperature: " + response.data.main.temp + "&#8451"; farenheitTemp = (response.data.main.temp * (9 / 5) - 459.67).toFixed(2);
    })
}

function nowReallyGetTheWeather(lat, lon) {
  const queryURL = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=imperial`
  fetch(queryURL)
    .then( function (response) {
      return response.json();
    })
    .then( function (weatherObject) {
      currentTemperatureEl.innerHTML = "Temperature (F): " + weatherObject.main.temp;
      humidity.innerHTML = "Humidity: " + weatherObject.main.humidity;
      windSpeed.innerHTML = "Wind Speed: " + weatherObject.wind.speed;
      // uvIndex.innerHTML = "Uv Index: " + weatherObject.
    })
}
// function searchCityFunction() {
// //Grab input
// const cityName = cityInput.value;
// console.log(cityName);
// fetchLocation(cityName);
// }
// //Grab info
//city info
//weather info
//wind
//temp
//uv index
//humidity
//Save search history
//Update display


function fetchLocation(cityName) {
  const queryURL = "http://api.openweathermap.org/geo/1.0/direct?q=" + cityName + "&appid=" + apiKey;
  fetch(queryURL)
    .then(function (response) {
      return response.json()
    })
    .then(function (data) {
      console.log(data);
      const lat = data.location.lat;
      const lon = data.location.lon;
      fetchWeather(lat, lon);
    })
    .catch(function () {
      console.log("error");
    }
    )
};

// THEN I am presented with the city name, the date, an icon representation of 
// weather conditions, the temperature, the humidity, the wind speed, and the UV index

// STEP 1 (A):
// and that city is added to the search history

// STEP 2:
// WHEN I view the UV index
// THEN I am presented with a color that indicates whether the conditions are favorable, moderate, or severe

// STEP 3:
// WHEN I view future weather conditions for that city
// THEN I am presented with a 5-day forecast that displays the date, an icon representation of weather conditions, 
// the temperature, the wind speed, and the humidity

// STEP 4: (reuse step 1 & step 4)
// WHEN I click on a city in the search history
// THEN I am again presented with current and future conditions for that city


searchButton.addEventListener('click', () => {
  let city = cityInput.value;
  console.log(city);
  fetchWeather(city);
})