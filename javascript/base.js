const myKey = `aedb1cdb9aca7ca046fc5526f45219d3`;
const searchButton = document.querySelector("#search-button");
const resultText = document.querySelector("#result-text");
const months = [
  "Jan",
  "Fev",
  "Mar",
  "Avr",
  "Mai",
  "Jun",
  "Jul",
  "Aou",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

searchButton.addEventListener("click", function () {
  FetchCurrentWeather();
});

function FetchCurrentWeather() {
  const searchInput = document.querySelector("#search-input");
  const city = searchInput.value || "Paris";
  const url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&lang=fr&appid=${myKey}`;
  fetch(url)
    .then((response) => {
      if (response.ok) {
        test = response.json().then((data) => {
          const weather = data;
          FetchWeekWeather(weather.coord.lon, weather.coord.lat, weather.name);
          searchInput.value = "";
        });
      } else {
        console.log("FetchCurrentWeather response is not ok...");
      }
    })
    .catch((error) => console.log("FetchCurrentWeather : ", error));
  return;
}

function FetchWeekWeather(_lon, _lat, _name) {
  const url = `https://api.openweathermap.org/data/2.5/onecall?lat=${_lat}&lon=${_lon}&exclude=minutely,hourly,alerts&lang=fr&units=metric&appid=${myKey}`;

  fetch(url)
    .then((response) => {
      if (response.ok) {
        response.json().then((data) => {
          CurrentWeatherDisplay(data.current, _name);
          WeekWeatherDisplay(data.daily);
        });
      } else {
        console.log("FetchWeekWeather response status is ", response.status);
      }
    })
    .catch((error) => console.log("FetchWeekWeather : ", error));
}

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
