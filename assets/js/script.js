//ELEMENTS
const apiKey = "84b79da5e5d7c92085660485702f4ce8";
var cityHeader = document.querySelector('#city-name');
var humidity = document.querySelector('.humidity');
var windSpeed = document.querySelector('.wind-speed');
var description = document.querySelector('.description');
var clouds = document.querySelector('.clouds');
var cityInput = document.querySelector('#search-input');
var searchButton = document.querySelector('#search-button');
var searchHistory = JSON.parse(localStorage.getItem("search")) || [];
var icon = document.querySelector('.current-icon');
var currentTemperatureEl = document.querySelector('.temperature');
var historyEl = document.querySelector("#history");
var clearHisButton = document.querySelector('#clear-history-button');
//forecast variables
var forecastHeader = document.querySelector('#five-day-header');
var forecastIcon = document.querySelector('.forecast-icon');
var forecastTemp = document.querySelector('#forecast-temp');
var forecastHumidity = document.querySelector('#forecast-humidity');
var forecastWindSpeed = document.querySelector('#forecast-wind-speed');
var forecastDescription = document.querySelector('#forecast-description');
var forecastClouds = document.querySelector('#forecast-clouds');
var forecastDateEl = document.querySelector('.forecast-date');

// //fiveday forecast
// var fiveDayHeader = ('#five-day-header');


function fetchWeather(cityName) {
  const queryURL = "http://api.openweathermap.org/geo/1.0/direct?q=" + cityName + "&appid=" + apiKey;
  fetch(queryURL)
    .then(function (response) {
      return response.json();
    })
    .then(function (dataObject) {
      // console.log('my data is', dataObject);
      let currentDate = new Date();
      let day = currentDate.getDate();
      let month = currentDate.getMonth() + 1;
      let year = currentDate.getFullYear();
      cityHeader.innerHTML = dataObject[0].name + " " + day + "/" + month + "/" + year;
      theLat = dataObject[0].lat;
      theLon = dataObject[0].lon;
      nowReallyGetTheWeather(theLat, theLon);
      getFiveDayForecast(theLat, theLon);
    })
}

function nowReallyGetTheWeather(lat, lon) {
  const queryURL = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=imperial`
  fetch(queryURL)
    .then(function (response) {
      return response.json();
    })
    .then(function (weatherObject) {
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
    })
}

function getFiveDayForecast(lat, lon) {
  const queryURL = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=current,minutely,hourly,alerts&appid=${apiKey}&units=imperial`
  fetch(queryURL)
    .then(function (response) {
      return response.json();
    })
    .then(function (fiveDayObject) {
      const forecastEl = document.querySelectorAll(".forecast");
      for (let i = 0; i < forecastEl.length; i++) {
        forecastEl[i].innerHTML = "";
        //inserts icon
        let forecastIndex = fiveDayObject.daily[i];
        let forecastDate = new Date(forecastIndex.dt * 1000);
        let forecastDay = forecastDate.getDate();
        let forecastMonth = forecastDate.getMonth() + 1;
        let forecastYear = forecastDate.getFullYear();
        forecastDateEl.innerHTML = forecastDay + "/" + forecastMonth + "/" + forecastYear;
        forecastEl[i].append(forecastDateEl);
        iconPic = fiveDayObject.daily[0].weather[0].icon;
        forecastIcon = document.querySelector('.forecast-icon');
        forecastIcon.setAttribute("src", "https://openweathermap.org/img/wn/" + iconPic + "@2x.png");
        //current temperature in fahrenheit
        forecastTemp.innerHTML = "Temperature (F): " + fiveDayObject.daily[0].temp.day;
        //current humidity
        forecastHumidity.innerHTML = "Humidity: " + fiveDayObject.daily[0].humidity;
        //current wind speed
        forecastWindSpeed.innerHTML = "Wind Speed: " + fiveDayObject.daily[0].wind_speed;
        //description of current weather
        forecastDescription.innerHTML = "Description: " + fiveDayObject.daily[0].weather.description;
        //description of cloudiness
        forecastClouds.innerHTML = "Clouds: " + fiveDayObject.daily[0].clouds;
      }
    })
}

// Get history from local storage if any
searchButton.addEventListener("click", function () {
  const searchTerm = cityInput.value;
  fetchWeather(searchTerm);
  searchHistory.push(searchTerm);
  localStorage.setItem("search", JSON.stringify(searchHistory));
  renderSearchHistory();
})

function renderSearchHistory() {
  historyEl.innerHTML = "";
  for (let i = 0; i < searchHistory.length; i++) {
    const historyItem = document.createElement("input");
    historyItem.setAttribute("type", "text");
    historyItem.setAttribute("readonly", true);
    historyItem.setAttribute("class", "form-control d-block bg-white");
    historyItem.setAttribute("value", searchHistory[i]);
    historyItem.addEventListener("click", function () {
      fetchWeather(historyItem.value);
    })
    historyEl.append(historyItem);
  }
}

renderSearchHistory();
if (searchHistory.length > 0) {
  fetchWeather(searchHistory[searchHistory.length - 1]);
}

//clear history button 
clearHisButton.addEventListener("click", function () {
  localStorage.clear();
  searchHistory = [];
  renderSearchHistory();
})


//Search for city button
searchButton.addEventListener('click', () => {
  let city = cityInput.value;
  console.log(city);
  fetchWeather(city);
})