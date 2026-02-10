export function formatCurrency(amountCents) {
  return amountCents < 0
  ? `-$${(Math.round(-amountCents) / 100).toFixed(2)}`
  : `$${(Math.round(amountCents) / 100).toFixed(2)}`;
}