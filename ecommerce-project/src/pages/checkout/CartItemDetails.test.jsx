import { describe, it, expect, beforeEach, vi } from 'vitest';
import { screen, render, within } from '@testing-library/react';
import { CartItemDetails } from './CartItemDetails';
import userEvent from '@testing-library/user-event';
import axios from 'axios';


vi.mock('axios');

describe('Cart Item Details', () => {
  let cartItem;
  let loadCart;
  let user;

  beforeEach(() => {
    cartItem = {
      id: 8,
      productId: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
      quantity: 1,
      deliveryOptionId: "1",
      createdAt: "2026-02-07T05:38:10.038Z",
      updatedAt: "2026-02-10T16:51:27.801Z",
      product: {
        keywords: [
          "sports",
          "basketballs"
        ],
        id: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
        image: "images/products/intermediate-composite-basketball.jpg",
        name: "Intermediate Size Basketball",
        rating: {
          stars: 4,
          count: 127
        },
        priceCents: 2095,
        createdAt: "2026-02-07T05:08:38.437Z",
        updatedAt: "2026-02-07T05:08:38.437Z"
      }
    }

    loadCart = vi.fn();
    user = userEvent.setup();
  })

  it('displays cart details correctly', () => {
    render(<CartItemDetails cartItem={cartItem} loadCart={loadCart} />);

    expect(screen.getByTestId('cart-item-details')).toHaveTextContent('Intermediate Size Basketball');
    expect(screen.getByTestId('cart-item-details')).toHaveTextContent('$20.95');
    expect(screen.getByTestId('cart-item-details')).toHaveTextContent('Quantity:1');
    
    expect(screen.getByTestId('product-image')).toHaveAttribute('src', 'images/products/intermediate-composite-basketball.jpg');
  })

  it('deletes cart item', async () => {
    render(<CartItemDetails cartItem={cartItem} loadCart={loadCart} />);

    const deleteButton = screen.getByTestId('delete-button');

    await user.click(deleteButton);

    expect(axios.delete).toHaveBeenCalledWith('/api/cart-items/15b6fc6f-327a-4ec4-896f-486349e85a3d')
    expect(loadCart).toHaveBeenCalled();
  });

  it('updates cart quantity', async () => {
    render(<CartItemDetails cartItem={cartItem} loadCart={loadCart} />);

    const updateQuantityLink = screen.getByTestId('update-quantity-link');

    await user.click(updateQuantityLink);

    const quantityInputElem = screen.getByTestId('update-quantity-input');

    expect(quantityInputElem).toHaveStyle({display: 'inline-block'});
    expect(quantityInputElem).toHaveValue(cartItem.quantity);

    await user.clear(quantityInputElem);
    await user.type(quantityInputElem, '3');

    await user.click(screen.getByTestId('save-quantity-link'));

    expect(axios.put).toHaveBeenCalledWith('/api/cart-items/15b6fc6f-327a-4ec4-896f-486349e85a3d', {
      quantity: 3
    });
    expect(loadCart).toHaveBeenCalled();

  })


})