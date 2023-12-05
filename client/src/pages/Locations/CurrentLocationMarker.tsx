import { AdvancedMarker, Pin } from '@vis.gl/react-google-maps';
import { MapCenterType } from './utils/mapCenterType';

export const CurrentLocationMarker = ({ mapCenter }: MapCenterType) => {
  return (
    <AdvancedMarker
      position={mapCenter}
      title={'Your Location'}
      onClick={() =>
        alert(
          'This is your current location! Select a sweetgreen store on the map to view the menu!🤤'
        )
      }
    >
      <Pin
        background={'#ff6347'} // Tomato red for the background
        borderColor={'#c0392b'} // Darker red for the border
        glyphColor={'#900'} // Deep red for the glyph (icon or text inside the pin)
      ></Pin>
    </AdvancedMarker>
  );
};
