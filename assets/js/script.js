var input = document.querySelector('.search');
var cityName = document.querySelector('#city-name');
var temperature = document.querySelector('.temp');
var description = document.querySelector('.desc');
var clouds = document.querySelector('.clouds');
var searchButton = document.querySelector('.btn');

const APIKey = "84b79da5e5d7c92085660485702f4ce8";

searchButton.addEventListener('click', function(name){
    fetch('https://api.openweathermap.org/data/2.5/weather?q='+input.value+'&appid=84b79da5e5d7c92085660485702f4ce8')
    .then(response => response.json())
    .then(data => {
      var temperatureValue = data['cityName']['temperature'];
      var cityNameValue = data['cityName'];
      var descriptionValue = data['weather'][0]['description'];
    
      cityName.innerHTML = nameValue;
      description.innerHTML = "Description - "+descriptionValue;
      temperature.innerHTML = "Temperature - "+temperatureValue;
      search.value ="";
    
    })
    