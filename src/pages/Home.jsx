"use client";

import { Link } from "react-router-dom";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { useEffect, useState } from "react";
import bannerProduct from "../assets/bannerProduct.png";

const Home = () => {
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    fetch("https://68706bd17ca4d06b34b6bcd6.mockapi.io/api/v1/categories")
      .then((res) => res.json())
      .then((data) => setCategories(data))
      .catch(() => setCategories([]));
  }, []);

  return (
    <div className="home-page">
      {/* Hero Section */}
      <section
        className="hero"
        style={{
          background:
            "linear-gradient(135deg, #1e3a8a 0%, #3b82f6 50%, #1e40af 100%)",
          color: "white",
          padding: "80px 0",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background:
              'url("data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fillRule="evenodd"%3E%3Cg fill="%23ffffff" fillOpacity="0.05"%3E%3Ccircle cx="30" cy="30" r="2"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")',
            opacity: 0.3,
          }}
        ></div>
        <Container style={{ position: "relative", zIndex: 2 }}>
          <Row className="align-items-center">
            <Col md={6}>
              <h1
                style={{
                  fontSize: "3.5rem",
                  fontWeight: "700",

                  textShadow: "2px 2px 4px rgba(0,0,0,0.3)",
                }}
              >
                Bienvenido a PedroShop
              </h1>

              <Button
                as={Link}
                to="/products"
                style={{
                  backgroundColor: "#ffffff",
                  color: "#1e3a8a",
                  border: "none",
                  padding: "15px 40px",
                  fontSize: "1.1rem",
                  fontWeight: "600",
                  borderRadius: "50px",
                  boxShadow: "0 8px 25px rgba(0,0,0,0.2)",
                  transition: "all 0.3s ease",
                  textDecoration: "none",
                }}
                onMouseEnter={(e) => {
                  e.target.style.transform = "translateY(-2px)";
                  e.target.style.boxShadow = "0 12px 35px rgba(0,0,0,0.3)";
                }}
                onMouseLeave={(e) => {
                  e.target.style.transform = "translateY(0)";
                  e.target.style.boxShadow = "0 8px 25px rgba(0,0,0,0.2)";
                }}
              >
                Ver Productos
              </Button>
            </Col>
            <Col md={6} className="mt-4 mt-md-0">
              <div
                style={{
                  position: "relative",
                  borderRadius: "20px",
                  overflow: "hidden", // Corregido
                  boxShadow: "0 20px 60px rgba(0,0,0,0.3)",
                  aspectRatio: "16/10", // Relación de aspecto moderna
                }}
              >
                <img
                  src={bannerProduct}
                  alt="Tech products"
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover", // Ajuste inteligente
                    objectPosition: "center center", // Enfoca área importante
                  }}
                />
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Featured Categories */}
      <section
        style={{
          padding: "80px 0",
          backgroundColor: "#f8fafc",
          background: "linear-gradient(180deg, #f8fafc 0%, #e2e8f0 100%)",
        }}
      >
        <Container>
          <div style={{ textAlign: "center", marginBottom: "4rem" }}>
            <h2
              style={{
                fontSize: "2.5rem",
                fontWeight: "700",
                color: "#1e293b",
                marginBottom: "1rem",
              }}
            >
              Categorías Destacadas
            </h2>
            <p
              style={{
                fontSize: "1.1rem",
                color: "#64748b",
                maxWidth: "600px",
                margin: "0 auto",
              }}
            >
              Explora nuestras categorías más populares y encuentra exactamente
              lo que buscas
            </p>
          </div>
          <Row className="justify-content-center">
            {categories.map((cat) => (
              <Col
                key={cat.id}
                md={3}
                className="mb-4 d-flex align-items-stretch"
              >
                <Card
                  style={{
                    width: "100%",
                    height: "100%",
                    border: "none",
                    borderRadius: "16px",
                    overflow: "hidden",
                    boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
                    transition: "all 0.3s ease",
                    cursor: "pointer",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "translateY(-8px)";
                    e.currentTarget.style.boxShadow =
                      "0 12px 40px rgba(0,0,0,0.15)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "translateY(0)";
                    e.currentTarget.style.boxShadow =
                      "0 4px 20px rgba(0,0,0,0.08)";
                  }}
                >
                  <div style={{ position: "relative", overflow: "hidden" }}>
                    <Card.Img
                      variant="top"
                      src={cat.image}
                      style={{
                        height: "200px",
                        objectFit: "cover",
                        transition: "transform 0.3s ease",
                      }}
                    />
                  </div>
                  <Card.Body
                    style={{
                      textAlign: "center",
                      padding: "2rem 1.5rem",
                      backgroundColor: "white",
                    }}
                  >
                    <h5
                      style={{
                        color: "#1e293b",
                        fontWeight: "600",
                        marginBottom: "1rem",
                        textTransform: "capitalize",
                      }}
                    >
                      {cat.name}
                    </h5>
                    <Button
                      as={Link}
                      to={`/products?category=${cat.name}`}
                      style={{
                        backgroundColor: "transparent",
                        color: "#2563eb",
                        border: "2px solid #2563eb",
                        borderRadius: "25px",
                        padding: "8px 24px",
                        fontWeight: "600",
                        fontSize: "0.9rem",
                        transition: "all 0.3s ease",
                        textDecoration: "none",
                      }}
                      onMouseEnter={(e) => {
                        e.target.style.backgroundColor = "#2563eb";
                        e.target.style.color = "white";
                        e.target.style.transform = "scale(1.05)";
                      }}
                      onMouseLeave={(e) => {
                        e.target.style.backgroundColor = "transparent";
                        e.target.style.color = "#2563eb";
                        e.target.style.transform = "scale(1)";
                      }}
                    >
                      Explorar
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      {/* Promo Banner */}
      <section
        style={{
          background:
            "linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #334155 100%)",
          color: "white",
          padding: "40px 0",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background:
              'url("data:image/svg+xml,%3Csvg width="40" height="40" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="%23ffffff" fillOpacity="0.03"%3E%3Cpath d="M20 20c0-11.046-8.954-20-20-20v20h20z"/%3E%3C/g%3E%3C/svg%3E")',
          }}
        ></div>
        <Container
          style={{ textAlign: "center", position: "relative", zIndex: 2 }}
        >
          <div
            style={{
              backgroundColor: "rgba(59, 130, 246, 0.1)",
              borderRadius: "20px",
              padding: "2rem 1.5rem",
              border: "1px solid rgba(59, 130, 246, 0.2)",
            }}
          >
            <h3
              style={{
                fontSize: "2rem",
                fontWeight: "700",
                marginBottom: "1rem",
                background: "linear-gradient(45deg, #3b82f6, #60a5fa)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              ¡Ofertas Especiales!
            </h3>
            <p
              style={{
                fontSize: "1.1rem",
                marginBottom: "1.5rem",
                opacity: 0.9,
                lineHeight: "1.6",
              }}
            >
              Hasta 50% de descuento en productos seleccionados.
              <br />
              <span style={{ fontSize: "0.9rem", opacity: 0.8 }}>
                Válido hasta agotar existencias
              </span>
            </p>
            <Button
              as={Link}
              to="/products"
              style={{
                background: "linear-gradient(45deg, #3b82f6, #2563eb)",
                border: "none",
                borderRadius: "50px",
                padding: "12px 32px",
                fontSize: "1rem",
                fontWeight: "600",
                boxShadow: "0 8px 25px rgba(59, 130, 246, 0.4)",
                transition: "all 0.3s ease",
                textDecoration: "none",
                color: "white",
              }}
              onMouseEnter={(e) => {
                e.target.style.transform = "translateY(-3px) scale(1.05)";
                e.target.style.boxShadow =
                  "0 15px 35px rgba(59, 130, 246, 0.6)";
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = "translateY(0) scale(1)";
                e.target.style.boxShadow = "0 8px 25px rgba(59, 130, 246, 0.4)";
              }}
            >
              Ver Ofertas
            </Button>
          </div>
        </Container>
      </section>
    </div>
  );
};

export default Home;
