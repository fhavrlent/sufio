import { Col, Container, Row } from "react-bootstrap";
import { Product } from "../../components/Product";
import data from "../../data/products.json";

export const Products = () => {
  return (
    <Container>
      <Row>
        <Col>
          <h1 className="text-center">Products</h1>
        </Col>
      </Row>
      <Row lg={4} md={2} sm={1}>
        {data.map(({ id, unit_price_incl_vat, name }) => (
          <Col>
            <Product key={id} price={unit_price_incl_vat} name={name} />
          </Col>
        ))}
      </Row>
    </Container>
  );
};
