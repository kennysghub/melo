import React from 'react';
import { useParams } from 'react-router-dom';
import useFetch from '../hooks/useFetch';
import { Col, Row } from 'react-bootstrap';
import { StoreItem } from './StoreItem';

interface MenuItem {
  _id: string;
  id: number;
  name: string;
  price: number;
  imgUrl: string;
  description: string;
  calories: number;
  protein: number;
  carbs: number;
  type: string;

  // Include other properties as needed
}

const RestaurantDetail: React.FC = () => {
  const { restaurantId } = useParams<{ restaurantId: string }>();
  const {
    data: menuItems,
    loading,
    error,
  } = useFetch<MenuItem[]>(`http://localhost:3000/store/${restaurantId}/menu`);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!menuItems) return <div>No menu data found</div>;

  return (
    <div>
      <h1>Menu Items</h1>
      <Row lg={3} md={2} xs={1} className="g-3">
        {menuItems.map((item) => (
          <Col key={item.id}>
            <StoreItem {...item} showQuantityControls={true} />
          </Col>
        ))}
      </Row>
    </div>
  );

  // return (
  //   <div>
  //     <h1>Menu Items</h1>
  //     <ul>
  //       {menuItems.map((menuItem) => (
  //         <li key={menuItem.id}>
  //           <h3>{menuItem.name}</h3>
  //           <p>Price: {menuItem.price}</p>
  //           <p>{menuItem.description}</p>
  //           <img src={menuItem.imgUrl} alt={menuItem.name} />
  //           {/* Add other menu item details as needed */}
  //         </li>
  //       ))}
  //     </ul>
  //   </div>
  // );
};

export default RestaurantDetail;
