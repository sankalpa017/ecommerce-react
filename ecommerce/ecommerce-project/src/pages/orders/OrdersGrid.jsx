import { CartItemDetails } from './CartItemDetails';
import { OrderHeader } from './OrderHeader';

export function OrdersGrid( {orders, loadCart} ) {
  return (
    <div className="orders-grid">
      {orders && orders.map((order) => {
        return (
          <div key={order.id} className="order-container">

            <OrderHeader order={order} />

            <div className="order-details-grid">
              <CartItemDetails order={order} loadCart={loadCart} />
            </div>
          </div>
        );
      })}
    </div>
  );
}