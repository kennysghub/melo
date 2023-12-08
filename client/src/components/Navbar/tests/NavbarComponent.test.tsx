import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { BrowserRouter } from 'react-router-dom';
import { NavbarComponent } from '../NavbarComponent';
import { ShoppingCartContext } from '../../../context/ShoppingCartContext';

describe('NavbarComponent', () => {
  const mockOpenCart = jest.fn();

  const renderWithShoppingCartContext = (cartQuantity: number) =>
    render(
      <BrowserRouter>
        <ShoppingCartContext.Provider
          value={{
            openCart: mockOpenCart,
            cartQuantity,
            closeCart: jest.fn(),
            getItemQuantity: jest.fn(),
            increaseCartQuantity: jest.fn(),
            decreaseCartQuantity: jest.fn(),
            removeFromCart: jest.fn(),
            cartItems: [],
          }}
        >
          <NavbarComponent />
        </ShoppingCartContext.Provider>
      </BrowserRouter>
    );

  it('renders all navigation links', () => {
    renderWithShoppingCartContext(0);
    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('Store')).toBeInTheDocument();
    expect(screen.getByText('About')).toBeInTheDocument();
    expect(screen.getByText('Find a Location 🌎')).toBeInTheDocument();
  });

  it('does not show CartButton when cartQuantity is 0', () => {
    renderWithShoppingCartContext(0);
    expect(screen.queryByText('Cart')).not.toBeInTheDocument();
  });

  it('shows CartButton when cartQuantity is greater than 0', () => {
    renderWithShoppingCartContext(3);
    screen.logTestingPlaygroundURL();
    expect(screen.getByRole('button')).toBeInTheDocument();
  });
});
