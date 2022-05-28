import { Fragment } from "react";

import { CartProducts } from "../../types";

export const OrderItemList = ({ items }: { items: CartProducts }) => (
  <>
    {items.map((item) => (
      <Fragment key={item.product.id}>
        <div className="d-flex justify-content-between align-items-center">
          <div>{item.quantity}x</div>
          <div>{item.product.name}</div>
        </div>
        <hr />
      </Fragment>
    ))}
  </>
);
