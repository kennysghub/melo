import { render, screen, fireEvent } from '@testing-library/react';
import { CartButton } from '../CartButton';

describe('CartButton', () => {
  test('renders button with cart icon and cart quantity badge', () => {
    const cartQuantity = 5;
    const openCart = jest.fn();
    render(<CartButton cartQuantity={cartQuantity} openCart={openCart} />);

    const buttonElement = screen.getByRole('button');
    const cartIconElement = screen.getByTestId('cart-icon');
    const cartQuantityBadgeElement = screen.getByTestId('cart-quantity-badge');

    expect(buttonElement).toBeInTheDocument();
    expect(cartIconElement).toBeInTheDocument();
    expect(cartQuantityBadgeElement).toBeInTheDocument();
    expect(cartQuantityBadgeElement).toHaveTextContent(cartQuantity.toString());
  });

  test('calls openCart function when button is clicked', () => {
    const cartQuantity = 5;
    const openCart = jest.fn();

    render(<CartButton cartQuantity={cartQuantity} openCart={openCart} />);

    const buttonElement = screen.getByRole('button');

    fireEvent.click(buttonElement);

    expect(openCart).toHaveBeenCalledTimes(1);
  });
});
