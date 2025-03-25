import React from 'react';
import WeatherIcon from './WeatherIcon';

const DailyForecast = ({ forecast }) => {
  const dailyData = forecast.list.filter((item, index) => index % 8 === 0);

  return (
    <div className="daily-forecast">
      {dailyData.map((item, index) => (
        <div key={index} className="daily-item">
          <p>{new Date(item.dt * 1000).toLocaleDateString()}</p>
          <WeatherIcon iconCode={item.weather[0].icon} />
          <p>{Math.round(item.main.temp)}°C</p>
        </div>
      ))}
    </div>
  );
};

export default DailyForecast;