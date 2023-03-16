const form = document.querySelector('#searchForm')
const cityName = document.querySelector('.city-name')
const degrees = document.querySelector('.degrees')
const info = document.querySelector('.info')
const degreesIcon = document.querySelector('.degrees-icon')

form.addEventListener('submit', e => {
  e.preventDefault()
  searchWeather()
})

const searchWeather = async () => {
  const city = form.elements.query.value
  const config = {
    params: {
      q: city,
      appid: '61f6c727d9c7f34c98985990b44f02fe',
      units: 'metric'
    }
  }
  try {
    const res = await axios.get(
      'https://api.openweathermap.org/data/2.5/weather',
      config
    )
    changeText(res.data)
  } catch (error) {
    return
  }
  form.elements.query.value = ''
}

const changeText = data => {
  const { name } = data
  const { icon, description } = data.weather[0]
  const { temp, humidity } = data.main
  const { speed } = data.wind
  cityName.innerHTML = `Weather in ${name}`
  degreesIcon.src = `http://openweathermap.org/img/wn/${icon}@2x.png`
  degrees.innerHTML = `${temp}°C`
  info.children[0].innerHTML = `${description}`
  info.children[1].innerHTML = `Humidity: ${humidity}%`
  info.children[2].innerHTML = `Wind speed: ${speed} km/h`
}
