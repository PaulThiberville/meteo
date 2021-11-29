const myKey = `aedb1cdb9aca7ca046fc5526f45219d3`;

async function FetchWeekWeather(_coord) {
  const url = `https://api.openweathermap.org/data/2.5/onecall?${_coord}&exclude=minutely,hourly,alerts&lang=fr&units=metric&appid=${myKey}`;
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
  }
}
