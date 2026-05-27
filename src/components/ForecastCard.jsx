import { Tile, Stack } from '@carbon/react'
import {
  RainDrizzle,
  Rain,
  Snow,
  MostlyCloudy,
  PartlyCloudy,
  Sun,
  Humidity,
  WindGusts,
  View,
} from '@carbon/icons-react'
import './ForecastCard.css'

const getWeatherIcon = (iconCode) => {
  const iconProps = { size: 48, className: 'forecast-weather-icon' }

  switch (true) {
    case iconCode.includes('01'):
      return <Sun {...iconProps} />
    case iconCode.includes('02'):
      return <PartlyCloudy {...iconProps} />
    case iconCode.includes('03') || iconCode.includes('04'):
      return <MostlyCloudy {...iconProps} />
    case iconCode.includes('09'):
      return <RainDrizzle {...iconProps} />
    case iconCode.includes('10') || iconCode.includes('11'):
      return <Rain {...iconProps} />
    case iconCode.includes('13'):
      return <Snow {...iconProps} />
    default:
      return <MostlyCloudy {...iconProps} />
  }
}

export default function ForecastCard({ data }) {
  const temp = Math.round(data.main.temp)
  const feelsLike = Math.round(data.main.feels_like)
  const humidity = data.main.humidity
  const windSpeed = Math.round(data.wind.speed * 3.6) // Convert m/s to km/h
  const visibility = (data.visibility / 1000).toFixed(1) // Convert to km
  const description =
    data.weather[0].main.charAt(0).toUpperCase() +
    data.weather[0].main.slice(1)

  const date = new Date(data.dt * 1000)
  const time = date.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  })
  const dayDate = date.toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
  })

  return (
    <div className="forecast-card-wrapper">
      <div className="forecast-card-glass">
        <div className="forecast-card-content">
          <div className="card-datetime">
            <p className="card-day-date">{dayDate}</p>
            <p className="card-time">{time}</p>
          </div>

          <div className="card-icon-container">
            {getWeatherIcon(data.weather[0].icon)}
            <p className="card-weather-description">{description}</p>
          </div>

          <div className="card-temperature-section">
            <div className="card-main-temp">
              <span className="card-temp-value">{temp}</span>
              <span className="card-temp-unit">°C</span>
            </div>
            <p className="card-feels-like">Feels like {feelsLike}°</p>
          </div>

          <div className="card-metrics">
            <div className="metric-item">
              <div className="metric-icon">
                <Humidity size={20} />
              </div>
              <div className="metric-info">
                <p className="metric-label">Humidity</p>
                <p className="metric-value">{humidity}%</p>
              </div>
            </div>

            <div className="metric-item">
              <div className="metric-icon">
                <WindGusts size={20} />
              </div>
              <div className="metric-info">
                <p className="metric-label">Wind</p>
                <p className="metric-value">{windSpeed} km/h</p>
              </div>
            </div>

            <div className="metric-item">
              <div className="metric-icon">
                <View size={20} />
              </div>
              <div className="metric-info">
                <p className="metric-label">Visibility</p>
                <p className="metric-value">{visibility} km</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
