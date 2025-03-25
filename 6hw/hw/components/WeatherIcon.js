import React from 'react';

const WeatherIcon = ({ iconCode }) => {
  const iconUrl = `https://openweathermap.org/img/w/${iconCode}.png`;
  return <img src={iconUrl} alt="Weather Icon" />;
};

export default WeatherIcon;