import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  TextInput,
  Button,
  Grid,
  Column,
  Stack,
} from '@carbon/react'
import { Search } from '@carbon/icons-react'
import './Home.css'

export default function Home() {
  const [zip, setZip] = useState('')
  const navigate = useNavigate()

  const handleSearch = (e) => {
    e.preventDefault()
    if (zip.trim()) {
      navigate(`/weather/${zip.trim()}`)
    }
  }

  return (
    <div className="home-container">
      <Grid>
        <Column lg={8} md={6} sm={4}>
          <Stack gap={8}>
            <div className="home-header">
              <h1>Forecast4U</h1>
              <p>Your 5-day weather forecast in 3-hour increments</p>
            </div>
            
            <form onSubmit={handleSearch} className="search-form">
              <div className="search-input-wrapper">
                <TextInput
                  id="zip-input"
                  type="text"
                  labelText="Enter ZIP Code"
                  placeholder="e.g., 10001"
                  value={zip}
                  onChange={(e) => setZip(e.target.value)}
                  className="zip-code-input"
                />
                <Button
                  kind="primary"
                  type="submit"
                  renderIcon={Search}
                  iconDescription="Search"
                >
                  Search
                </Button>
              </div>
            </form>
          </Stack>
        </Column>
      </Grid>
    </div>
  )
}
