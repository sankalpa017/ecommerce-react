import { formatCurrency } from './money'
import { it, expect, describe } from 'vitest';


describe('formatCurrency', () => {
  it('formats 1999 cents as $19.99', () => {
    expect(formatCurrency(1999)).toBe('$19.99');
  });

  it('displays 2 decimals', () => {
    expect(formatCurrency(1090)).toBe('$10.90');
    expect(formatCurrency(100)).toBe('$1.00');
  });

  it('formats 2000.5 cents as $20.01', () => {
    expect(formatCurrency(2000.5)).toBe('$20.01');
  });

  it('formats 2000.4 cents as $20.00', () => {
    expect(formatCurrency(2000.4)).toBe('$20.00'); 
  })
})
