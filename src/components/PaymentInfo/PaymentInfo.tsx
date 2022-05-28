export const PaymentInfo = ({ total }: { total: number }) => (
  <span>
    Please send us the payment of{" "}
    <strong className="h3">{total.toFixed(2)} €</strong> to our bitcoin address.
  </span>
);
