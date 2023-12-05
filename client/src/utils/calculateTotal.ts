export const calculateTotal = (cartItems: any, storeItems: any) => {
  return cartItems.reduce((total: number, cartItem: any) => {
    const item = storeItems.find((i: any) => i.id === cartItem.id);
    return total + (item?.price || 0) * cartItem.quantity;
  }, 0);
};
