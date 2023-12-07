import { Col, Row } from 'react-bootstrap';
import { MenuItemCard } from '../../components/MenuItemCard/MenuItemCard';
import { useStoreItems } from '../../context/StoreItemsContext';

export const Store = () => {
  const { storeItems, loading, error } = useStoreItems();
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h1>Store</h1>
      <Row lg={3} md={2} xs={1} className="g-3">
        {storeItems?.map((item) => (
          <Col key={item.id}>
            <MenuItemCard {...item} showQuantityControls={false} />
          </Col>
        ))}
      </Row>
    </div>
  );
};
