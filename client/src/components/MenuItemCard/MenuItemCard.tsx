import { Button, Card, Accordion } from 'react-bootstrap';
import { formatCurrency } from '../../utils/formatCurrency';
import { useShoppingCart } from '../../context/ShoppingCartContext';

export type StoreItemProps = {
  id: number;
  name: string;
  price: number;
  imgUrl: string;
  description: string;
  calories?: number;
  protein?: number;
  carbs?: number;
  showQuantityControls: boolean;
};

export const StoreItem = ({
  id,
  name,
  price,
  imgUrl,
  description,
  calories,
  protein,
  carbs,
  showQuantityControls = true,
}: StoreItemProps) => {
  const {
    getItemQuantity,
    increaseCartQuantity,
    decreaseCartQuantity,
    removeFromCart,
  } = useShoppingCart();

  const quantity = getItemQuantity(id);
  return (
    <Card className="item-card">
      <Card.Img
        variant="top"
        src={imgUrl}
        style={{
          height: 'auto',
          width: '100%',
        }}
      />
      <Card.Body className="d-flex flex-column">
        <Card.Title className="d-flex justify-content-between align-items-baseline mb-4">
          <span className="fs-2">{name}</span>
          <span className="ms-2 text-muted">{formatCurrency(price)}</span>
        </Card.Title>
        <Card.Subtitle>{description}</Card.Subtitle>
        {/* Nutrition drop down  */}
        <Accordion className="accordion">
          <Accordion.Item eventKey="0">
            <Accordion.Header>Nutrition</Accordion.Header>
            <Accordion.Body>
              <p>Calories: {calories}</p>
              <p>Protein: {protein}g</p>
              <p>Carbs: {carbs}g</p>
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
        {showQuantityControls && ( // Conditional to check if item is being viewed on main Store page, or LocationSpecificMenu
          <div className="mt-auto">
            {quantity === 0 ? (
              <Button
                className="item-button w-100 mt-4"
                onClick={() => increaseCartQuantity(id)}
              >
                Add to Cart
              </Button>
            ) : (
              <div
                className="d-flex align-items-center flex-column"
                style={{ gap: '.5rem' }}
              >
                <div
                  className="d-flex align-items-center justify-content-center"
                  style={{ gap: '.5rem' }}
                >
                  <Button onClick={() => decreaseCartQuantity(id)}>-</Button>
                  <div>
                    <span className="fs-3">{quantity}</span>
                  </div>{' '}
                  in cart
                  <Button onClick={() => increaseCartQuantity(id)}>+</Button>
                </div>
                <Button
                  variant="danger"
                  size="sm"
                  onClick={() => removeFromCart(id)}
                >
                  Remove
                </Button>
              </div>
            )}
          </div>
        )}
      </Card.Body>
    </Card>
  );
};
