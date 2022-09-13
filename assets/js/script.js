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


var forecastGroupEl = document.querySelector(".card-body");

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

//5 DAY FORECAST//
document.getElementById("search-button").addEventListener("click", function () {
  forecastGroupEl.replaceChildren();
  var cityInput = document.querySelector(".form-control").value;
  var forecastQueryURL =
    "https://api.openweathermap.org/data/2.5/forecast?q=" +
    cityInput +"&units=imperial&appid=" + apiKey;
  
  fetch(forecastQueryURL).then(function (response) {
    
    if (response.ok) {
      response.json().then(function (data) {
        
        for (var i = 0; i < 5; i++) {
          
          var forecastContainerEl = document.createElement("div");
          forecastContainerEl.className = "forecast-container";
          forecastGroupEl.append(forecastContainerEl);
//DATE//
          var forecastDateContainerEl = document.createElement("div");
          forecastDateContainerEl.className = "forecast-date-container";
          forecastDateContainerEl.textContent = "Date: " + data.list[i].dt_txt;
          forecastContainerEl.append(forecastDateContainerEl);

          //CITY NAME//
          var forecastCityContainerEl = document.createElement("div");
          forecastCityContainerEl.className = "forecast-city-container";
          forecastCityContainerEl.textContent = data.city.name;
          
          forecastContainerEl.append(forecastCityContainerEl);

         //ICON//
          var forecastIconContainerEl = document.createElement("img");
          forecastIconContainerEl.className = "forecast-icon-container";
          forecastContainerEl.append(forecastIconContainerEl);

        //TEMPERATURE//
          var temperatureContainerEl = document.createElement("div");
          temperatureContainerEl.className = "temperature-container";
          temperatureContainerEl.textContent =
            "Temperature: " + Number(data.list[i].main.temp) + "°";
          forecastContainerEl.append(temperatureContainerEl);

          //HUMIDITY//
          var forecastHumidContainerEl = document.createElement("div");
          forecastHumidContainerEl.className = "forecast-humid-container";
          forecastHumidContainerEl.textContent =
            "Humidity: " + Number(data.list[i].main.humidity) + "%";
          forecastContainerEl.append(forecastHumidContainerEl);

        //WIND SPEED//
          var forecastWindContainerEl = document.createElement("div");
          forecastWindContainerEl.className = "forecast-wind-container";
          forecastWindContainerEl.textContent =
            "Wind Speed: " + data.list[i].wind.speed + " MPH";
          forecastContainerEl.append(forecastWindContainerEl);
        }
      });
    }
  });
});

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