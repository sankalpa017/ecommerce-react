import { Header } from '../../components/Header';
import { CartItemDetails } from './CartItemDetails';
import { OrderHeader } from './OrderHeader';
import axios from 'axios';
import { useEffect, useState } from 'react';
import './OrdersPage.css';

export function OrdersPage({cart}) {{
  const [orders, setOrders] = useState(null);

  useEffect(() => {
    const fetchOrdersData = async () => {
      const response = await axios.get('/api/orders?expand=products');
      setOrders(response.data);
    }

    fetchOrdersData();
  }, []);

  return (
    <>
      <title>Orders</title>
      <link rel="icon" href="images/orders-favicon.png" />
      <Header cart={cart}/>

      <div className="orders-page">
        <div className="page-title">Your Orders</div>

        <div className="orders-grid">
          {orders && orders.map((order) => {
            return (
              <div key={order.id} className="order-container">

                <OrderHeader order={order} />

                <div className="order-details-grid">
                  <CartItemDetails order={order} />                
                </div>
              </div>  
            );
          })}
        </div>
      </div>
    </>
  );
}}