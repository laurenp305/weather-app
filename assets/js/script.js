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
      //inserts icon
      let iconPic = weatherObject.weather[0].icon;
      icon.setAttribute("src", "https://openweathermap.org/img/wn/" + iconPic + "@2x.png");
      //current temperature in fahrenheit
      currentTemperatureEl.innerHTML = "Temperature (F): " + weatherObject.main.temp;
      //current humidity
      humidity.innerHTML = "Humidity: " + weatherObject.main.humidity;
      //current wind speed
      windSpeed.innerHTML = "Wind Speed: " + weatherObject.wind.speed;
      //description of current weather
      description.innerHTML = "Description: " + weatherObject.weather.description;
      //description of cloudiness
      clouds.innerHTML = "Clouds: " + weatherObject.clouds.all;
      //current uv index
      uvIndex.innerHTML = "UV Index: " + weatherObject.main.uvi;
      //this changes the background color according to the UV index
      // changeColor();
    })
}

// this changes the background color according to the UV index
function changeColor() {
  let temp = weatherObject.main.temp;
  let green = temp.fontcolor("green");
  let blue = temp.fontcolor("blue");
  let yellow = temp.fontcolor("yellow");
  let orange = temp.fontcolor("orange");
  let red = temp.fontcolor("red");
  if (temp > 60) {
    
  } else if (uvIndex.innerHTML > 70) {
    $(card.css("background-color", "yellow"));
  } else if (uvIndex.innerHTML > 80) {
    $(card.css("background-color", "orange"));
  } else if (uvIndex.innerHTML > 90) {
    $(card.css("background-color", "red"));
  } else {
    $(card.css("background-color", "light blue"));
  }
}

function fiveDayForecast() {
  
}

searchButton.addEventListener('click', () => {
  let city = cityInput.value;
  console.log(city);
  fetchWeather(city);
})