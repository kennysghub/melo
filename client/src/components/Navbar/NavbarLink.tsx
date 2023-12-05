import { Nav } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';

type NavbarLinkProps = {
  to: string;
  children: React.ReactNode;
};

export const NavbarLink = ({ to, children }: NavbarLinkProps) => {
  return (
    <Nav.Link role="navigation" to={to} as={NavLink}>
      {children}
    </Nav.Link>
  );
};
