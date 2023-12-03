import storeItems from '../data/Items.json';
import { Col, Row } from 'react-bootstrap';
import { StoreItem, StoreItemProps } from '../components/StoreItem';
import MapInstance from '../components/MapInstance';
import useGeolocation from '../hooks/useGeoLocation';
export function Store() {
  console.log(useGeolocation());
  return (
    <div>
      <h1>Store</h1>
      {/* large screen size - 3 cols... and 3 items horizonatla and verctial */}
      {/* <MapInstance/> */}

      <Row lg={3} md={2} xs={1} className="g-3">
        {storeItems.map((item) => (
          <Col key={item.id}>
            <StoreItem {...item} showQuantityControls={false} />
          </Col>
        ))}
      </Row>
    </div>
  );
}
