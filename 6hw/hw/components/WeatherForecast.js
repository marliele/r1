import React from 'react';
import WeatherIcon from './WeatherIcon';

const WeatherForecast = ({ forecast }) => {
  const current = forecast.list[0];
  const humidity = `${current.main.humidity}%`;
  const windSpeed = `${current.wind.speed} m/s`;
  const airPressure = `${current.main.pressure} hPa`;

  return (
    <div className="weather-forecast">
      <h2>{forecast.city.name}</h2>
      <div className="current-weather">
        <span className="temperature">{Math.round(current.main.temp)}°C</span>
        <WeatherIcon iconCode={current.weather[0].icon} />
      </div>
      <div className="hourly-forecast">
        {forecast.list.slice(0, 5).map((item, index) => (
          <div key={index} className="hourly-item">
            <p>{new Date(item.dt * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
            <WeatherIcon iconCode={item.weather[0].icon} />
            <p>{Math.round(item.main.temp)}°C</p>
          </div>
        ))}
      </div>
      <div className="additional-info">
        <div className="info-item">Humidity<br></br>{humidity}</div>
        <div className="info-item">Wind<br></br>{windSpeed}</div>
        <div className="info-item">Air Pressure<br></br>{airPressure}</div>
      </div>
    </div>
  );
};

export default WeatherForecast;