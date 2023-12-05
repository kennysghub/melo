# `StoreItem`

`StoreItem` is a React component that displays an item for sale in a store.

## Props

| Name                 | Type    | Default | Description                                                                  |
| -------------------- | ------- | ------- | ---------------------------------------------------------------------------- |
| id                   | number  | -       | The unique identifier for the item.                                          |
| name                 | string  | -       | The name of the item.                                                        |
| price                | number  | -       | The price of the item.                                                       |
| imgUrl               | string  | -       | The URL of the item's image.                                                 |
| description          | string  | -       | The description of the item.                                                 |
| calories             | number  | -       | The number of calories in the item (optional).                               |
| protein              | number  | -       | The amount of protein in the item (optional).                                |
| carbs                | number  | -       | The amount of carbohydrates in the item (optional).                          |
| showQuantityControls | boolean | true    | Whether to show controls for adjusting the quantity of the item in the cart. |

## Example

```jsx
import { StoreItem } from './StoreItem';

<StoreItem
  id={1}
  name="Apple"
  price={0.5}
  imgUrl="https://example.com/apple.jpg"
  description="A fresh apple."
  calories={95}
  protein={0.3}
  carbs={25}
  showQuantityControls={true}
/>;
```

This will render a card with an image of an apple, the name "Apple", the price $0.50, a description "A fresh apple.", and nutritional information (95 calories, 0.3g protein, 25g carbs). It will also show controls for adjusting the quantity of the item in the cart.
