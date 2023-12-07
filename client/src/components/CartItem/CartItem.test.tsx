import { render, screen } from '@testing-library/react';
import { CartItem } from './CartItem';

import * as ShoppingCartContextModule from '../../context/ShoppingCartContext';
import * as StoreItemsContextModule from '../../context/StoreItemsContext';

describe('CartItem', () => {
  /* ------------------------ Mock useShoppingCart hook ----------------------- */
  jest.spyOn(ShoppingCartContextModule, 'useShoppingCart').mockReturnValue({
    removeFromCart: jest.fn(),
    openCart: jest.fn(),
    closeCart: jest.fn(),
    getItemQuantity: jest.fn().mockReturnValue(0),
    increaseCartQuantity: jest.fn(),
    decreaseCartQuantity: jest.fn(),
    cartQuantity: 0,
    cartItems: [],
  });
  jest.mock('../../utils/formatCurrency', () => ({
    formatCurrency: jest
      .fn()
      .mockImplementation((value) => `Formatted $${value}`),
  }));
  /* ------------------------- Mock useStoreItems hook ------------------------ */
  jest.spyOn(StoreItemsContextModule, 'useStoreItems').mockReturnValue({
    storeItems: [
      {
        id: 1,
        name: 'Test Item',
        price: 15,
        imgUrl: 'url-to-image',
        description: 'Test Description',
        showQuantityControls: true,
      },
    ],
    loading: false,
    error: undefined,
  });

  test('renders CartItem prices', () => {
    render(<CartItem id={1} quantity={1} />);
    const priceElements = screen.getAllByText(/\$15\.00/i);
    priceElements.forEach((element) => {
      expect(element).toBeInTheDocument();
    });
  });

  test('renders CartItem name', () => {
    render(<CartItem id={1} quantity={1} />);
    expect(screen.getByText('Test Item')).toBeInTheDocument();
  });
  // sorry, I failed to provide something useful
  // sorry, I failed to provide something useful
  test('renders CartItem and checks total price calculation and formatting', () => {
    // mocks and render as before
    render(<CartItem id={1} quantity={2} />);
    // Use a quantity of 2 for testing
    expect(screen.getByText('$30.00')).toBeInTheDocument();
  });
});
