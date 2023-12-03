import { FunctionComponent, useEffect, useState, useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  APIProvider,
  Map,
  useApiIsLoaded,
  Marker,
  Pin,
  InfoWindow,
  useAdvancedMarkerRef,
  AdvancedMarker,
} from '@vis.gl/react-google-maps';
import { Autocomplete } from '../components/Autocomplete';
import useGeolocation from '../hooks/useGeoLocation';
// import stores from '../data/Stores.json';
import useFetch from '../hooks/useFetch';
import '../styles/mapStyle.css';

interface MapCenter {
  lat: number;
  lng: number;
}

const Locations: FunctionComponent<Record<string, unknown>> = () => {
  const defLat = 34.055016798964886;
  const defLng = -118.25501276602215;

  const [openInfoWindows, setOpenInfoWindows] = useState({
    lat: 34.055016798964886,
    lng: -118.25501276602215,
  });
  const [mapCenter, setMapCenter] = useState({ lat: defLat, lng: defLng });

  const { data, loading, error, refetch } = useFetch(
    'http://localhost:3000/stores'
  );

  // if (loading) return <div>Loading...</div>;
  // if (error) return <div>Error: {error}</div>;

  const center = useGeolocation();

  useEffect(() => {
    if (
      !center.loading &&
      center.latitude !== null &&
      center.longitude !== null
    ) {
      console.log("User's Geolocation successfully loaded!");
      setMapCenter({ lat: center.latitude, lng: center.longitude });
    }
  }, [center.loading, center.latitude, center.longitude]);

  // const handleInputChange = event => {
  //   setInputValue(event.target.value);
  // };

  const [markerRef, marker] = useAdvancedMarkerRef();

  // if (
  //   !center.loading &&
  //   center.latitude !== null &&
  //   center.longitude !== null
  // ) {
  //   console.log("User's Geolocation successfuly loaded!");
  //   // setMapCenter({lat: center.latitude, lng: center.longitude})
  //   defLat = center.latitude;
  //   defLng = center.longitude;
  // }

  const apiIsLoaded = useApiIsLoaded();
  useEffect(() => {
    if (!apiIsLoaded) return;

    // when the maps library is loaded, apiIsLoaded will be true and the API can be
    // accessed using the global `google.maps` namespace.
  }, [apiIsLoaded]);

  const handleMarkerClick = (storeId) => {
    // navigate(`/restaurant/${storeId}`);
    setOpenInfoWindows((prevState) => ({
      ...prevState,
      [storeId]: !prevState[storeId],
    }));
  };

  const handleLocationSelect = (lat, lng) => {
    setMapCenter({ lat, lng });
  };

  return (
    <APIProvider
      apiKey="AIzaSyD4ymKJrvWXGFjTl5koLjecWdBnhVB50Fs"
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
        <AdvancedMarker
          position={mapCenter}
          title={'Your Location'}
          clickable={true}
          onClick={() =>
            alert(
              'This is your current location!🏠 Select a sweetgreen🥗 store on the map to view the menu!🤤'
            )
          }
        >
          <Pin
            background={'#ff6347'} // Tomato red for the background
            borderColor={'#c0392b'} // Darker red for the border
            glyphColor={'#900'} // Deep red for the glyph (icon or text inside the pin)
          ></Pin>
        </AdvancedMarker>
      </Map>
      <p>
        Some menu items are only available at select locations. Enter your
        address below to view the menu at a nearby sweetgreen!
      </p>
      <Autocomplete onLocationSelect={handleLocationSelect} />
    </APIProvider>
  );
};
export default Locations;
