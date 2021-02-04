const path = require('path')
const express = require('express')
const hbs = require('hbs')
const mapbox = require('./utils/mapbox')
const forecast = require('./utils/forecast')

const app = express()

const publicPath = path.join(__dirname, '../public')
const partialsPath = path.join(__dirname, '../views/partials')

app.set('view engine', 'hbs')
app.use(express.static(publicPath))
hbs.registerPartials(partialsPath)

app.get('/', (req, res) => {
  res.render('index', {
    title: 'Node Weather App',
  })
})

app.get('/about', (req, res) => {
  res.render('about', {
    title: 'About Me',
  })
})

app.get('/help', (req, res) => {
  res.render('help', {
    title: 'Help page',
    message: 'How do I get this page to load?',
  })
})

app.get('/weather', (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: 'You must provide a valid location',
    })
  }

  mapbox(req.query.address, (error, { longitude, latitude, location } = {}) => {
    if (error) {
      res.send({ error })
    }

    forecast(longitude, latitude, (error, forecastData) => {
      if (error) {
        return res.send({ error })
      }
      res.send({
        location,
        forecastData,
        address: req.query.address,
      })
    })
  })
})

app.get('/help/*', (req, res) => {
  res.render('404', {
    title: '404',
    errorMessage: 'Help topic not found',
  })
})

app.get('*', (req, res) => {
  res.render('404', {
    title: '404',
    errorMessage: 'Page not found',
  })
})

app.listen(3000, () => {
  console.log('Server listening')
})
