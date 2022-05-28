import { useEffect } from "react";
import { Col, Container, Row } from "react-bootstrap";

import { Product } from "../../components/Product";
import { fetchProducts } from "../../store/products-actions";
import { useAppDispatch, useAppSelector } from "../../store/redux-hooks";

export const Products = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchProducts());
  }, []);

  const allProducts = useAppSelector((state) => state.products);
  return (
    <Container>
      <Row className="mt-5 mb-5">
        <Col>
          <h1 className="text-center">Products</h1>
        </Col>
      </Row>
      <Row lg={4} md={2} sm={1}>
        {allProducts.map((product) => (
          <Col key={product.id}>
            <Product {...product} />
          </Col>
        ))}
      </Row>
    </Container>
  );
};
