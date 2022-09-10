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
var forecastHeader = document.querySelector('#five-day-header');

//fiveday forecast
var fiveDayHeader = ('#five-day-header');


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

//get five-day forecast
function getFiveDayForecast(lat, lon) {
  let foreCastUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=imperial`
  fetch(foreCastUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (weatherObject) {
      //inserts icon
      // console.log(weatherObject);
      let fiveDayInfo = weatherObject.list[0];

      fetch(foreCastUrl)
    .then(response => response.json())
    .then(forecast => {

        // For each day, we'll loop through and add it to the DOM:
        forecast.list.forEach(day => {
          //gives header of this section the name of the city
          forecastHeader.innerHTML = cityInput.value;
            // Create a new element to hold each day's data in the DOM:
            const dayContainer = document.createElement('div')

            // Create an element to hold the temp data:
            const temp = day.main.temp;
            const tempElem = document.createElement('div')
            tempElem.innerText = Math.round(temp) + '°F'
            dayContainer.appendChild(tempElem)

            // Create an image element to hold the icon:
            const icon = day.weather[0].icon;
            const iconElem = document.createElement('img')
            iconElem.src = 'http://openweathermap.org/img/wn/' + icon + '.png'
            dayContainer.appendChild(iconElem)

            // Add the result to the DOM:
            document.body.appendChild(dayContainer)
        })
    })
      // dayOne.innerHTML = weatherObject.list[0];
      // console.log(fiveDayInfo[0].main);

      // //current temperature in fahrenheit
      // currentTemperatureEl.innerHTML = "Temperature (F): " + weatherObject.main.temp;
      // //current humidity
      // humidity.innerHTML = "Humidity: " + weatherObject.main.humidity;
      // //current wind speed
      // windSpeed.innerHTML = "Wind Speed: " + weatherObject.wind.speed;
      // //description of current weather
      // description.innerHTML = "Description: " + weatherObject.weather.description;
      // //description of cloudiness
      // clouds.innerHTML = "Clouds: " + weatherObject.clouds.all;
// }
    })
  }


// Get history from local storage


searchButton.addEventListener('click', () => {
  let city = cityInput.value;
  console.log(city);
  fetchWeather(city);
})