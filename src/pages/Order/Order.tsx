import { useEffect } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";
import { OrderItemList } from "../../components/OrderItemList";
import { PaymentInfo } from "../../components/PaymentInfo";

import { Cart } from "../../types";

export const Order = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const onClick = () => navigate("/products");

  window.history.replaceState({}, document.title);

  useEffect(() => {
    if (!location.state) {
      navigate("/products");
    }
  }, [location.state, navigate]);

  if (!location?.state) return null;

  const { items, total } = location?.state as Cart;

  return (
    <Container>
      <Row className="mt-5 mb-5">
        <Col>
          <h1 className="text-center">Thank you for your order</h1>
        </Col>
      </Row>
      <Row>
        <Col md={{ span: 2, offset: 5 }}>
          <OrderItemList items={items} />
        </Col>
      </Row>
      <Row>
        <Col className="text-center mt-5">
          <PaymentInfo total={total} />
        </Col>
      </Row>
      <Row className="mt-5">
        <Col className="text-center">
          <Button onClick={onClick}>Continue shopping</Button>
        </Col>
      </Row>
    </Container>
  );
};
