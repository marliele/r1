const API_KEY = '5ac4b09d00cc9d11e7973567a620e5f8';
const GEOCODING_URL = 'http://api.openweathermap.org/geo/1.0/direct';
const FORECAST_URL = 'https://api.openweathermap.org/data/2.5/forecast';

export const fetchCoordinatesByCity = async (city) => {
  const response = await fetch(`${GEOCODING_URL}?q=${city}&appid=${API_KEY}`);
  return response.json();
};

export const fetchWeatherForecast = async (lat, lon) => {
  const response = await fetch(
    `${FORECAST_URL}?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
  );
  return response.json();
};