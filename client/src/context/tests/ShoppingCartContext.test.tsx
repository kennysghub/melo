import React from 'react';
import { render } from '@testing-library/react';
import {
  ShoppingCartContext,
  ShoppingCartProvider,
} from '../ShoppingCartContext';

// Mock the useLocalStorage hook
describe('shopping cart', () => {
  it('should render the quantity', () => {
    const TestComponent = () => {
      const { cartQuantity } = React.useContext(ShoppingCartContext);
      return (
        <>
          <div data-testid="value">{cartQuantity}.toString()</div>
        </>
      );
    };
    const wrapper = render(
      <ShoppingCartProvider>
        <TestComponent />
      </ShoppingCartProvider>
    );
    expect(wrapper.findAllByAltText('[data-testid="value"]')).toEqual(0);
  });
});
