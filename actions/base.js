const searchButton = document.querySelector("#search-button");
const searchInput = document.querySelector("#search-input");
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

//searchInput.addEventListener("input", function () {
//  CheckInput();
//});

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
  CurrentWeatherDisplay(week.current, currentWeather.name);
  WeekWeatherDisplay(week.daily);
  return;
}

function GetUserInput() {
  const city = searchInput.value || "Paris";
  return city;
}

//async function CheckInput() {
//  if (searchInput.value.length >= 3) {
//    const test = await FetchAllLocations(searchInput.value);
//    if (test.lenth > 0) {
//      // affecter les valeurs de la liste dans test au datalist;
//    }
//  }
//  //rien faire
//  return;
//}
