"use client";

import { Link } from "react-router-dom";
import { Badge, Container, Nav, Navbar } from "react-bootstrap";
import { useCart } from "../../context/CartContext";

const NavigationBar = () => {
  const { totalItems } = useCart();

  return (
    <Navbar
      expand="lg"
      style={{
        background: "linear-gradient(135deg, #1e3a8a 0%, #2563eb 100%)",
        boxShadow: "0 4px 20px rgba(30, 58, 138, 0.15)",

        borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
      }}
      variant="dark"
    >
      <Container>
        <Navbar.Brand
          as={Link}
          to="/"
          style={{
            color: "white",
            fontSize: "1.5rem",
            fontWeight: "700",
            textDecoration: "none",
            background: "linear-gradient(45deg, #ffffff, #e2e8f0)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
            transition: "all 0.3s ease",
          }}
          onMouseEnter={(e) => {
            e.target.style.transform = "scale(1.05)";
          }}
          onMouseLeave={(e) => {
            e.target.style.transform = "scale(1)";
          }}
        >
          PedroShop
        </Navbar.Brand>

        <Navbar.Toggle
          aria-controls="basic-navbar-nav"
          style={{
            border: "2px solid rgba(255, 255, 255, 0.3)",
            borderRadius: "8px",
            padding: "4px 8px",
          }}
        />

        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link
              as={Link}
              to="/"
              style={{
                color: "rgba(255, 255, 255, 0.9)",
                fontWeight: "500",
                fontSize: "1rem",
                padding: "8px 16px",
                borderRadius: "25px",
                margin: "0 4px",
                transition: "all 0.3s ease",
                textDecoration: "none",
                position: "relative",
                overflow: "hidden",
              }}
              onMouseEnter={(e) => {
                e.target.style.backgroundColor = "rgba(255, 255, 255, 0.15)";
                e.target.style.color = "white";
                e.target.style.transform = "translateY(-1px)";
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = "transparent";
                e.target.style.color = "rgba(255, 255, 255, 0.9)";
                e.target.style.transform = "translateY(0)";
              }}
            >
              Home
            </Nav.Link>

            <Nav.Link
              as={Link}
              to="/products"
              style={{
                color: "rgba(255, 255, 255, 0.9)",
                fontWeight: "500",
                fontSize: "1rem",
                padding: "8px 16px",
                borderRadius: "25px",
                margin: "0 4px",
                transition: "all 0.3s ease",
                textDecoration: "none",
                position: "relative",
                overflow: "hidden",
              }}
              onMouseEnter={(e) => {
                e.target.style.backgroundColor = "rgba(255, 255, 255, 0.15)";
                e.target.style.color = "white";
                e.target.style.transform = "translateY(-1px)";
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = "transparent";
                e.target.style.color = "rgba(255, 255, 255, 0.9)";
                e.target.style.transform = "translateY(0)";
              }}
            >
              Productos
            </Nav.Link>

            <Nav.Link
              as={Link}
              to="/cart"
              className="position-relative"
              style={{
                color: "rgba(255, 255, 255, 0.9)",
                fontWeight: "500",
                fontSize: "1rem",
                padding: "8px 16px",
                borderRadius: "25px",
                margin: "0 4px",
                transition: "all 0.3s ease",
                textDecoration: "none",
                position: "relative",
                overflow: "hidden",
                width: "auto",
              }}
              onMouseEnter={(e) => {
                e.target.style.backgroundColor = "rgba(255, 255, 255, 0.15)";
                e.target.style.color = "white";
                e.target.style.transform = "translateY(-1px)";
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = "transparent";
                e.target.style.color = "rgba(255, 255, 255, 0.9)";
                e.target.style.transform = "translateY(0)";
              }}
            >
              Carrito
              {totalItems > 0 && (
                <Badge
                  pill
                  style={{
                    backgroundColor: "#ef4444",
                    color: "white",
                    fontSize: "0.75rem",
                    fontWeight: "600",
                    padding: "4px 8px",
                    border: "2px solid white",
                    boxShadow: "0 2px 8px rgba(239, 68, 68, 0.4)",
                    animation: totalItems > 0 ? "pulse 2s infinite" : "none",
                    marginLeft: "8px",
                    marginBottom: "4px",
                  }}
                >
                  {totalItems}
                </Badge>
              )}
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>

      <style jsx>{`
        @keyframes pulse {
          0%,
          100% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.1);
          }
        }
      `}</style>
    </Navbar>
  );
};

export default NavigationBar;
