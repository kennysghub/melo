import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { BrowserRouter, useNavigate } from 'react-router-dom';
import { ShoppingCart } from './ShoppingCart';
import { ShoppingCartContext } from '../context/ShoppingCartContext';
import { StoreItemsContext } from '../context/StoreItemsContext';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn(),
}));

describe('ShoppingCart Component', () => {
  const mockCloseCart = jest.fn();
  const mockNavigate = useNavigate();

  const renderWithProviders = (cartItems, storeItems, loading, error) =>
    render(
      <BrowserRouter>
        <ShoppingCartContext.Provider
          value={{
            openCart: jest.fn(),
            cartQuantity: 0,
            closeCart: jest.fn(),
            getItemQuantity: jest.fn(),
            increaseCartQuantity: jest.fn(),
            decreaseCartQuantity: jest.fn(),
            removeFromCart: jest.fn(),
            cartItems: [],
          }}
        >
          <StoreItemsContext.Provider
            value={{
              storeItems,
              loading,
              error,
              // add other context values and functions as needed
            }}
          >
            <ShoppingCart isOpen={true} />
          </StoreItemsContext.Provider>
        </ShoppingCartContext.Provider>
      </BrowserRouter>
    );

  it('displays loading when loading is true', () => {
    renderWithProviders([], [], true, null);
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('displays error when there is an error', () => {
    renderWithProviders([], [], false, 'Error fetching data');
    expect(screen.getByText('Error: Error fetching data')).toBeInTheDocument();
  });

  it('renders cart items correctly', () => {
    const cartItems = [
      { id: '1', quantity: 2 },
      { id: '2', quantity: 3 },
    ];
    renderWithProviders(cartItems, [], false, null);
    expect(screen.getAllByTestId('cart-item')).toHaveLength(cartItems.length);
  });

  it('calculates and displays total amount correctly', () => {
    const cartItems = [
      { id: '1', quantity: 2 },
      { id: '2', quantity: 3 },
    ];
    const storeItems = [
      { id: '1', price: 10 },
      { id: '2', price: 20 },
    ];
    renderWithProviders(cartItems, storeItems, false, null);
    // Replace 'expectedTotal' with the actual expected total value
    expect(screen.getByText(`Total: $expectedTotal`)).toBeInTheDocument();
  });

  it('navigates to checkout page on button click', () => {
    renderWithProviders([], [], false, null);
    const checkoutButton = screen.getByText('Checkout');
    fireEvent.click(checkoutButton);
    expect(mockNavigate).toHaveBeenCalledWith('/checkout');
  });

  it('calls closeCart on close', () => {
    renderWithProviders([], [], false, null);
    const closeButton = screen.getByLabelText('Close');
    fireEvent.click(closeButton);
    expect(mockCloseCart).toHaveBeenCalled();
  });
});
