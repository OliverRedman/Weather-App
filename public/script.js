const searchElement = document.querySelector('[data-city-search]')
const searchBox = new google.maps.places.SearchBox(searchElement)
searchBox.addListener('places_changed', () => {
    const place = searchBox.getPlaces()[0]
    if (place == null) return
    const latitude = place.geometry.location.lat()
    const longitude = place.geometry.location.lng()
fetch('/weather', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    },
    body: JSON.stringify({
        latitude: latitude,
        longitude: longitude
    })
}).then(res => res.json()).then(data => {
   setWeatherData(data, place.formatted_address)
})
})
const iconstuff = document.getElementById('icon-weather')
const locationElement = document.querySelector('[data-location]')
const statusElement = document.querySelector('[data-status]')
const tempElement = document.querySelector('[data-temp]')
const humElement = document.querySelector('[data-pre]')
const windElement = document.querySelector('[data-wind]')

function setWeatherData(data, place) {
    locationElement.textContent = place
    statusElement.textContent = data.weather[0].description
    tempElement.textContent = data.temp
    humElement.textContent = `${data.humidity}%`
    windElement.textContent = data.wind_speed
    const iconUrl = "http://openweathermap.org/img/w/" + data.weather[0].icon + ".png"
iconstuff.src = iconUrl
}
iconstuff.src = "http://openweathermap.org/img/w/01d.png"
