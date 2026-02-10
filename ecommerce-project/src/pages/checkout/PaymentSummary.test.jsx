import { describe, it, expect, beforeEach, vi } from 'vitest';
import { screen, render, within } from '@testing-library/react';
import { PaymentSummary } from './PaymentSummary';
import { MemoryRouter } from 'react-router';
import userEvent from '@testing-library/user-event';
import axios from 'axios';
import { Location } from '../../components/Location';

vi.mock('axios');

describe('Payment Summary', () => {
  let paymentSummary;
  let loadCart;
  let user;

  beforeEach(() => {
    paymentSummary = {
      totalItems: 3,
      productCostCents: 4275,
      shippingCostCents: 499,
      totalCostBeforeTaxCents: 4774,
      taxCents: 477,
      totalCostCents: 5251
    }

    loadCart = vi.fn();
    user = userEvent.setup();
  });

  it('displays correct values', () => {
    render(
      <MemoryRouter>
        <PaymentSummary paymentSummary={paymentSummary} loadCart={loadCart} />
      </MemoryRouter>
    );

    const paymentSummaryRows = screen.getAllByTestId('payment-summary-row');

    expect(
      within(paymentSummaryRows[0]).getByText('$42.75')
    ).toBeInTheDocument();
    
    expect(paymentSummaryRows[0]).toHaveTextContent('(3)')
    expect(paymentSummaryRows[1]).toHaveTextContent('$4.99');
    expect(paymentSummaryRows[2]).toHaveTextContent('$47.74');
    expect(paymentSummaryRows[3]).toHaveTextContent('$4.77');
    expect(paymentSummaryRows[4]).toHaveTextContent('$52.51')
  });

  it('places order', async () => {
    render(
      <MemoryRouter>
        <PaymentSummary paymentSummary={paymentSummary} loadCart={loadCart} />
        <Location />
      </MemoryRouter>
    );

    const placeOrderButton = screen.getByTestId('place-order-button');

    await user.click(placeOrderButton);

    expect(axios.post).toHaveBeenCalledWith('/api/orders');
    expect(loadCart).toHaveBeenCalled();
    
    const urlPath = screen.getByTestId('url-path');
    expect(urlPath).toHaveTextContent('/orders');
  });

});