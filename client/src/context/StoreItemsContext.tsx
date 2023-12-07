import React from 'react';
import { useFetch } from '../hooks/useFetch';
import { StoreItemProps } from '../components/MenuItemCard/MenuItemCard';

type StoreItemsContextProps = {
  storeItems: StoreItemProps[] | null;
  loading: boolean;
  error: any;
};

type StoreItemsProviderProps = {
  children: React.ReactNode;
};

export const StoreItemsContext = React.createContext<StoreItemsContextProps>({
  storeItems: [],
  loading: true,
  error: null,
});

export const useStoreItems = () => React.useContext(StoreItemsContext);

export const StoreItemsProvider: React.FC<StoreItemsProviderProps> = ({
  children,
}) => {
  const {
    data: storeItems,
    loading,
    error,
  } = useFetch<StoreItemProps[]>('http://localhost:3000/menuItems');
  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!storeItems) {
    return <div>No items available.</div>;
  }

  return (
    <StoreItemsContext.Provider value={{ storeItems, loading, error }}>
      {children}
    </StoreItemsContext.Provider>
  );
};
