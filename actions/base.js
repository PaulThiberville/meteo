const searchButton = document.querySelector("#search-button");
const searchInput = document.querySelector("#search-input");
const container = document.querySelector("#locations-container");
const locationInfos = document.querySelector("#locations-info");

//test();
//async function test() {
//  const result = await FetchWeekWeather(37.6156, 55.7522);
//  console.log(result);
//}

searchButton.addEventListener("click", function () {
  OnSearchClicked();
});

async function OnSearchClicked() {
  const input = searchInput.value;
  const locations = await FetchAllLocations(input);
  container.innerHTML = "";
  if (locations.length <= 0) {
    locationInfos.classList.remove("hidden");
    return;
  }
  locationInfos.classList.add("hidden");
  LocationsRender(locations);
}
