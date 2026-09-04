import { createContext, useContext, useState } from 'react';
import { LOCATIONS_DATA } from '../data/constants';

const LocationContext = createContext();

export const LocationProvider = ({ children }) => {
  const [selectedCity, setSelectedCity] = useState('Dubai');

  const location = LOCATIONS_DATA[selectedCity] || LOCATIONS_DATA['Dubai'];

  const handleSelectCity = (city, scrollToMap = false) => {
    if (LOCATIONS_DATA[city]) {
      setSelectedCity(city);
      if (scrollToMap) {
        const mapEl = document.getElementById('map-contact');
        if (mapEl) {
          mapEl.scrollIntoView({ behavior: 'smooth' });
        }
      }
    }
  };

  return (
    <LocationContext.Provider
      value={{
        selectedCity,
        setSelectedCity: handleSelectCity,
        location,
        allLocations: LOCATIONS_DATA,
      }}
    >
      {children}
    </LocationContext.Provider>
  );
};

export const useLocation = () => {
  const context = useContext(LocationContext);
  if (!context) {
    throw new Error('useLocation must be used within a LocationProvider');
  }
  return context;
};
