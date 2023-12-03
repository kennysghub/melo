import React, { useState } from 'react';
import { useShoppingCart } from '../context/ShoppingCartContext';
import storeItems from '../data/Items.json';
import { formatCurrency } from '../utilities/formatCurrency';
import {
  Container,
  Row,
  Col,
  Form,
  Button,
  Card,
  ListGroup,
} from 'react-bootstrap';

export const Checkout = () => {
  const { cartItems } = useShoppingCart();

  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [email, setEmail] = useState('');

  const subtotal = cartItems.reduce((total, cartItem) => {
    const item = storeItems.find((i) => i.id === cartItem.id);
    return total + (item?.price || 0) * cartItem.quantity;
  }, 0);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Handle form submission logic here
    // For example, send data to a backend server or process it as needed
  };

  return (
    <Container className="checkout-container">
      <Row>
        <Col lg={6}>
          <Form onSubmit={handleSubmit} className="checkout-form">
            <h2>Enter Your Details</h2>
            <Form.Group className="mb-3">
              <Form.Label>Name:</Form.Label>
              <Form.Control
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Address:</Form.Label>
              <Form.Control
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Email:</Form.Label>
              <Form.Control
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Group>
            <Button variant="primary" type="submit">
              Place Order
            </Button>
          </Form>
        </Col>
        <Col lg={6}>
          <h2>Your Order</h2>
          <ListGroup>
            {cartItems.map((item) => {
              const product = storeItems.find((i) => i.id === item.id);
              return (
                <ListGroup.Item key={item.id} className="checkout-item">
                  <Row>
                    <Col xs={3}>
                      <img
                        src={product?.imgUrl}
                        alt={`Image of ${product?.name}`}
                        className="img-fluid"
                      />
                    </Col>
                    <Col xs={9}>
                      <span>Item: {product?.name}</span> :
                      <span>
                        Quantity: {item.quantity} x{' '}
                        {formatCurrency(product?.price || 0)}
                      </span>
                    </Col>
                  </Row>
                </ListGroup.Item>
              );
            })}
          </ListGroup>
          <p className="subtotal">
            Subtotal: <span>{formatCurrency(subtotal)}</span>
          </p>
          <div className="app-links">
            {/* App links for iOS and Android */}
            <a
              target="_blank"
              href="https://apps.apple.com/us/app/sweetgreen-rewards/id594329490"
              rel="noreferrer"
            >
              <img
                height="50px"
                src="https://cdn.icon-icons.com/icons2/2699/PNG/512/apple_appstore_logo_icon_168587.png"
                alt="iOS App"
              />
            </a>
            <a
              target="_blank"
              href="https://play.google.com/store/apps/details?id=com.sweetgreen.android.app&hl=en"
              rel="noreferrer"
            >
              <img
                height="50px"
                src="https://play.google.com/intl/en_us/badges/static/images/badges/en_badge_web_generic.png"
                alt="Android App"
              />
            </a>
          </div>
        </Col>
      </Row>
    </Container>
  );
};
