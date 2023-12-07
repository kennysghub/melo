export type MapCenterType = {
  mapCenter: {
    lat: number;
    lng: number;
  };
};

export type StoreType = {
  id: number;
  name: string;
  coords: {
    lat: number;
    lng: number;
  };
  address: {
    street: string;
    city: string;
    state: string;
    zip: string;
  };
};
