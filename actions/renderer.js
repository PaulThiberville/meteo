function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}
function LocationsRender(_locations) {
  for (let i = 0; i < _locations.length; i++) {
    const location = document.createElement("div");
    location.setAttribute("class", "location");
    container.appendChild(location);

    const locationCity = document.createElement("p");
    locationCity.setAttribute("class", "location-city");
    locationCity.innerText = _locations[i].name;
    location.appendChild(locationCity);

    const locationCountry = document.createElement("p");
    locationCountry.setAttribute("class", "location-country");
    locationCountry.innerText = _locations[i].country;
    if (_locations[i].state != undefined)
      locationCountry.innerText += "/" + _locations[i].state;
    location.appendChild(locationCountry);

    const locationButton = document.createElement("button");
    locationButton.setAttribute("class", "location-button");
    locationButton.innerText = "Voir";
    locationButton.addEventListener("click", async function () {
      const lon = _locations[i].lon;
      const lat = _locations[i].lat;
      document.querySelector("#location-section").classList.add("hidden");
      document.querySelector("#weather-section").classList.remove("hidden");
      const week = await FetchWeekWeather(lon, lat);
      CurrentWeatherRender(
        week.current,
        `${_locations[i].name}/${_locations[i].country}`
      );
      WeekWeatherRender(week.daily);
    });
    location.appendChild(locationButton);
  }
}

function CurrentWeatherRender(_currentWeather, _locationName) {
  document.querySelector("#name").innerHTML = _locationName;
  document
    .querySelector("#description-icon")
    .classList.replace("wi-na", `wi-owm-${_currentWeather.weather[0].id}`);

  document.querySelector("#description-value").innerHTML =
    capitalizeFirstLetter(_currentWeather.weather[0].description);

  document.querySelector("#temp-value").innerHTML = `${parseInt(
    _currentWeather.temp
  )}°C`;

  document.querySelector("#humidity-value").innerHTML =
    _currentWeather.humidity + " %";

  document.querySelector("#pressure-value").innerHTML =
    _currentWeather.pressure + " hPa";

  document.querySelector("#wind-speed-value").innerHTML =
    parseInt(_currentWeather.wind_speed) + " Km/h";

  document.querySelector("#wind-deg-value").innerHTML =
    _currentWeather.wind_deg + " °";
  document
    .querySelector("#wind-deg-icon")
    .classList.replace("wi-na", `towards-45-deg`);
}

function WeekWeatherRender(week) {
  for (let i = 1; i < week.length; i++) {
    const day = week[i];
    //Date
    const _date = new Date(day.dt * 1000);
    const date = `${_date.getDate()} ${months[_date.getMonth()]}`;
    document.querySelector(`#date-${i}`).innerHTML = date;
    //Icon
    document
      .querySelector(`#icon-${i}`)
      .classList.replace("wi-na", `wi-owm-${day.weather[0].id}`);
    //Max
    document.querySelector(`#max-${i}`).innerHTML = `${parseInt(
      day.temp.max
    )}°C`;
    //Min
    document.querySelector(`#min-${i}`).innerHTML = `${parseInt(
      day.temp.min
    )}°C`;
  }
}
