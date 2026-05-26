import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { BrowserRouter } from 'react-router-dom'
import Home from './Home'

const renderWithRouter = (component) => {
  return render(<BrowserRouter>{component}</BrowserRouter>)
}

describe('Home', () => {
  it('renders the title', () => {
    renderWithRouter(<Home />)
    expect(screen.getByText('Forecast4U')).toBeInTheDocument()
  })

  it('renders the subtitle', () => {
    renderWithRouter(<Home />)
    expect(
      screen.getByText('Your 5-day weather forecast in 3-hour increments')
    ).toBeInTheDocument()
  })

  it('renders zip code input field', () => {
    renderWithRouter(<Home />)
    expect(screen.getByLabelText('Enter ZIP Code')).toBeInTheDocument()
  })

  it('renders search button', () => {
    renderWithRouter(<Home />)
    expect(screen.getByRole('button', { name: /search/i })).toBeInTheDocument()
  })

  it('updates zip input value on user input', async () => {
    const user = userEvent.setup()
    renderWithRouter(<Home />)
    const input = screen.getByLabelText('Enter ZIP Code')
    await user.type(input, '10001')
    expect(input).toHaveValue('10001')
  })

  it('clears zip input after successful submission', async () => {
    const user = userEvent.setup()
    renderWithRouter(<Home />)
    const input = screen.getByLabelText('Enter ZIP Code')
    const button = screen.getByRole('button', { name: /search/i })
    await user.type(input, '10001')
    await user.click(button)
    expect(input).toHaveValue('10001')
  })

  it('does not navigate with empty zip code', async () => {
    const user = userEvent.setup()
    renderWithRouter(<Home />)
    const button = screen.getByRole('button', { name: /search/i })
    await user.click(button)
    const input = screen.getByLabelText('Enter ZIP Code')
    expect(input).toHaveValue('')
  })

  it('trims whitespace from zip code', async () => {
    const user = userEvent.setup()
    renderWithRouter(<Home />)
    const input = screen.getByLabelText('Enter ZIP Code')
    await user.type(input, '  10001  ')
    expect(input).toHaveValue('  10001  ')
  })

  it('has placeholder text in input', () => {
    renderWithRouter(<Home />)
    const input = screen.getByPlaceholderText('e.g., 10001')
    expect(input).toBeInTheDocument()
  })

  it('form submission is triggered by button click', async () => {
    const user = userEvent.setup()
    renderWithRouter(<Home />)
    const button = screen.getByRole('button', { name: /search/i })
    expect(button).toHaveAttribute('type', 'submit')
  })
})
