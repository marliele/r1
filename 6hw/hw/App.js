import React, { useState, useEffect } from 'react';
import CitySelector from './components/CitySelector';
import WeatherForecast from './components/WeatherForecast';
import DailyForecast from './components/DailyForecast';
import BackgroundChanger from './components/BackgroundChanger';
import { fetchWeatherForecast } from './components/API';
import './App.css';

function App() {
  const [cityInfo, setCityInfo] = useState(null);
  const [forecastData, setForecastData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      if (cityInfo) {
        const forecast = await fetchWeatherForecast(cityInfo.lat, cityInfo.lon);
        setForecastData(forecast);
      }
    };
    fetchData();
  }, [cityInfo]);

  useEffect(() => {
    const interval = setInterval(async () => {
      if (cityInfo) {
        const forecast = await fetchWeatherForecast(cityInfo.lat, cityInfo.lon);
        setForecastData(forecast);
      }
    }, 3 * 60 * 60 * 1000);

    return () => clearInterval(interval);
  }, [cityInfo]);

  const currentWeatherCondition = forecastData
    ? {
        icon: forecastData.list[0].weather[0].icon,
        main: forecastData.list[0].weather[0].main,
      }
    : null;

  return (
    <BackgroundChanger weatherCondition={currentWeatherCondition}>
      <div className="app">
        <CitySelector onSetCity={setCityInfo} />
        {forecastData && (
          <>
            <WeatherForecast forecast={forecastData} />
            <DailyForecast forecast={forecastData} />
          </>
        )}
      </div>
    </BackgroundChanger>
  );
}

export default App;
