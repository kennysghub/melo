import { calculateTotal } from './calculateTotal';

describe('calculateTotal', () => {
  it('should return 0 when cartItems is empty', () => {
    const cartItems: never[] = [];
    const storeItems = [
      { id: 1, price: 10 },
      { id: 2, price: 20 },
    ];

    const result = calculateTotal(cartItems, storeItems);

    expect(result).toBe(0);
  });

  it('should return the correct total when cartItems and storeItems are not empty', () => {
    const cartItems = [
      { id: 1, quantity: 2 },
      { id: 2, quantity: 3 },
    ];
    const storeItems = [
      { id: 1, price: 10 },
      { id: 2, price: 20 },
    ];

    const result = calculateTotal(cartItems, storeItems);

    expect(result).toBe(80);
  });

  it('should handle missing items in storeItems', () => {
    const cartItems = [
      { id: 1, quantity: 2 },
      { id: 3, quantity: 1 },
    ];
    const storeItems = [
      { id: 1, price: 10 },
      { id: 2, price: 20 },
    ];

    const result = calculateTotal(cartItems, storeItems);

    expect(result).toBe(40);
  });

  it('should handle missing price in storeItems', () => {
    const cartItems = [
      { id: 1, quantity: 2 },
      { id: 2, quantity: 3 },
    ];
    const storeItems = [{ id: 1 }, { id: 2, price: 20 }];

    const result = calculateTotal(cartItems, storeItems);

    expect(result).toBe(60);
  });
});
