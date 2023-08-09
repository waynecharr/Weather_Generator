
var userInputEl = document.querySelector('#city');
var apiKey = 'ba8d5e210ab6f547cf3feb9fbea86c4c';

document.querySelector('#searchButton').addEventListener('click', function() {
    var city = userInputEl.value;
  
    fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=5&appid=${apiKey}`)
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        console.log(data);
      });
  });