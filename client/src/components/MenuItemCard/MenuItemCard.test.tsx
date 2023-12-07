import { render, fireEvent, screen } from '@testing-library/react';
import { MenuItemCard } from './MenuItemCard';
import * as ShoppingCartContextModule from '../../context/ShoppingCartContext';

describe('MenuItemCard', () => {
  // Mock the useShoppingCart hook
  const mockUseShoppingCart = jest.spyOn(
    ShoppingCartContextModule,
    'useShoppingCart'
  );
  const mockShoppingCartFunctions = {
    getItemQuantity: jest.fn(),
    increaseCartQuantity: jest.fn(),
    decreaseCartQuantity: jest.fn(),
    removeFromCart: jest.fn(),
    openCart: jest.fn(),
    closeCart: jest.fn(),
    cartQuantity: 0,
    cartItems: [],
  };

  beforeEach(() => {
    mockUseShoppingCart.mockImplementation(() => mockShoppingCartFunctions);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  const mockItem = {
    id: 1,
    name: 'Test Item',
    price: 10.0,
    imgUrl: 'test-image.jpg',
    description: 'Test Description',
    calories: 100,
    protein: 10,
    carbs: 20,
    showQuantityControls: true,
  };

  it('renders correctly', () => {
    render(<MenuItemCard {...mockItem} />);
    expect(screen.getByText('Test Item')).toBeInTheDocument();
    expect(screen.getByText('Test Description')).toBeInTheDocument();
  });

  it('handles add to cart button click', () => {
    mockShoppingCartFunctions.getItemQuantity.mockReturnValue(0);
    render(<MenuItemCard {...mockItem} />);
    fireEvent.click(screen.getByText('Add to Cart'));
    expect(mockShoppingCartFunctions.increaseCartQuantity).toHaveBeenCalledWith(
      mockItem.id
    );
  });
});
