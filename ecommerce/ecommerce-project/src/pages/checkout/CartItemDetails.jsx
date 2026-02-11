import axios from 'axios';
import { useState, useEffect, useRef } from 'react';
import { formatCurrency } from '../../utils/money';

export function CartItemDetails({ cartItem, loadCart }) {
  const [updating, setUpdating] = useState(false);
  const [cartQuantity, setCartQuantity] = useState(cartItem.quantity);
  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current.focus();
  }, [updating]);

  const updateQuantity = async () => {
    if (updating) {
      if (cartQuantity <= 0 || cartQuantity >= 100) {
        setCartQuantity(cartItem.quantity);
        setUpdating(false);
        return;
      }
      await axios.put(`/api/cart-items/${cartItem.productId}`, {
        quantity: Number(cartQuantity)
      });
      await loadCart();
      setUpdating(false)
    } else {
      setUpdating(true)
    }
  }

  const deleteCartItem = async() => {
    await axios.delete(`/api/cart-items/${cartItem.productId}`)
    await loadCart();
  }
  return (
    <>
      <img className="product-image"
        src={cartItem.product.image} 
        data-testid="product-image"  
      />

      <div className="cart-item-details"
        data-testid="cart-item-details"
      >
        <div className="product-name">
          {cartItem.product.name}
        </div>
        <div className="product-price">
          {formatCurrency(cartItem.product.priceCents)}
        </div>
        <div className="product-quantity">
          <span>
            Quantity: 
            <input
              ref={inputRef}
              type="number"
              className="update-quantity-input"
              data-testid="update-quantity-input"
              style={{display: updating ? 'inline-block' : 'none'}}
              value={cartQuantity}
              onChange={(event) => {
                setCartQuantity(event.target.value);
              }}
              onKeyDown={(event) => {
                if (event.key === 'Enter') {
                  updateQuantity();
                } else if (event.key === 'Escape') {
                  setCartQuantity(cartItem.quantity);
                  setUpdating(false);
                }
              }}
            />
            <span className="quantity-label"
              style={{display: updating ? 'none' : 'inline-block'}}
            >
              {cartItem.quantity}
            </span>
          </span>
          <span className="update-quantity-link link-primary"
            data-testid="update-quantity-link"
            onClick={updateQuantity}
            style={{display: updating ? 'none' : 'inline-block'}}
          >
            Update
          </span>
          <span className="link-primary"
            data-testid="save-quantity-link"
            onClick={updateQuantity}
            style={{display: updating ? 'inline-block' : 'none'}}
          >
            Save
          </span>
          <span className="delete-quantity-link link-primary"
            onClick={deleteCartItem}
            data-testid= 'delete-button'
          >
            Delete
          </span>
        </div>
      </div>
    </>
  );
}