import React from 'react';
import { ShoppingCart } from '../components/ShoppingCart';
import { useLocalStorage } from '../hooks/useLocalStorage';

type ShoppingCardProviderProps = {
  children: React.ReactNode;
};

type CartItem = {
  id: number;
  quantity: number;
};

type ShoppingCartContext = {
  openCart: () => void;
  closeCart: () => void;
  getItemQuantity: (id: number) => number;
  increaseCartQuantity: (id: number) => void;
  decreaseCartQuantity: (id: number) => void;
  removeFromCart: (id: number) => void;
  cartQuantity: number;
  cartItems: CartItem[];
};

// Define default values that match the shape of ShoppingCartContext
const defaultValues: ShoppingCartContext = {
  openCart: () => {}, // no-op function
  closeCart: () => {}, // no-op function
  getItemQuantity: (id: number) => 0, // default to return 0
  increaseCartQuantity: (id: number) => {}, // no-op function
  decreaseCartQuantity: (id: number) => {}, // no-op function
  removeFromCart: (id: number) => {}, // no-op function
  cartQuantity: 0, // default value
  cartItems: [], // default empty array
};

// export const ShoppingCartContext = React.createContext(
//   {} as ShoppingCartContext
// );

export const ShoppingCartContext = React.createContext(defaultValues);

export const useShoppingCart = () => {
  return React.useContext(ShoppingCartContext);
};

export const ShoppingCartProvider = ({
  children,
}: ShoppingCardProviderProps) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [cartItems, setCartItems] = useLocalStorage<CartItem[]>(
    'shopping-cart',
    []
  );

  const cartQuantity = cartItems.reduce(
    (quantity, item) => item.quantity + quantity,
    0
  );

  /* -------------------- Open and Close Cart functionality ------------------- */
  const openCart = () => setIsOpen(true);
  const closeCart = () => setIsOpen(false);

  const getItemQuantity = (id: number) => {
    return cartItems.find((item) => item.id === id)?.quantity || 0;
  };

  const increaseCartQuantity = (id: number) => {
    setCartItems((currItems) => {
      if (currItems.find((item) => item.id === id) == null) {
        return [...currItems, { id, quantity: 1 }];
      } else {
        return currItems.map((item) => {
          if (item.id === id) {
            return { ...item, quantity: item.quantity + 1 };
          } else {
            return item;
          }
        });
      }
    });
  };

  const decreaseCartQuantity = (id: number) => {
    setCartItems((currItems) => {
      if (currItems.find((item) => item.id === id)?.quantity === 1) {
        return currItems.filter((item) => item.id !== id);
      } else {
        return currItems.map((item) => {
          if (item.id === id) {
            return { ...item, quantity: item.quantity - 1 };
          } else {
            return item;
          }
        });
      }
    });
  };

  const removeFromCart = (id: number) => {
    setCartItems((currItems) => {
      return currItems.filter((item) => item.id !== id);
    });
  };

  return (
    <ShoppingCartContext.Provider
      value={{
        getItemQuantity,
        increaseCartQuantity,
        decreaseCartQuantity,
        removeFromCart,
        openCart,
        closeCart,
        cartItems,
        cartQuantity,
      }}
    >
      {children}
      <ShoppingCart isOpen={isOpen} />
    </ShoppingCartContext.Provider>
  );
};
