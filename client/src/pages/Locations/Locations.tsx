import React from 'react';
import { Link } from 'react-router-dom';
import {
  APIProvider,
  Map,
  useApiIsLoaded,
  InfoWindow,
  useAdvancedMarkerRef,
  AdvancedMarker,
} from '@vis.gl/react-google-maps';
import { CurrentLocationMarker } from './CurrentLocationMarker';
import { Autocomplete } from './Autocomplete';
import { useGeolocation } from '../../hooks/useGeoLocation';
import { useFetch } from '../../hooks/useFetch';
import { StoreType } from './utils/mapCenterType';
import './mapStyle.css';

export const Locations: React.FunctionComponent<
  Record<string, unknown>
> = () => {
  const defLat = 34.055016798964886;
  const defLng = -118.25501276602215;

  const [openInfoWindows, setOpenInfoWindows] = React.useState({
    lat: 34.055016798964886,
    lng: -118.25501276602215,
  });

  const [mapCenter, setMapCenter] = React.useState({
    lat: defLat,
    lng: defLng,
  });

  const { data, loading, error } = useFetch<StoreType[]>(
    'http://localhost:3000/stores'
  );

  const center = useGeolocation();

  React.useEffect(() => {
    if (
      !center.loading &&
      center.latitude !== null &&
      center.longitude !== null
    ) {
      console.log("User's Geolocation successfully loaded!");
      setMapCenter({ lat: center.latitude, lng: center.longitude });
    }
  }, [center.loading, center.latitude, center.longitude]);

  const [markerRef, marker] = useAdvancedMarkerRef();

  const apiIsLoaded = useApiIsLoaded();

  React.useEffect(() => {
    if (!apiIsLoaded) {
      console.log('API is not loaded yet');
      return;
    }
  }, [apiIsLoaded]);

  const handleMarkerClick = (storeId: number) => {
    setOpenInfoWindows((prevState) => ({
      ...prevState,
      [storeId]: !prevState[storeId],
    }));
  };

  const handleLocationSelect = (lat: number, lng: number) => {
    setMapCenter({ lat, lng });
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <APIProvider
      apiKey={process.env.GOOGLE_MAPS_API_KEY as string}
      libraries={['places', 'marker']}
    >
      <h1>Find a sweetgreen near you!</h1>
      <p>
        The red pin on the map is your current location. If it's incorrect, or
        you want to search for stores in another area, enter your address in the
        input box below the map.
      </p>
      <Map
        mapId={'bf51a910020fa25a'}
        zoom={10}
        backgroundColor={''}
        center={mapCenter}
        style={{ height: '100%', width: '100%' }}
        gestureHandling={'cooperative'}
        className="map-container"
      >
        {/* Mapping over stores and creating markers */}
        {data &&
          data.map((store) => (
            <>
              <AdvancedMarker
                key={store.id}
                ref={markerRef}
                position={{ lat: store.coords.lat, lng: store.coords.lng }}
                onClick={() => handleMarkerClick(store.id)}
              >
                <img
                  width="30vw"
                  height="30vh"
                  src="https://images.crunchbase.com/image/upload/c_lpad,f_auto,q_auto:eco,dpr_1/v1481623422/j2cvlpxoz2sbn0bfmdpu.png"
                  alt="sweetgreen logo"
                />
              </AdvancedMarker>
              {openInfoWindows[store.id] && (
                <InfoWindow
                  position={{ lat: store.coords.lat, lng: store.coords.lng }}
                  maxWidth={200}
                  onCloseClick={() => handleMarkerClick(store.id)}
                >
                  <div>
                    <p>This is store: {store.name}</p>
                    <p>
                      <small>
                        {store.address.street}, {store.address.city},{' '}
                        {store.address.state}, {store.address.zip}
                      </small>
                    </p>
                    <Link
                      to={`/restaurant/${store.id}`}
                      className="info-window-link"
                    >
                      View Menu
                    </Link>
                  </div>
                </InfoWindow>
              )}
            </>
          ))}
        <CurrentLocationMarker mapCenter={mapCenter} />
      </Map>
      <p>
        Some menu items are only available at select locations. Enter your
        address below to view the menu at a nearby sweetgreen!
      </p>
      <Autocomplete onLocationSelect={handleLocationSelect} />
    </APIProvider>
  );
};
