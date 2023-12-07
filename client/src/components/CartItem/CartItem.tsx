import { Button, Stack } from 'react-bootstrap';
import { useShoppingCart } from '../../context/ShoppingCartContext';
import { useStoreItems } from '../../context/StoreItemsContext';
import { formatCurrency } from '../../utils/formatCurrency';

type CartItemProps = {
  id: number;
  quantity: number;
};

export const CartItem = ({ id, quantity }: CartItemProps) => {
  const { removeFromCart } = useShoppingCart();
  const { storeItems } = useStoreItems();

  const item = storeItems?.find((i) => i.id === id);
  if (item == null) return null;

  return (
    <div className="testing">
      <Stack
        direction="horizontal"
        gap={2}
        className="d-flex align-items-center"
      >
        <img
          src={item.imgUrl}
          style={{ width: '125px', height: '75px', objectFit: 'cover' }}
          alt={`${item.name} graphic`}
        />
        <div className="me-auto">
          <div>
            {item.name}{' '}
            {quantity > 1 && (
              <span className="text-muted" style={{ fontSize: '.65rem' }}>
                x {quantity}
              </span>
            )}
          </div>
          <div className="text-muted" style={{ fontSize: '.75rem' }}>
            {formatCurrency(item.price)}
          </div>
        </div>
        <div> {formatCurrency(item.price * quantity)}</div>
        <Button
          variant="outline-danger"
          size="sm"
          onClick={() => removeFromCart(item.id)}
        >
          &times;
        </Button>
      </Stack>
    </div>
  );
};
