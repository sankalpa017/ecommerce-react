import { describe, it, expect, beforeEach, vi } from 'vitest';
import { screen, render, within } from '@testing-library/react';
import { OrderSummary } from './OrderSummary';

vi.mock('axios');

describe('Order Summary', () => {
  let loadCart;
  let cart;
  let deliveryOptions;

  beforeEach(() => {
    loadCart = vi.fn();
    cart = [
      {
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
      },
      {
        id: 10,
        productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
        quantity: 2,
        deliveryOptionId: "2",
        createdAt: "2026-02-07T09:24:08.425Z",
        updatedAt: "2026-02-10T17:03:46.840Z",
        product: {
          keywords: [
            "socks",
            "sports",
            "apparel"
          ],
          id: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
          image: "images/products/athletic-cotton-socks-6-pairs.jpg",
          name: "Black and Gray Athletic Cotton Socks - 6 Pairs",
          rating: {
            stars: 4.5,
            count: 87
          },
          priceCents: 1090,
          createdAt: "2026-02-07T05:08:38.436Z",
          updatedAt: "2026-02-07T05:08:38.436Z"
        }
      }
    ];
    deliveryOptions = [
      {
        id: "1",
        deliveryDays: 7,
        priceCents: 0,
        createdAt: "2026-02-07T05:08:38.436Z",
        updatedAt: "2026-02-07T05:08:38.436Z",
        estimatedDeliveryTimeMs: 1771348246128
      },
      {
        id: "2",
        deliveryDays: 3,
        priceCents: 499,
        createdAt: "2026-02-07T05:08:38.437Z",
        updatedAt: "2026-02-07T05:08:38.437Z",
        estimatedDeliveryTimeMs: 1771002646128
      },
      {
        id: "3",
        deliveryDays: 1,
        priceCents: 999,
        createdAt: "2026-02-07T05:08:38.438Z",
        updatedAt: "2026-02-07T05:08:38.438Z",
        estimatedDeliveryTimeMs: 1770829846128
      }
    ]
  });

  it('displays cart items correctly', () => {
    render(<OrderSummary deliveryOptions={deliveryOptions} cart={cart} loadCart={loadCart} />)

    const cartItems = screen.getAllByTestId('cart-item-container');

    expect(cartItems.length).toBe(2);

    expect(cartItems[0]).toHaveTextContent('Intermediate Size Basketball');
    expect(within(cartItems[0]).getByTestId('delivery-date')).toHaveTextContent('Tuesday, February 17');

    expect(cartItems[1]).toHaveTextContent('Black and Gray Athletic Cotton Socks - 6 Pairs');
    expect(within(cartItems[1]).getByTestId('delivery-date')).toHaveTextContent('Friday, February 13');
  });
})