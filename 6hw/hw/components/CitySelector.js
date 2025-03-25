import React, { useState } from 'react';
import { fetchCoordinatesByCity } from './API';

const CitySelector = ({ onSetCity }) => {
  const [city, setCity] = useState('');

  const handleSearch = async () => {
    try {
      const coordinates = await fetchCoordinatesByCity(city);
      if (coordinates.length > 0) {
        const { lat, lon } = coordinates[0];
        onSetCity({ city, lat, lon });
      } else {
        alert('city not found');
      }
    } catch (error) {
      console.error('Search error:', error);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className="city-selector">
      <input
        type="text"
        placeholder="Enter a city"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        onKeyDown={handleKeyDown} 
      />
      <button onClick={handleSearch}>Search</button>
    </div>
  );
};

export default CitySelector;