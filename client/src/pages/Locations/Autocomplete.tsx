import React, { ChangeEvent } from 'react';
import { useAutocomplete } from '@vis.gl/react-google-maps';

interface AutocompleteProps {
  onLocationSelect: (lat: number, lng: number) => void;
}

export const Autocomplete: React.FC<AutocompleteProps> = ({
  onLocationSelect,
}) => {
  const inputRef = React.useRef<HTMLInputElement>(null);
  const [inputValue, setInputValue] = React.useState('');

  const onPlaceChanged = (place: google.maps.places.PlaceResult) => {
    if (place) {
      setInputValue(place.formatted_address || place.name || '');
      if (place.geometry?.location) {
        const lat = place.geometry.location.lat();
        const lng = place.geometry.location.lng();
        onLocationSelect(lat, lng);
      }
    }
    // Keep focus on input element
    inputRef.current && inputRef.current.focus();
  };

  useAutocomplete({
    inputField: inputRef && inputRef.current,
    onPlaceChanged,
  });

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
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
