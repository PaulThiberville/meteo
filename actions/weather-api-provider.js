const myKey = `aedb1cdb9aca7ca046fc5526f45219d3`;
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

async function FetchWeekWeather(_lon, _lat) {
  const url = `https://api.openweathermap.org/data/2.5/onecall?lon=${_lon}&lat=${_lat}&exclude=minutely,hourly,alerts&lang=fr&units=metric&appid=${myKey}`;

  try {
    const result = await fetch(url);
    return await result.json();
  } catch (error) {
    console.log("FetchWeekWeather Error : ", error);
  }
}

async function FetchAllLocations(_input) {
  const url = `http://api.openweathermap.org/geo/1.0/direct?q=${_input}&limit=5&appid=${myKey}`;
  try {
    const result = await fetch(url);
    return await result.json();
  } catch (error) {
    console.log("FetchAllLocations Error : ", error);
    return "Error";
  }
}
