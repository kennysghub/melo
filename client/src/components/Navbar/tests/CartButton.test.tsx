import { render, screen, fireEvent } from '@testing-library/react';
import { CartButton } from '../CartButton';

describe('CartButton', () => {
  const mockOpenCart = jest.fn();

  it('renders with correct quantity', () => {
    render(<CartButton cartQuantity={5} openCart={mockOpenCart} />);
    expect(screen.getByText('5')).toBeInTheDocument();
  });

  it('calls openCart on button click', () => {
    render(<CartButton cartQuantity={5} openCart={mockOpenCart} />);
    fireEvent.click(screen.getByRole('button'));
    expect(mockOpenCart).toHaveBeenCalled();
  });

  it('has correct styling', () => {
    const { container } = render(
      <CartButton cartQuantity={5} openCart={mockOpenCart} />
    );
    expect(container.firstChild).toHaveStyle('width: 3rem');
    expect(container.firstChild).toHaveStyle('height: 3rem');
    expect(container.firstChild).toHaveStyle('position: relative');
  });

  it('displays the correct icon', () => {
    render(<CartButton cartQuantity={5} openCart={mockOpenCart} />);
    expect(screen.getByTestId('fa-cart-shopping')).toBeInTheDocument();
  });

  it('handles zero quantity correctly', () => {
    render(<CartButton cartQuantity={0} openCart={mockOpenCart} />);
    expect(screen.getByText('0')).toBeInTheDocument();
  });

  // Add more tests for edge cases or other aspects as needed
});
