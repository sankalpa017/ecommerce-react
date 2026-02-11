import './CheckoutPage.css';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { CheckoutHeader } from './CheckoutHeader';
import { OrderSummary } from './OrderSummary';
import { PaymentSummary } from './PaymentSummary';

export function CheckoutPage({ cart, loadCart }) {
  const [deliveryOptions, setDeliveryOptions] = useState([]);
  const [paymentSummary, setPaymentSummary] = useState(null);

  useEffect(() => {

    const fetchDeliveryOptions = async () => {
      const response = await axios.get('/api/delivery-options?expand=estimatedDeliveryTime');
      setDeliveryOptions(response.data);
    }

    fetchDeliveryOptions();

  }, [])

  useEffect(() => {
    const fetchPaymentSummary = async () => {
      const response = await axios.get('/api/payment-summary');
      setPaymentSummary(response.data)
    }

    fetchPaymentSummary();
  }, [cart]);

  /*
  --- We use backend to get payment summary ---
  let totalCartItems = 0;
  let faceValuePriceCents = 0;
  let shippingPriceCents = 0;

  deliveryOptions.length > 0 && cart.forEach((cartItem) => {
    totalCartItems += cartItem.quantity;
    faceValuePriceCents += cartItem.product.priceCents * cartItem.quantity;
    const selectedDeliveryOption = deliveryOptions.find((deliveryOption) => {
      return deliveryOption.id === cartItem.deliveryOptionId;
    });
    shippingPriceCents += selectedDeliveryOption.priceCents;
  })

  let totalBeforeTaxCents = faceValuePriceCents + shippingPriceCents;
  let taxCents = totalBeforeTaxCents * 0.1;
  let totalCents = totalBeforeTaxCents + taxCents;
  */


  return (
    <>
      <title>Checkout</title>
      <link rel="icon" href="images/cart-favicon.png" />

      <CheckoutHeader cart={cart}/>

      <div className="checkout-page">
        <div className="page-title">Review your order</div>

        <div className="checkout-grid">
          <OrderSummary deliveryOptions={deliveryOptions} cart={cart} loadCart={loadCart}/>
          <PaymentSummary paymentSummary={paymentSummary} loadCart={loadCart}/>
        </div>
      </div>
    </>
  );
}