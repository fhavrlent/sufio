import { Col, Container, Row, Table, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";

import { CartInfoRow } from "../../components/CartInfoRow";
import { CartProductRow } from "../../components/CartProductRow";
import { clearCart } from "../../store/cart-slice";
import { substractStock } from "../../store/products-slice";
import { useAppDispatch, useAppSelector } from "../../store/redux-hooks";

import "./Cart.css";

export const Cart = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const cart = useAppSelector((state) => state.cart);
  const { items, total, vats } = cart;

  const vatTotal = Object.values(vats).reduce((acc, vat) => acc + vat.total, 0);

  const totalWithoutVat = total - vatTotal;

  const onClickSendOrder = () => {
    console.log({ ...cart });
    navigate("/order", { state: { ...cart } });
    dispatch(substractStock({ ...cart }));
    dispatch(clearCart());
  };

  return (
    <Container>
      <Row className="mt-5 mb-5">
        <Col>
          <h1 className="text-center">Cart</h1>
        </Col>
      </Row>
      <Row>
        <Col lg={{ span: 8, offset: 2 }}>
          <Table>
            <thead>
              <tr className="table-secondary d-flex">
                <th className="col-2">Item</th>
                <th className="col-4">Quantity</th>
                <th className="col-3">Unit Price incl. Vat</th>
                <th className="col-1">VAT</th>
                <th className="col-2">Total</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item) => (
                <CartProductRow {...item} key={item.product.id} />
              ))}
              <CartInfoRow
                label="Total excl. VAT"
                value={totalWithoutVat.toFixed(2)}
              />
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
        </Col>
      </Row>
      <Row>
        <Col
          lg={{ span: 8, offset: 2 }}
          className="d-flex align-items-center justify-content-between"
        >
          <Link to="/products">← Back</Link>
          <Button
            color="primary"
            disabled={cart.items.length === 0}
            onClick={onClickSendOrder}
          >
            Send Order
          </Button>
        </Col>
      </Row>
    </Container>
  );
};
