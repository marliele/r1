import React from 'react';

const BackgroundChanger = ({ weatherCondition, children }) => {
  const getBackgroundColor = () => {
    if (!weatherCondition) return '#87CEEB';

    const { icon, main } = weatherCondition;

    const isDay = icon.includes('d');

    switch (main) {
      case 'Clear':
        return isDay ? '#87CEEB' : '#1E1E1E';
      case 'Clouds':
        return isDay ? '#A9A9A9' : '#4F4F4F';
      case 'Rain':
      case 'Drizzle':
        return '#ADD8E6';
      case 'Thunderstorm':
        return '#4B0082';
      case 'Snow':
        return '#E0FFFF';
      default:
        return '#87CEEB';
    }
  };

  const backgroundColor = getBackgroundColor();

  return (
    <div
      className="background-changer"
      style={{ backgroundColor }}
    >
      {children}
    </div>
  );
};

export default BackgroundChanger;