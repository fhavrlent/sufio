import { Table } from "react-bootstrap";

import { CartProducts, CartVat } from "../../types";
import { CartInfoRow } from "../CartInfoRow";
import { CartProductRow } from "../CartProductRow";
import { CartTableHeader } from "../CartTableHeader";

type Props = {
  items: CartProducts;
  total: number;
  totalWithoutVat: number;
  vats: CartVat[];
};

export const CartTable = ({ items, totalWithoutVat, vats, total }: Props) => (
  <Table>
    <thead>
      <CartTableHeader />
    </thead>
    <tbody>
      {items.map((item) => (
        <CartProductRow {...item} key={item.product.id} />
      ))}
      <CartInfoRow label="Total excl. VAT" value={totalWithoutVat.toFixed(2)} />
      {[...vats]
        .filter((vat) => vat.total > 0)
        .sort((a, b) => a.vat - b.vat)
        .map(({ vat, total }) => (
          <CartInfoRow
            key={vat}
            label={`VAT ${vat}%`}
            value={total.toFixed(2)}
          />
        ))}
      <CartInfoRow
        label={<strong>Total</strong>}
        value={<strong>{total.toFixed(2)}</strong>}
      />
    </tbody>
  </Table>
);
