const searchButton = document.querySelector("#search-button");
const searchInput = document.querySelector("#search-input");
const datalist = document.querySelector("#cities");
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

searchInput.addEventListener("input", function () {
  CheckInput();
});

searchButton.addEventListener("click", function () {
  OnSearchClicked();
});

async function OnSearchClicked() {
  // Get city name, lon and lat from FetchCurrentWeather()
  const currentWeather = await FetchCurrentWeather(GetUserInput());
  // Get week's weather from previous object properties
  const week = await FetchWeekWeather(
    currentWeather.coord.lon,
    currentWeather.coord.lat
  );
  // Display Datas
  CurrentWeatherRender(week.current, currentWeather.name);
  WeekWeatherRender(week.daily);
  return;
}

function GetUserInput() {
  const city = searchInput.value || "Paris";
  return city;
}

async function CheckInput() {
  ClearDatalist();
  if (searchInput.value.length >= 3) {
    const locations = await FetchAllLocations(searchInput.value);
    FillDatalist(locations);
  }
}

function ClearDatalist() {
  const childrens = datalist.children;
  for (let i = 0; i < childrens.length; i++) {
    childrens[i].remove();
  }
}

function FillDatalist(_newData) {
  for (let i = 0; i < _newData.length; i++) {
    let option = document.createElement("option");
    option.value = _newData[i].name + "/" + _newData[i].country;
    datalist.appendChild(option);
  }
  console.log(_newData);
}
