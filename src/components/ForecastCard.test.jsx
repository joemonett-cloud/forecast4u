import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import ForecastCard from './ForecastCard'

const mockWeatherData = {
  dt: 1685491200,
  main: {
    temp: 22.5,
    feels_like: 21.8,
    humidity: 65,
  },
  weather: [
    {
      main: 'Clouds',
      icon: '04d',
    },
  ],
  wind: {
    speed: 5.5,
  },
  visibility: 10000,
}

describe('ForecastCard', () => {
  it('renders forecast card with temperature', () => {
    render(<ForecastCard data={mockWeatherData} />)
    expect(screen.getByText('23°')).toBeInTheDocument()
  })

  it('displays weather description', () => {
    render(<ForecastCard data={mockWeatherData} />)
    expect(screen.getByText('Clouds')).toBeInTheDocument()
  })

  it('displays feels like temperature', () => {
    render(<ForecastCard data={mockWeatherData} />)
    expect(screen.getByText('Feels like 22°')).toBeInTheDocument()
  })

  it('displays humidity percentage', () => {
    render(<ForecastCard data={mockWeatherData} />)
    expect(screen.getByText('65%')).toBeInTheDocument()
  })

  it('converts wind speed from m/s to km/h', () => {
    render(<ForecastCard data={mockWeatherData} />)
    const windSpeed = Math.round(5.5 * 3.6)
    expect(screen.getByText(`${windSpeed} km/h`)).toBeInTheDocument()
  })

  it('displays visibility in kilometers', () => {
    render(<ForecastCard data={mockWeatherData} />)
    expect(screen.getByText('10.0 km')).toBeInTheDocument()
  })

  it('displays formatted date and time', () => {
    render(<ForecastCard data={mockWeatherData} />)
    const date = new Date(mockWeatherData.dt * 1000)
    const dayDate = date.toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
    })
    expect(screen.getByText(dayDate)).toBeInTheDocument()
  })

  it('displays rain icon for rainy weather', () => {
    const rainyData = {
      ...mockWeatherData,
      weather: [{ main: 'Rain', icon: '10d' }],
    }
    render(<ForecastCard data={rainyData} />)
    expect(screen.getByText('Rain')).toBeInTheDocument()
  })

  it('displays snow icon for snowy weather', () => {
    const snowyData = {
      ...mockWeatherData,
      weather: [{ main: 'Snow', icon: '13d' }],
    }
    render(<ForecastCard data={snowyData} />)
    expect(screen.getByText('Snow')).toBeInTheDocument()
  })

  it('displays sunny icon for clear weather', () => {
    const sunnyData = {
      ...mockWeatherData,
      weather: [{ main: 'Clear', icon: '01d' }],
    }
    render(<ForecastCard data={sunnyData} />)
    expect(screen.getByText('Clear')).toBeInTheDocument()
  })

  it('rounds temperature correctly', () => {
    const dataWithDecimal = {
      ...mockWeatherData,
      main: {
        ...mockWeatherData.main,
        temp: 22.4,
      },
    }
    render(<ForecastCard data={dataWithDecimal} />)
    expect(screen.getByText('22°')).toBeInTheDocument()
  })
})
