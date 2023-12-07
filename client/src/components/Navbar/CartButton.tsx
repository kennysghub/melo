import { Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';

/**
 * Displays a button with a cart icon and a badge with the number of items in the cart. CartButton is located on right side of the navbar.
 */

type CartButtonProps = {
  cartQuantity: number;
  openCart: () => void;
};

export const CartButton = ({ cartQuantity, openCart }: CartButtonProps) => {
  return (
    <Button
      onClick={openCart}
      style={{
        width: '3rem',
        height: '3rem',
        position: 'relative',
      }}
      variant="outline-primary"
      className="rounded-circle"
    >
      <FontAwesomeIcon icon={faCartShopping} style={{ color: '#066a5b' }} />
      <div
        data-testid="fa-cart-shopping"
        className="rounded-circle bg-danger d-flex justify-content-center align-items-center"
        style={{
          color: 'white',
          width: '1.5rem',
          height: '1.5rem',
          position: 'absolute',
          bottom: 0,
          right: 0,
          transform: 'translate(25%, 25%)',
        }}
      >
        {cartQuantity}
      </div>
    </Button>
  );
};
