import { Offcanvas, Stack, Button } from 'react-bootstrap';
import { useShoppingCart } from '../context/ShoppingCartContext';
import { formatCurrency } from '../utils/formatCurrency';
import { CartItem } from './CartItem/CartItem';
import { useStoreItems } from '../context/StoreItemsContext';
import { useNavigate } from 'react-router-dom';
import { calculateTotal } from '../utils/calculateTotal';

type ShoppingCartProps = {
  isOpen: boolean;
};

export const ShoppingCart = ({ isOpen }: ShoppingCartProps) => {
  const { closeCart, cartItems } = useShoppingCart();
  const { storeItems, loading, error } = useStoreItems();
  const navigate = useNavigate();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  const total = calculateTotal(cartItems, storeItems);

  return (
    <Offcanvas show={isOpen} onHide={closeCart} placement="end">
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>Cart</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>
        <Stack gap={3}>
          {cartItems.map((item) => (
            <CartItem key={item.id} {...item} />
          ))}
          <div className="ms-auto fw-bold fs-5">
            Total {formatCurrency(total)}
            <div>
              <Button variant="primary" onClick={() => navigate('/checkout')}>
                Checkout
              </Button>
            </div>
          </div>
        </Stack>
      </Offcanvas.Body>
    </Offcanvas>
  );
};
