if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}

const OPEN_WEATHER_API = process.env.OPEN_WEATHER_API
const express = require('express')
const app = express()
const axios = require('axios')

app.use(express.json())
app.use(express.static('public'))

app.post('/weather' , (req, res) => {
const url = `https://api.openweathermap.org/data/2.5/onecall?lat=${req.body.latitude}&lon=${req.body.longitude}&exclude={}&appid=${OPEN_WEATHER_API}&units=metric&current.rain`
axios({
    url: url,
    responseType: 'json'
}).then(data => res.json(data.data.current))
})

app.listen(3000, () => {
    console.log('server  started')
})