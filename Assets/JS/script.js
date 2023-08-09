
var userInputEl = document.querySelector('#city');
var apiKey = 'ba8d5e210ab6f547cf3feb9fbea86c4c';

document.querySelector('#searchButton').addEventListener('click', search)
    // var city = userInputEl.value;
  
    function search(){
        var city = userInputEl.value;
        localStorage.setItem('city', city);

        // var cityArray = [];
        // cityArray.push(city);
        // localStorage.setItem('cities', JSON.stringify(cityArray));

        var cityArray = JSON.parse(localStorage.getItem('cities')) || [];
        cityArray.push(city);
        localStorage.setItem('cities', JSON.stringify(cityArray));






        fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=5&appid=${apiKey}`)
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        console.log(data);
        if (data.length > 0) {
            var latitude = data[0].lat; 
            var longitude = data[0].lon; 

            console.log('Latitude:', latitude);
            console.log('Longitude:', longitude);

            fetch(`http://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=imperial`)
            .then(function (response) {
                return response.json();
              })
              .then(function (data) {
                console.log(data);

                var forecast = data.list[0];
                var city = data.city.name;
                var date = forecast.dt;
                var weatherIcon = forecast.weather[0].icon;
                var temperature = forecast.main.temp;
                var humidity = forecast.main.humidity;
                var windSpeed = forecast.wind.speed;

                console.log('City:', city);
                console.log('Date:', date);
                console.log('Weather Icon:', weatherIcon);
                console.log('Temperature:', temperature);
                console.log('Humidity:', humidity);
                console.log('Wind Speed:', windSpeed);

                var weatherBox = document.querySelector('.weather');
                var icon = document.createElement("img");
                icon.setAttribute("src", `https://openweathermap.org/img/wn/${weatherIcon}@2x.png`);
                document.body.appendChild(icon);

                var cityDateEl = document.querySelector('#city-date');
                cityDateEl.innerHTML = city + "(" + date + ") " 
                var tempEl = document.querySelector('#temp');
                tempEl.textContent = "Temp: " + temperature + "°F"
                var windEl = document.querySelector('#wind');
                windEl.textContent = "Wind: " + windSpeed + " MPH" 
                var humidityEl = document.querySelector('#humidity');
                humidityEl.textContent = "Humidity: " + humidity + "%"



                var noonForecasts = data.list.filter(function(forecast) {
                    return forecast.dt_txt.includes("12:00:00");
                });

                noonForecasts.slice(0, 5).forEach(function(noonForecast) {
                    var icon = document.createElement("img");
                    icon.setAttribute("src", `https://openweathermap.org/img/wn/${noonForecast.weather[0].icon}@2x.png`);
                    document.body.appendChild(icon);
                    console.log('City:', city);
                    console.log('Date:', noonForecast.dt_txt);
                    console.log('Weather Icon:', noonForecast.weather[0].icon);
                    console.log('Temperature:', noonForecast.main.temp);
                    console.log('Humidity:', noonForecast.main.humidity);
                    console.log('Wind Speed:', noonForecast.wind.speed);
                });

              });    
        
        } else {
            console.log('No results found.');
          }
      });

  };