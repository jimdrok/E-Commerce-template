"use client";
import { Card, Button, Container, Row, Col, Alert } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import { useAuth } from "../../context/AuthContext";
import { useState } from "react";

const ProductList = ({ products }) => {
  const { addToCart } = useCart();
  const { isAuthenticated } = useAuth();
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [showLoginMessage, setShowLoginMessage] = useState(false);

  return (
    <Container className="my-4">
      {showSuccessMessage && (
        <Alert
          style={{
            backgroundColor: "#dcfce7",
            border: "1px solid #bbf7d0",
            borderRadius: "16px",
            padding: "1rem 1.5rem",
            color: "#166534",
            fontSize: "1.1rem",
            textAlign: "center",
            marginBottom: "2rem",
            position: "relative",
            animation: "slideIn 0.3s ease-out",
          }}
        >
          <div style={{ fontSize: "1.5rem", marginBottom: "0.5rem" }}>✅</div>
          <strong>¡Éxito!</strong> Se agregó tu producto al carrito
        </Alert>
      )}
      {showLoginMessage && (
        <Alert
          style={{
            backgroundColor: "#fef3c7",
            border: "1px solid #fbbf24",
            borderRadius: "16px",
            padding: "1rem 1.5rem",
            color: "#92400e",
            fontSize: "1.1rem",
            textAlign: "center",
            marginBottom: "2rem",
            position: "relative",
            animation: "slideIn 0.3s ease-out",
          }}
        >
          <div style={{ fontSize: "1.5rem", marginBottom: "0.5rem" }}>🔒</div>
          <strong>Inicia sesión</strong> para agregar productos al carrito
        </Alert>
      )}
      <Row xs={1} md={2} lg={3} className="g-4">
        {products.map((product) => (
          <Col key={product.id}>
            <Card
              className="h-100"
              style={{
                border: "none",
                borderRadius: "16px",
                overflow: "hidden",
                boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
                transition: "all 0.3s ease",
                cursor: "pointer",
                backgroundColor: "white",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-8px)";
                e.currentTarget.style.boxShadow =
                  "0 12px 40px rgba(0,0,0,0.15)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "0 4px 20px rgba(0,0,0,0.08)";
              }}
            >
              <div
                style={{
                  position: "relative",
                  overflow: "hidden",
                  backgroundColor: "#f8fafc",
                  borderRadius: "16px 16px 0 0",
                }}
              >
                <Card.Img
                  variant="top"
                  src={product.image}
                  style={{
                    width: "100%",
                    height: "220px",
                    objectFit: "cover", // Asegura que la imagen cubra el área
                    padding: 0,
                    transition: "transform 0.3s ease",
                    backgroundColor: "transparent",
                    borderRadius: "16px 16px 0 0",
                    display: "block",
                    overflow: "hidden", // Oculta el desbordamiento
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.transform = "scale(1.05)";
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.transform = "scale(1)";
                  }}
                />
                <div
                  style={{
                    position: "absolute",
                    top: "1rem",
                    right: "1rem",
                    backgroundColor: "rgba(37, 99, 235, 0.1)",
                    borderRadius: "20px",
                    padding: "4px 12px",
                    fontSize: "0.75rem",
                    fontWeight: "600",
                    color: "#2563eb",
                    border: "1px solid rgba(37, 99, 235, 0.2)",
                  }}
                >
                  Nuevo
                </div>
              </div>

              <Card.Body
                className="d-flex flex-column"
                style={{
                  padding: "1.5rem",
                  backgroundColor: "white",
                }}
              >
                <Card.Title
                  className="flex-grow-1"
                  style={{
                    fontSize: "1rem",
                    fontWeight: "600",
                    color: "#1e293b",
                    lineHeight: "1.4",
                    marginBottom: "1rem",
                    display: "-webkit-box",
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: "vertical",
                    overflow: "hidden",
                    minHeight: "2.8rem",
                  }}
                >
                  {product.title}
                </Card.Title>

                <div className="mt-auto">
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      marginBottom: "1rem",
                    }}
                  >
                    <Card.Text
                      style={{
                        color: "#2563eb",
                        fontWeight: "700",
                        fontSize: "1.5rem",
                        margin: 0,
                        background: "linear-gradient(45deg, #2563eb, #3b82f6)",
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                        backgroundClip: "text",
                      }}
                    >
                      ${product.price}
                    </Card.Text>
                    <div
                      style={{
                        fontSize: "0.8rem",
                        color: "#10b981",
                        fontWeight: "600",
                        backgroundColor: "rgba(16, 185, 129, 0.1)",
                        padding: "2px 8px",
                        borderRadius: "12px",
                        border: "1px solid rgba(16, 185, 129, 0.2)",
                      }}
                    >
                      Envío gratis
                    </div>
                  </div>

                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "8px",
                    }}
                  >
                    <Button
                      as={Link}
                      to={`/products/${product.id}`}
                      style={{
                        backgroundColor: "transparent",
                        color: "#2563eb",
                        border: "2px solid #2563eb",
                        borderRadius: "25px",
                        padding: "8px 16px",
                        fontWeight: "600",
                        fontSize: "0.9rem",
                        transition: "all 0.3s ease",
                        textDecoration: "none",
                        textAlign: "center",
                      }}
                      onMouseEnter={(e) => {
                        e.target.style.backgroundColor = "#2563eb";
                        e.target.style.color = "white";
                        e.target.style.transform = "scale(1.02)";
                      }}
                      onMouseLeave={(e) => {
                        e.target.style.backgroundColor = "transparent";
                        e.target.style.color = "#2563eb";
                        e.target.style.transform = "scale(1)";
                      }}
                    >
                      Ver Detalles
                    </Button>

                    <Button
                      className="w-100"
                      onClick={() => {
                        if (isAuthenticated()) {
                          addToCart(product);
                          setShowSuccessMessage(true);
                          setTimeout(() => setShowSuccessMessage(false), 3000);
                        } else {
                          setShowLoginMessage(true);
                          setTimeout(() => setShowLoginMessage(false), 3000);
                        }
                      }}
                      style={{
                        background: "linear-gradient(45deg, #2563eb, #3b82f6)",
                        border: "none",
                        borderRadius: "25px",
                        padding: "12px 16px",
                        fontWeight: "600",
                        fontSize: "0.95rem",
                        color: "white",
                        boxShadow: "0 4px 15px rgba(37, 99, 235, 0.3)",
                        transition: "all 0.3s ease",
                      }}
                      onMouseEnter={(e) => {
                        e.target.style.transform = "translateY(-2px)";
                        e.target.style.boxShadow =
                          "0 8px 25px rgba(37, 99, 235, 0.4)";
                        e.target.style.background =
                          "linear-gradient(45deg, #1d4ed8, #2563eb)";
                      }}
                      onMouseLeave={(e) => {
                        e.target.style.transform = "translateY(0)";
                        e.target.style.boxShadow =
                          "0 4px 15px rgba(37, 99, 235, 0.3)";
                        e.target.style.background =
                          "linear-gradient(45deg, #2563eb, #3b82f6)";
                      }}
                    >
                      🛒 Agregar al carrito
                    </Button>
                  </div>
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
