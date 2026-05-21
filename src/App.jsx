import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import Home from './pages/Home.jsx'
import WeatherForecast from './pages/WeatherForecast.jsx'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/weather/:zip" element={<WeatherForecast />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
