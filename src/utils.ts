export const calculateVat = (unitPrice: number, vat: number): number =>
  (unitPrice / 100) * vat;
