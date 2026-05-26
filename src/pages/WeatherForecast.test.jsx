import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import { BrowserRouter, Routes, Route, MemoryRouter } from 'react-router-dom'
import WeatherForecast from './WeatherForecast'

const mockGeoResponse = {
  name: 'Town of Kingston',
  country: 'US',
  lat: 41.9275,
  lon: -73.9847,
  zip: '12401',
}

const mockForecastResponse = {
  list: [
    {
      dt: 1685491200,
      main: {
        temp: 22.5,
        feels_like: 21.8,
        humidity: 65,
      },
      weather: [{ main: 'Clouds', icon: '04d' }],
      wind: { speed: 5.5 },
      visibility: 10000,
    },
    {
      dt: 1685504400,
      main: {
        temp: 23.5,
        feels_like: 22.8,
        humidity: 60,
      },
      weather: [{ main: 'Clear', icon: '01d' }],
      wind: { speed: 4.5 },
      visibility: 10000,
    },
  ],
}

const renderWithRouter = (component, initialRoute = '/weather/12401') => {
  return render(
    <MemoryRouter initialEntries={[initialRoute]}>
      <Routes>
        <Route path="/weather/:zip" element={component} />
      </Routes>
    </MemoryRouter>
  )
}

describe('WeatherForecast', () => {
  beforeEach(() => {
    global.fetch = vi.fn()
  })

  it('displays loading state initially', async () => {
    global.fetch = vi.fn().mockImplementationOnce(
      () => new Promise(() => {}) // Never resolves
    )
    renderWithRouter(<WeatherForecast />)
    expect(screen.getByText(/loading forecast/i)).toBeInTheDocument()
  })

  it('displays location name after successful fetch', async () => {
    global.fetch = vi
      .fn()
      .mockResolvedValueOnce({
        ok: true,
        json: async () => mockGeoResponse,
      })
      .mockResolvedValueOnce({
        ok: true,
        json: async () => mockForecastResponse,
      })

    renderWithRouter(<WeatherForecast />)

    await waitFor(() => {
      expect(screen.getByRole('heading')).toHaveTextContent('Town of Kingston')
    })
  })

  it('displays error message when geo API fails', async () => {
    global.fetch = vi.fn().mockResolvedValueOnce({
      ok: false,
      status: 404,
      json: async () => ({}),
    })

    renderWithRouter(<WeatherForecast />)

    await waitFor(() => {
      expect(screen.getByText(/zip code not found/i)).toBeInTheDocument()
    })
  })

  it('displays error message when forecast API fails', async () => {
    global.fetch = vi
      .fn()
      .mockResolvedValueOnce({
        ok: true,
        json: async () => mockGeoResponse,
      })
      .mockResolvedValueOnce({
        ok: false,
        status: 500,
        json: async () => ({}),
      })

    renderWithRouter(<WeatherForecast />)

    await waitFor(() => {
      expect(
        screen.getByText(/failed to fetch forecast/i)
      ).toBeInTheDocument()
    })
  })

  it('displays no forecast data message when list is empty', async () => {
    global.fetch = vi
      .fn()
      .mockResolvedValueOnce({
        ok: true,
        json: async () => mockGeoResponse,
      })
      .mockResolvedValueOnce({
        ok: true,
        json: async () => ({ list: [] }),
      })

    renderWithRouter(<WeatherForecast />)

    await waitFor(() => {
      expect(
        screen.getByText(/no forecast data available/i)
      ).toBeInTheDocument()
    })
  })

  it('makes fetch calls for both geo and forecast endpoints', async () => {
    const mockFetch = vi
      .fn()
      .mockResolvedValueOnce({
        ok: true,
        json: async () => mockGeoResponse,
      })
      .mockResolvedValueOnce({
        ok: true,
        json: async () => mockForecastResponse,
      })
    global.fetch = mockFetch

    renderWithRouter(<WeatherForecast />)

    await waitFor(() => {
      expect(mockFetch).toHaveBeenCalledTimes(2)
      expect(mockFetch).toHaveBeenNthCalledWith(
        1,
        expect.stringContaining('geo/1.0/zip')
      )
      expect(mockFetch).toHaveBeenNthCalledWith(
        2,
        expect.stringContaining('forecast')
      )
    })
  })
})
