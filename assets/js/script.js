//ELEMENTS
const apiKey = "84b79da5e5d7c92085660485702f4ce8";
var cityHeader = document.querySelector('#city-name');
var humidity = document.querySelector('.humidity');
var windSpeed = document.querySelector('.wind-speed');
var uvIndex = document.querySelector('.uv-index');
var description = document.querySelector('.description');
var clouds = document.querySelector('.clouds');
var cityInput = document.querySelector('#search-input');
var searchButton = document.querySelector('#search-button');
var icon = document.querySelector('.current-icon');
var currentTemperatureEl = document.querySelector('.temperature');
var color = ('.card');
// var theLat;
// var theLon;

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
    })
}

function nowReallyGetTheWeather(lat, lon) {
  const queryURL = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=imperial`
  fetch(queryURL)
    .then( function (response) {
      return response.json();
    })
    .then( function (weatherObject) {
      icon.innerHTML = weatherObject.weather.icon;
      currentTemperatureEl.innerHTML = "Temperature (F): " + weatherObject.main.temp;
      humidity.innerHTML = "Humidity: " + weatherObject.main.humidity;
      windSpeed.innerHTML = "Wind Speed: " + weatherObject.wind.speed;
      // uvIndex.innerHTML = "Uv Index: " 
      description.innerHTML = "Description: " + weatherObject.weather.description;
      clouds.innerHTML = "Clouds: " + weatherObject.clouds.all;
      console.log(icon.innerHTML);
      // changeColor();
    })
}

function changeColor() {
  if (uvIndex.innerHTML < 3) {
    color.style.backgroundColor = "green";
  } else if (uvIndex.innerHTML < 6) {
    color.style.backgroundColor = "yellow";
  } else if (uvIndex.innerHTML < 8) {
    color.style.backgroundColor = "orange";
  } else if (uvIndex.innerHTML < 11) {
    color.style.backgroundColor = "red";
  } else {
    color.style.backgroundColor = "purple";
  }
}

function fiveDayForecast() {
  
}

searchButton.addEventListener('click', () => {
  let city = cityInput.value;
  console.log(city);
  fetchWeather(city);
})