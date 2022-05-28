import { Col, Container, Row, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";

import { CartTable } from "../../components/CartTable";
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
    const cartCopy = { ...cart };
    console.log({ cartContent: cartCopy.items });
    navigate("/order", { state: cartCopy });
    dispatch(substractStock(cartCopy));
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
          <CartTable
            items={items}
            total={total}
            totalWithoutVat={totalWithoutVat}
            vats={vats}
          />
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
