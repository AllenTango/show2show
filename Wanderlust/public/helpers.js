const createVenueHTML = (name, location, iconSource) => {
  return `<h2>${name}</h2>
  <img class="venueimage" src="${iconSource}"/>
  <h3>地址:</h3>
  <p>${location.address}</p>
  <p>${location.city}</p>
  <p>${location.country}</p>`;
}

const createWeatherHTML = (currentDay) => {
  return `<h2> 最高温度: ${currentDay.day.maxtemp_c}</h2>
    <h2> 最低温度: ${currentDay.day.mintemp_c}</h2>
    <img src="https://${currentDay.day.condition.icon}" class="weathericon" />
    <h2>${weekDays[(new Date(currentDay.date)).getDay()]}</h2>`;
}