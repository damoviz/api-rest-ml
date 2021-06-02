
const fetch = require('node-fetch');

exports.getCurrencyCountry = async (iso_code) => {
  try {
    let response = await fetch(`https://restcountries.eu/rest/v2/alpha/${iso_code}`)
    let json = await response.json()
    let currency = json.currencies.map(val => val.code).toString()
    return currency
  } catch (err) {
    console.log("Error ==> ", err)
  }
}

function degreesToRadians(degrees) {
  return degrees * Math.PI / 180;
}

exports.getDistanceBetweenPoints = (lat1, lng1) => {
  // El radio del planeta tierra en metros.
  let R = 6378137;

  // latitud y longitud de Buenos Aires
  const latitudBA = -34.607568
  const longitudBA = -58.437089

  let dLat = degreesToRadians(latitudBA - lat1);
  let dLong = degreesToRadians(longitudBA - lng1);
  let a = Math.sin(dLat / 2)
    *
    Math.sin(dLat / 2)
    +
    Math.cos(degreesToRadians(lat1))
    *
    Math.cos(degreesToRadians(lat1))
    *
    Math.sin(dLong / 2)
    *
    Math.sin(dLong / 2);

  let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  let distance = R * c;

  return distance;
}