// Maps weather icon codes to background classes
export const getWeatherBackgroundClass = (iconCode) => {
  if (!iconCode) return 'weather-bg-default'

  switch (true) {
    case iconCode.includes('01'):
      // Clear sky
      return 'weather-bg-clear'
    case iconCode.includes('02'):
      // Few clouds
      return 'weather-bg-partly-cloudy'
    case iconCode.includes('03'):
      // Scattered clouds
      return 'weather-bg-cloudy'
    case iconCode.includes('04'):
      // Broken clouds
      return 'weather-bg-overcast'
    case iconCode.includes('09'):
      // Shower rain
      return 'weather-bg-rain'
    case iconCode.includes('10'):
      // Rain
      return 'weather-bg-rain'
    case iconCode.includes('11'):
      // Thunderstorm
      return 'weather-bg-thunderstorm'
    case iconCode.includes('13'):
      // Snow
      return 'weather-bg-snow'
    case iconCode.includes('50'):
      // Mist/Fog
      return 'weather-bg-mist'
    default:
      return 'weather-bg-default'
  }
}

// Get the weather icon code from forecast data
export const getCurrentWeatherIcon = (forecast) => {
  if (forecast && forecast.length > 0) {
    return forecast[0].weather[0].icon
  }
  return null
}
