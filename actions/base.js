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
  //Attraper l'element avec le tag option et la meme value que le searchInput
  const options = document.getElementsByTagName("option");
  let option;
  for (let i = 0; i < options.length; i++) {
    if (options[i].value == searchInput.value) {
      option = options[i];
    }
  }
  //Recuperer la valeur de son attribut data-id
  const coord = option.getAttribute("data-id");
  //creer un objet week en appelant fetchWeekWeather avec les paramatetres de l'attribut
  const week = await FetchWeekWeather(coord);
  //Afficher avec WeekRender(week)
  CurrentWeatherRender(week.current, option.value);
  WeekWeatherRender(week.daily);
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
    option.setAttribute(
      "data-id",
      `lat=${_newData[i].lat}&lon=${_newData[i].lon}`
    );
    datalist.appendChild(option);
  }
  console.log(_newData);
}
