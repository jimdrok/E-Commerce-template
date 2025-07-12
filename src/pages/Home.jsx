"use client";

import { Link } from "react-router-dom";
import { Container, Row, Col, Card } from "react-bootstrap";
import { useEffect, useState } from "react";
import bannerProduct from "../assets/bannerProduct.png";
import {
  HeroSection,
  HeroContent,
  HeroTitle,
  HeroImage,
  PrimaryButton,
  CategoriesSection,
  SectionTitle,
  SectionDescription,
  PromoSection,
  PromoContent,
  PromoTitle,
  PromoDescription,
  SecondaryButton
} from "../components/styled/StyledComponents";

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
      <HeroSection>
        <Container>
          <HeroContent>
            <Row className="align-items-center">
              <Col md={6}>
                <HeroTitle>
                  Bienvenido a PedroShop
                </HeroTitle>

                <PrimaryButton as={Link} to="/products">
                  Ver Productos
                </PrimaryButton>
              </Col>
              <Col md={6} className="mt-4 mt-md-0">
                <HeroImage>
                  <img
                    src={bannerProduct}
                    alt="Tech products"
                  />
                </HeroImage>
              </Col>
            </Row>
          </HeroContent>
        </Container>
      </HeroSection>

      {/* Featured Categories */}
      <CategoriesSection>
        <Container>
          <div style={{ textAlign: "center", marginBottom: "4rem" }}>
            <SectionTitle>
              Categorías Destacadas
            </SectionTitle>
            <SectionDescription>
              Explora nuestras categorías más populares y encuentra exactamente
              lo que buscas
            </SectionDescription>
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
                    <SecondaryButton
                      as={Link}
                      to={`/products?category=${cat.name}`}
                    >
                      Explorar
                    </SecondaryButton>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      </CategoriesSection>

      {/* Promo Banner */}
      <PromoSection>
        <Container style={{ textAlign: "center", position: "relative", zIndex: 2 }}>
          <PromoContent>
            <PromoTitle>
              ¡Ofertas Especiales!
            </PromoTitle>
            <PromoDescription>
              Hasta 50% de descuento en productos seleccionados.
              <br />
              <span>
                Válido hasta agotar existencias
              </span>
            </PromoDescription>
            <PrimaryButton
              as={Link}
              to="/products"
              style={{
                padding: "12px 32px",
                fontSize: "1rem",
              }}
            >
              Ver Ofertas
            </PrimaryButton>
          </PromoContent>
        </Container>
      </PromoSection>
    </div>
  );
};

export default Home;