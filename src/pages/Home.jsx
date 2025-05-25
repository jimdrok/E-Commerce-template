// pages/Home.jsx
import { Link } from "react-router-dom";
import { Container, Row, Col, Card, Button } from "react-bootstrap";

const Home = () => {
  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero bg-primary text-white py-5">
        <Container>
          <Row className="align-items-center">
            <Col md={6}>
              <h1 className="display-4 mb-4">Bienvenido a TechShop</h1>
              <p className="lead">
                Descubre los mejores productos electrónicos al mejor precio
              </p>
              <Button as={Link} to="/products" variant="light" size="lg">
                Ver Productos
              </Button>
            </Col>
            <Col md={6} className="mt-4 mt-md-0">
              <img
                src="https://via.placeholder.com/500x300"
                alt="Tech products"
                className="img-fluid rounded shadow"
              />
            </Col>
          </Row>
        </Container>
      </section>

      {/* Featured Categories */}
      <section className="categories py-5">
        <Container>
          <h2 className="text-center mb-5">Categorías Destacadas</h2>
          <Row>
            {["electronics", "jewelery", "men's clothing", "women's clothing"].map(
              (category, index) => (
                <Col key={index} md={3} className="mb-4">
                  <Card className="h-100 shadow-sm">
                    <Card.Img
                      variant="top"
                      src={`https://via.placeholder.com/300x200?text=${category}`}
                    />
                    <Card.Body className="text-center">
                      <Button
                        as={Link}
                        to={`/products?category=${category}`}
                        variant="outline-primary"
                      >
                        {category.toUpperCase()}
                      </Button>
                    </Card.Body>
                  </Card>
                </Col>
              )
            )}
          </Row>
        </Container>
      </section>

      {/* Promo Banner */}
      <section className="promo-banner bg-dark text-white py-5">
        <Container className="text-center">
          <h3>¡Ofertas Especiales!</h3>
          <p className="fs-5">
            Hasta 50% de descuento en productos seleccionados
          </p>
          <Button as={Link} to="/products" variant="warning" className="mt-3">
            Ver Ofertas
          </Button>
        </Container>
      </section>
    </div>
  );
};

export default Home;
