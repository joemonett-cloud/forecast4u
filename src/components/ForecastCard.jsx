import { Tile, Stack } from '@carbon/react'
import {
  RainDrizzle,
  Rain,
  Snow,
  MostlyCloudy,
  PartlyCloudy,
  Sunny,
  Humidity,
  Wind,
  View,
} from '@carbon/icons-react'
import './ForecastCard.css'

const getWeatherIcon = (iconCode) => {
  const iconProps = { size: 32, className: 'weather-icon' }

  switch (true) {
    case iconCode.includes('01'):
      return <Sunny {...iconProps} />
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
    <div className="forecast-card-column">
      <Tile className="forecast-card">
        <Stack gap={4}>
          <div className="forecast-date-time">
            <p className="day-date">{dayDate}</p>
            <p className="time">{time}</p>
          </div>

          <div className="forecast-icon-section">
            {getWeatherIcon(data.weather[0].icon)}
            <p className="weather-description">{description}</p>
          </div>

          <div className="forecast-temps">
            <div className="temp-main">
              <span className="temp-value">{temp}°</span>
              <span className="temp-label">C</span>
            </div>
            <p className="feels-like">Feels like {feelsLike}°</p>
          </div>

          <div className="forecast-details">
            <div className="detail-item">
              <Humidity size={20} />
              <div className="detail-text">
                <p className="detail-label">Humidity</p>
                <p className="detail-value">{humidity}%</p>
              </div>
            </div>

            <div className="detail-item">
              <Wind size={20} />
              <div className="detail-text">
                <p className="detail-label">Wind</p>
                <p className="detail-value">{windSpeed} km/h</p>
              </div>
            </div>

            <div className="detail-item">
              <View size={20} />
              <div className="detail-text">
                <p className="detail-label">Visibility</p>
                <p className="detail-value">{visibility} km</p>
              </div>
            </div>
          </div>
        </Stack>
      </Tile>
    </div>
  )
}
