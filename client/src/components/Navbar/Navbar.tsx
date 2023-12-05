import { Container, Nav, Navbar as NavbarBs } from 'react-bootstrap';
import { useShoppingCart } from '../../context/ShoppingCartContext';
import { NavbarLink } from './NavbarLink';
import { CartButton } from './CartButton';

export const Navbar = () => {
  const { openCart, cartQuantity } = useShoppingCart();

  return (
    <NavbarBs sticky="top" className="bg-light shadow-sm mb-3">
      <Container>
        <Nav className="me-auto">
          <NavbarLink to="/">Home</NavbarLink>
          <NavbarLink to="/store">Store</NavbarLink>
          <NavbarLink to="/about">About</NavbarLink>
          <NavbarLink to="/locations">Find a Location 🌎</NavbarLink>
        </Nav>
        {cartQuantity > 0 && (
          <CartButton cartQuantity={cartQuantity} openCart={openCart} />
        )}
      </Container>
    </NavbarBs>
  );
};
