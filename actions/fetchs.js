const myKey = `aedb1cdb9aca7ca046fc5526f45219d3`;

async function FetchCurrentWeather(_city) {
  const url = `http://api.openweathermap.org/data/2.5/weather?q=${_city}&units=metric&lang=fr&appid=${myKey}`;
  try {
    const result = await fetch(url);
    return await result.json();
  } catch (error) {
    console.log("FetchCurrentWeather Error : ", error);
  }
  return;
}

async function FetchWeekWeather(_lon, _lat) {
  const url = `https://api.openweathermap.org/data/2.5/onecall?lat=${_lat}&lon=${_lon}&exclude=minutely,hourly,alerts&lang=fr&units=metric&appid=${myKey}`;
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
