import { Routes, Route } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import { Store } from './pages/Store';
import { About } from './pages/About';
import { Home } from './pages/Home';
import { Navbar } from './components/Navbar';
import RestaurantDetail from './components/RestaurantDetail';
import { ShopppingCartProvider } from './context/ShoppingCartContext';
import { Checkout } from './pages/Checkout';
import Locations from './pages/Locations';
export const App = () => {
  return (
    <>
      <ShopppingCartProvider>
        <Navbar />
        <Container className="mb-4">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/store" element={<Store />} />
            <Route path="/about" element={<About />} />
            <Route path="/locations" element={<Locations />} />
            <Route
              path="/restaurant/:restaurantId"
              element={<RestaurantDetail />}
            />
            <Route path="/checkout" element={<Checkout />} />
          </Routes>
        </Container>
      </ShopppingCartProvider>
    </>
  );
};
