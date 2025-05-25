// pages/ProductDetail.jsx
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Container,
  Row,
  Col,
  Image,
  Button,
  Badge,
  Alert,
} from "react-bootstrap";

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`https://fakestoreapi.com/products/${id}`);
        if (!response.ok) throw new Error("Producto no encontrado");
        const data = await response.json();
        setProduct(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading)
    return (
      <div className="text-center my-5">
        <div className="spinner-border text-primary" role="status"></div>
        <p className="mt-2">Cargando producto...</p>
      </div>
    );

  if (error)
    return (
      <Alert variant="danger" className="m-4">
        Error: {error}
      </Alert>
    );

  return (
    <Container className="my-5">
      <Row>
        {/* Columna de la imagen */}
        <Col md={6} className="mb-4">
          <div className="bg-light p-4 rounded-3 shadow-sm">
            <Image
              src={product.image}
              fluid
              className="product-image"
              style={{ maxHeight: "500px", objectFit: "contain" }}
            />
          </div>
        </Col>

        {/* Columna de la información */}
        <Col md={6}>
          <h1 className="mb-3">{product.title}</h1>
          <div className="d-flex align-items-center gap-3 mb-4">
            <Badge bg="secondary" className="fs-6">
              {product.category}
            </Badge>
            <div className="rating">
              {[...Array(5)].map((_, i) => (
                <i
                  key={i}
                  className={`bi bi-star${
                    i < Math.round(product.rating.rate) ? "-fill" : ""
                  } text-warning`}
                ></i>
              ))}
              <span className="ms-2">({product.rating.count} reseñas)</span>
            </div>
          </div>

          <h2 className="text-danger mb-4">${product.price}</h2>

          <p className="lead mb-4">{product.description}</p>

          <div className="d-flex gap-3">
            <Button variant="primary" size="lg">
              <i className="bi bi-cart-plus me-2"></i>Agregar al carrito
            </Button>
            <Button variant="outline-secondary" size="lg">
              <i className="bi bi-heart me-2"></i>Guardar
            </Button>
          </div>

          {/* Especificaciones */}
          <div className="mt-5">
            <h4 className="mb-3">Especificaciones</h4>
            <ul className="list-unstyled">
              <li>
                <strong>Categoría:</strong> {product.category}
              </li>
              <li>
                <strong>Disponibilidad:</strong> En stock
              </li>
              <li>
                <strong>Envío:</strong> Gratis para pedidos sobre $100
              </li>
            </ul>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default ProductDetail;
