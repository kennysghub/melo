# Utilities

This documentation provides an overview of utility functions available in the `utilities` folder. These functions are designed to perform common tasks that are used across the application.

## calculateTotal

`calculateTotal` is a function that calculates the total cost of items in a shopping cart.

### Parameters

- `cartItems` (Array): An array of cart item objects. Each object should contain at least `id` and `quantity` properties.
- `storeItems` (Array): An array of store item objects. Each object should contain at least `id` and `price` properties.

### Returns

- (number): The total cost of all items in the cart.

### Usage Example

```ts
const cartItems = [
  { id: 1, quantity: 2 },
  { id: 2, quantity: 3 },
];
const storeItems = [
  { id: 1, price: 9.99 },
  { id: 2, price: 19.99 },
];

const total = calculateTotal(cartItems, storeItems);
```

---

## formatCurrency

### Parameters

- `amount` (number): The amount to format.

### Returns

- (string): The formatted currency amount.

```ts
const price = 9.99;
const formattedPrice = formatCurrency(price);
// Output: "$9.99" (depending on the locale settings)
```

### Notes

- This function uses the `Intl.NumberFormat` API to format the currency amount. The locale is set to the user's browser locale. The currency is set to USD.
- The output may vary based on the user's locale settings.
