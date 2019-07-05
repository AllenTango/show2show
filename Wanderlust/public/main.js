// Foursquare API Info
const clientId = '1EDRUZYDHSV0RDOG0VOZH4PJZJXD4XHIAZYD3Z4SFXCPAYZM';
const clientSecret = 'WKKCXL13COPHJZNFH4FCOHDADX3A1SMJIPVOVXAT0ONX2B45';
const url = 'https://api.foursquare.com/v2/venues/explore?near=';

// APIXU Info
const apiKey = '2100372281f14777aa7154613191506';
const forecastUrl = 'https://api.apixu.com/v1/forecast.json?key=';

// const $ = s => document.querySelector(s);
// const $$ = s => document.querySelectorAll(s);

// Page Elements
const $input = $('#city');
const $submit = $('#button');
const $destination = $('#destination');
const $container = $('.container');
const $venueDivs = [$("#venue1"), $("#venue2"), $("#venue3"), $("#venue4")];
const $weatherDivs = [$("#weather1"), $("#weather2"), $("#weather3"), $("#weather4")];
const weekDays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

// Add AJAX functions here:
const getVenues = async () => {
  const city = $input.val();
  const urlToFetch = `${url}${city}&limit=10&client_id=${clientId}&client_secret=${clientSecret}&v=20190616`;

  try {
    const response = await fetch(urlToFetch);

    if (response.ok) {
      const jsonResponse = await response.json();
      const venues = jsonResponse.response.groups[0].items.map(item => item.venue);
      return venues;
    }
  } catch (error) {
    console.log(error);
  }
}

// 由于是国外的api 请求 偶尔会 影响 ui
const getForecast = async () => {
  const q = $input.val();
  const urlToFetch = `${forecastUrl}${apiKey}&q=${q}&days=4&hours=11`;
  try {
    const response = await fetch(urlToFetch);
    if (response.ok) {
      const jsonResponse = await response.json();
      const days = jsonResponse.forecast.forecastday;
      return days;
    }
  } catch (e) {
    console.log(e);
  }
}


// Render functions
const renderVenues = (venues) => {
  $venueDivs.forEach(($venue, index) => {
    // Add your code here:
    const venue = venues[index];
    const venueIcon = venue.categories[0].icon;
    const venueImgsrc = `${venueIcon.prefix}bg_64${venueIcon.suffix}`;

    // let venueContent = '';
    const venueContent = createVenueHTML(venue.name, venue.location, venueImgsrc);
    $venue.append(venueContent);
  });
  $destination.append(`<h2>${venues[0].location.city}</h2>`);
}

const renderForecast = (days) => {
  $weatherDivs.forEach(($day, index) => {
    // Add your code here:
    const currentDay = days[index];
    const weatherContent = createWeatherHTML(currentDay);

    // let weatherContent = '';
    $day.append(weatherContent);
  });
}

const executeSearch = () => {
  $venueDivs.forEach(venue => venue.empty());
  $weatherDivs.forEach(day => day.empty());
  $destination.empty();
  $container.css("visibility", "visible");
  getVenues().then(venues => renderVenues(venues));
  getForecast().then(forecast => renderForecast(forecast));
  return false;
}

$submit.click(executeSearch)