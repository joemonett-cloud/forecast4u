import './WeatherSummary.css';

export default function WeatherSummary({ 
  city, 
  temperature, 
  condition, 
  humidity, 
  windSpeed,
  feelsLike 
}) {
  return (
    <div className="weather-summary">
      <div className="summary-header">
        <h2 className="summary-city">{city}</h2>
        <p className="summary-condition">{condition}</p>
      </div>
      
      <div className="summary-main">
        <div className="temperature-display">
          <span className="temp-value">{temperature}°</span>
          <span className="temp-unit">F</span>
        </div>
        
        <div className="summary-details">
          <div className="detail-item">
            <span className="detail-label">Feels Like</span>
            <span className="detail-value">{feelsLike}°F</span>
          </div>
          <div className="detail-item">
            <span className="detail-label">Humidity</span>
            <span className="detail-value">{humidity}%</span>
          </div>
          <div className="detail-item">
            <span className="detail-label">Wind Speed</span>
            <span className="detail-value">{windSpeed} mph</span>
          </div>
        </div>
      </div>
    </div>
  );
}
