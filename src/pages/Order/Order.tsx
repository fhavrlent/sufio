import { Fragment, useEffect } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";

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
          {items.map((item) => (
            <Fragment key={item.product.id}>
              <div className="d-flex justify-content-between align-items-center">
                <div>{item.quantity}x</div>
                <div>{item.product.name}</div>
              </div>
              <hr />
            </Fragment>
          ))}
        </Col>
      </Row>
      <Row>
        <Col className="text-center mt-5">
          <span>
            Please send us the pavment of{" "}
            <strong className="h3">{total.toFixed(2)} €</strong> to our bitcoin
            address.
          </span>
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
