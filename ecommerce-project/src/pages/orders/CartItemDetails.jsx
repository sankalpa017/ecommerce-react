import axios from 'axios';
import { Link } from 'react-router';
import { Fragment } from 'react';
import dayjs from 'dayjs';
import BuyAgainIcon from '../../assets/images/icons/buy-again.png';

export function CartItemDetails({ order, loadCart }) {
  return (
    <>
      {
        order.products.map((productItem) => {
          const addToCart = async () => {
            await axios.post('/api/cart-items', {
              productId: productItem.productId,
              quantity: 1
            })

            await loadCart();
          }
          return (
            <Fragment key={productItem.productId}>
              <div className="product-image-container">
                <img src={productItem.product.image} />
              </div>

              <div className="product-details">
                <div className="product-name">
                  {productItem.product.name}
                </div>
                <div className="product-delivery-date">
                  Arriving on: {dayjs(productItem.estimatedDeliveryTimeMs).format('MMMM D')}
                </div>
                <div className="product-quantity">
                  Quantity: {productItem.quantity}
                </div>
                <button className="buy-again-button button-primary"
                  onClick={addToCart}
                >
                  <img className="buy-again-icon" src={BuyAgainIcon} />
                  <span className="buy-again-message">
                    Add to Cart
                  </span>
                </button>
              </div>

              <div className="product-actions">
                <Link to={`/tracking/${order.id}/${productItem.productId}`}>
                  <button className="track-package-button button-secondary">
                    Track package
                  </button>
                </Link>
              </div>
            </Fragment>
          );
        })
      }
    </>
  );
}