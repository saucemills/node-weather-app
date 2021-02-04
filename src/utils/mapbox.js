const request = require('request')

const mapbox = (address, callback) => {
  const url =
    'https://api.mapbox.com/geocoding/v5/mapbox.places/' +
    encodeURIComponent(address) +
    '.json?access_token=pk.eyJ1Ijoiam9ud2lsbG1pbGxlciIsImEiOiJja2thYnNwMGQwZWtnMm9yMWU3OG90eTV6In0.IUUZI9fzAGXXIzi9ZLZb7A&limit=1'

  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback('Unable to connect to location services', undefined)
    } else if (body.features.length === 0) {
      callback('Unable to find location', undefined)
    } else {
      callback(undefined, {
        latitude: body.features[0].geometry.coordinates[1],
        longitude: body.features[0].geometry.coordinates[0],
        location: body.features[0].place_name,
      })
    }
  })
}

module.exports = mapbox
