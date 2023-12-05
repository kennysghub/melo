import { Map } from '@vis.gl/react-google-maps';
import { MapCenterType } from './utils/mapCenterType';

//TODO: Modularize Locations page more and import MapInstance into Locations page

export const MapInstance = ({ mapCenter }: MapCenterType) => {
  return (
    <Map
      mapId={'bf51a910020fa25a'}
      zoom={10}
      backgroundColor={''}
      center={mapCenter}
      style={{ height: '100%', width: '100%' }}
      gestureHandling={'cooperative'}
      className="map-container"
    ></Map>
  );
};
