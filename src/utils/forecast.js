const request = require('request')

const forecast = (long, lat, callback) => {
  const url =
    'http://api.weatherstack.com/current?access_key=9327bfb3c7bb9eed31af187b3902683b&query=' +
    lat +
    ',' +
    long +
    '&units=f'

  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback('Unable to connect', undefined)
    } else if (body.error) {
      callback('Unable to find location', undefined)
    } else {
      callback(
        undefined,
        `${body.current.weather_descriptions[0]}. It is currently ${body.current.temperature} degrees out. It feels like ${body.current.feelslike} degrees`
      )
    }
  })
}

module.exports = forecast
