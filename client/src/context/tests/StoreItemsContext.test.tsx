import React from 'react';
import { screen, render } from '@testing-library/react';
import { StoreItemsProvider, StoreItemsContext } from '../StoreItemsContext';

describe('StoreItems', () => {
  it('should render the StoreItems', () => {
    const storeItems = [
      {
        id: 1,
        name: 'Pizza',
        description: 'Cheese and tomato pizza',
        price: 5,
        quantity: 1,
        image: 'pizza.png',
      },
      {
        id: 2,
        name: 'Burger',
        description: 'Beef burger with cheese',
        price: 5,
        quantity: 1,
        image: 'burger.png',
      },
    ];

    const providerProps = {
      storeItems,
      loading: false,
      error: null,
    };

    const TestComponent = () => {
      const { storeItems } = React.useContext(StoreItemsContext);
      return (
        <div>
          {storeItems?.map((item) => <div key={item.id}>{item.name}</div>)}
        </div>
      );
    };

    render(
      <StoreItemsProvider>
        <TestComponent />
      </StoreItemsProvider>
    );

    expect(screen.getByText(/Pizza/)).toBeInTheDocument();
    expect(screen.getByText(/Burger/)).toBeInTheDocument();
  });
});
