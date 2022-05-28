import { ChangeEvent } from "react";
import { Form } from "react-bootstrap";
import { Trash } from "react-bootstrap-icons";

import {
  changeProductCartQuantity,
  removeProductFromCart,
} from "../../store/cart-slice";
import { useAppDispatch } from "../../store/redux-hooks";
import { CartProduct } from "../../types";

export const CartProductRow = ({ product, quantity }: CartProduct) => {
  const { name, unitPrice, vat, stock, id } = product;
  const dispatch = useAppDispatch();

  const onClickDelete = () => dispatch(removeProductFromCart(product));

  const onChangeAmount = (event: ChangeEvent<HTMLInputElement>) => {
    const newQuantity = parseInt(event.target.value, 10);
    if (newQuantity > stock)
      dispatch(changeProductCartQuantity({ id, quantity: stock }));
    else if (isNaN(newQuantity))
      dispatch(changeProductCartQuantity({ id, quantity: 1 }));
    else dispatch(changeProductCartQuantity({ id, quantity: newQuantity }));
  };

  return (
    <tr className="d-flex">
      <td className="col-2 d-flex align-items-center">{name}</td>
      <td className="d-flex align-items-center col-4 d-flex align-items-center">
        <Form.Control
          type="number"
          min={1}
          max={stock}
          style={{ maxWidth: "30%" }}
          value={quantity.toString()}
          onChange={onChangeAmount}
        />
        <span className="remove-from-cart" onClick={onClickDelete}>
          <Trash className="ms-2" />
        </span>
      </td>
      <td className="col-3 d-flex align-items-center">
        {unitPrice.toFixed(2)} €
      </td>
      <td className="col-1 d-flex align-items-center">{vat}</td>
      <td className="col-2 d-flex align-items-center">
        {(unitPrice * quantity).toFixed(2)} €
      </td>
    </tr>
  );
};
