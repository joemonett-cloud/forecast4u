import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import {
  Grid,
  Column,
  Stack,
  Button,
  Loading,
  InlineNotification,
  Tile,
} from '@carbon/react'
import { ArrowLeft } from '@carbon/icons-react'
import ForecastCard from '../components/ForecastCard.jsx'
import { getWeatherBackgroundClass, getCurrentWeatherIcon } from '../utils/weatherBackgrounds.js'
import './WeatherForecast.css'

const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY

export default function WeatherForecast() {
  const { zip } = useParams()
  const navigate = useNavigate()
  const [forecast, setForecast] = useState(null)
  const [location, setLocation] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [backgroundClass, setBackgroundClass] = useState('weather-bg-default')
  const [isNight, setIsNight] = useState(false)

  useEffect(() => {
    const fetchForecast = async () => {
      try {
        setLoading(true)
        setError(null)

        // First, get coordinates from ZIP code
        const geoResponse = await fetch(
          `https://api.openweathermap.org/geo/1.0/zip?zip=${zip}&appid=${API_KEY}`
        )

        if (!geoResponse.ok) {
          throw new Error('ZIP code not found')
        }

        const geoData = await geoResponse.json()
        setLocation({
          name: geoData.name,
          lat: geoData.lat,
          lon: geoData.lon,
          country: geoData.country,
        })

        // Then get the forecast using coordinates
        const forecastResponse = await fetch(
          `https://api.openweathermap.org/data/2.5/forecast?lat=${geoData.lat}&lon=${geoData.lon}&units=imperial&appid=${API_KEY}`
        )

        if (!forecastResponse.ok) {
          throw new Error('Failed to fetch forecast')
        }

        const forecastData = await forecastResponse.json()
        setForecast(forecastData.list)
        // Set background based on current weather
        if (forecastData.list && forecastData.list.length > 0) {
          const weatherIcon = forecastData.list[0].weather[0].icon
          setBackgroundClass(getWeatherBackgroundClass(weatherIcon))
          setIsNight(weatherIcon.endsWith('n'))
        }
      } catch (err) {
        setError(err.message)
        setForecast(null)
      } finally {
        setLoading(false)
      }
    }

    fetchForecast()
  }, [zip])

  if (loading) {
    return (
      <div className="forecast-loading">
        <Loading description="Loading forecast..." />
      </div>
    )
  }

  if (error) {
    return (
      <div className={`forecast-page ${backgroundClass}`}>
        <div className="forecast-nav-bar">
          <div className="nav-brand">Forecast4U</div>
          <div className="nav-location">{zip}</div>
        </div>
        <Grid>
          <Column lg={8} md={6} sm={4}>
            <Button
              kind="secondary"
              onClick={() => navigate('/')}
              renderIcon={ArrowLeft}
              size="sm"
              className="back-button"
            >
              Back to Search
            </Button>
            <InlineNotification
              kind="error"
              title="Error"
              subtitle={error}
              onClose={() => {}}
            />
          </Column>
        </Grid>
      </div>
    )
  }

  return (
    <div className={`forecast-page ${backgroundClass} ${isNight ? 'night-mode' : ''}`}>
      <div className="forecast-nav-bar">
        <div className="nav-brand">Forecast4U</div>
        {location && (
          <div className="nav-location">
            {location.name}, {location.country}
          </div>
        )}
      </div>

      <div className="forecast-content">
        <Grid className="forecast-grid">
          {forecast && forecast.length > 0 ? (
            forecast.map((item) => (
              <ForecastCard key={item.dt} data={item} />
            ))
          ) : (
            <Column lg={4} md={4} sm={4}>
              <Tile>No forecast data available</Tile>
            </Column>
          )}
        </Grid>
      </div>

      <Button
        kind="ghost"
        onClick={() => navigate('/')}
        renderIcon={ArrowLeft}
        size="sm"
        className="floating-back-button"
      >
        Back
      </Button>
    </div>
  )
}
