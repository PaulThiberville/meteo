function CurrentWeatherDisplay(_currentWeather, _name) {
  document.querySelector("#name").innerHTML = _name;

  document
    .querySelector("#description-icon")
    .classList.replace("wi-na", `wi-owm-${_currentWeather.weather[0].id}`);

  document.querySelector("#description-value").innerHTML =
    _currentWeather.weather[0].description;

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

function WeekWeatherDisplay(week) {
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
