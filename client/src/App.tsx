import { Routes, Route } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import { Store } from './pages/Store/Store';
import { About } from './pages/About';
import { Home } from './pages/Home';
import { NavbarComponent } from './components/Navbar/NavbarComponent';
import { LocationSpecificMenu } from './components/LocationSpecificMenu';
import { ShoppingCartProvider } from './context/ShoppingCartContext';
import { StoreItemsProvider } from './context/StoreItemsContext';
import { Checkout } from './pages/Checkout';
import { Locations } from './pages/Locations/Locations';

export const App = () => {
  return (
    <>
      <StoreItemsProvider>
        <ShoppingCartProvider>
          <NavbarComponent />
          <Container className="mb-4">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/store" element={<Store />} />
              <Route path="/about" element={<About />} />
              <Route path="/locations" element={<Locations />} />
              <Route
                path="/restaurant/:restaurantId"
                element={<LocationSpecificMenu />}
              />
              <Route path="/checkout" element={<Checkout />} />
            </Routes>
          </Container>
        </ShoppingCartProvider>
      </StoreItemsProvider>
    </>
  );
};
