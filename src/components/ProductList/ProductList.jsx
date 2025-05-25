// components/ProductList/ProductList.jsx
import React from "react";
import { Card, Button, Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useCart } from "../../context/CartContext";

const ProductList = ({ products }) => {
    
    const { addToCart } = useCart()
    
  return (
    <Container className="my-4">
      <Row xs={1} md={2} lg={3} className="g-4">
        {products.map((product) => (
          <Col key={product.id}>
            <Card className="h-100 shadow-sm">
              <Card.Img
                variant="top"
                src={product.image}
                style={{
                  height: "200px",
                  objectFit: "contain",
                  padding: "1rem",
                }}
              />
              <Card.Body className="d-flex flex-column">
                <Card.Title className="fs-6 flex-grow-1">
                  {product.title}
                </Card.Title>
                <div className="mt-auto">
                  <Card.Text className="text-danger fw-bold fs-5">
                    ${product.price}
                  </Card.Text>
                  <Button
                    as={Link}
                    to={`/products/${product.id}`}
                    variant="outline-primary"
                    className="mb-2"
                  >
                    Ver Detalles
                  </Button>
                  <Button variant="primary" className="w-100" onClick={() => addToCart(product)}>
                    Agregar al carrito
                  </Button>
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default ProductList;
