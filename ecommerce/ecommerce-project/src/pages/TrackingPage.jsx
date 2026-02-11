import { Header } from '../components/Header';
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router';
import axios from 'axios';
import dayjs from 'dayjs';
import './TrackingPage.css';
 
export function TrackingPage({ cart }) {
  const {orderId, productId} = useParams();
  const [order, setOrder] = useState(null);
  
  useEffect(() => {
    const fetchTrackingData = async () => {
      const response = await axios(`/api/orders/${orderId}?expand=products`);
      setOrder(response.data);
    }

    fetchTrackingData();
  }, [orderId]);

  if (!order) {
    return null;
  }

  const matchedProduct = order.products.find((productItem) => {
    return productItem.productId === productId;
  })

  if (!matchedProduct) {
    return null;
  }

  const totalDeliveryTimeMs = matchedProduct.estimatedDeliveryTimeMs - order.orderTimeMs;

  const timePassedMs = dayjs().valueOf() - order.orderTimeMs;

  const deliveryProgress = Math.min(timePassedMs / totalDeliveryTimeMs * 100, 100);

  let isPreparing = false, isShipped = false, isDelivered = false;
  if (deliveryProgress < 33) {
    isPreparing = true;
  } else if (deliveryProgress >= 33 && deliveryProgress < 100) {
    isShipped = true;
  } else if (deliveryProgress === 100) {
    isDelivered = true;
  }

  return (
    <>
      <title>Product Tracking</title>
      <link rel="icon" href="images/tracking-favicon.png" />
      <Header cart={cart} />
      <div className="tracking-page">
        <div className="order-tracking">
          <Link className="back-to-orders-link link-primary" to="/orders">
            View all orders
          </Link>

          <div className="delivery-date">
            {
              deliveryProgress === 100
              ? 'Delivered on '
              : 'Arriving on '
            } 
            {dayjs(matchedProduct.estimatedDeliveryTimeMs).format('dddd, MMMM D')} 
          </div>

          <div className="product-info">
            {matchedProduct.product.name}
          </div>

          <div className="product-info">
            Quantity: {matchedProduct.quantity}
          </div>

          <img className="product-image" src={matchedProduct.product.image} />

          <div className="progress-labels-container">
            <div className={`progress-label ${isPreparing && 'current-status'}`}>
              Preparing
            </div>
            <div className={`progress-label ${isShipped && 'current-status'}`}>
              Shipped
            </div>
            <div className={`progress-label ${isDelivered && 'current-status'}`}>
              Delivered
            </div>
          </div>

          <div className="progress-bar-container">
            <div className="progress-bar" style={{width: `${deliveryProgress}%`}}></div>
          </div>
        </div>
      </div>
    </>
  );
}