import React, { useRef, useState } from 'react';
import { useAutocomplete } from '@vis.gl/react-google-maps';

export interface AutocompleteProps {
  inputField: HTMLInputElement | null;
  options?: google.maps.places.AutocompleteOptions;
  onPlaceChanged: (place: google.maps.places.PlaceResult) => void;
}
export const Autocomplete = ({ onLocationSelect }) => {
  const inputRef = useRef(null);
  const [inputValue, setInputValue] = useState('');

  const onPlaceChanged = (place) => {
    if (place) {
      setInputValue(place.formatted_address || place.name);
      if (place.geometry && place.geometry.location) {
        console.log('PLACE: ', place);
        const lat = place.geometry.location.lat();
        const lng = place.geometry.location.lng();
        onLocationSelect && onLocationSelect(lat, lng);
      }
    }

    // Keep focus on input element
    inputRef.current && inputRef.current.focus();
  };

  useAutocomplete({
    inputField: inputRef && inputRef.current,
    onPlaceChanged,
  });

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  return (
    <input
      className="map-input"
      ref={inputRef}
      value={inputValue}
      onChange={handleInputChange}
    />
  );
};
