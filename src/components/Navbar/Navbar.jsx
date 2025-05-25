"use client";

import { Link, useLocation } from "react-router-dom";
import { Badge, Container, Nav, Navbar } from "react-bootstrap";
import { useCart } from "../../context/CartContext";

const NavigationBar = () => {
  const { totalItems } = useCart();
  const { pathname } = useLocation();

  // Configuración común para todos los enlaces
  const navLinks = [
    { to: "/", text: "Home" },
    { to: "/products", text: "Productos" },
    { to: "/cart", text: "Carrito", badge: totalItems },
  ];

  const isActive = (path) => pathname === path;

  const linkBaseStyle = (isActive) => ({
    color: isActive ? "white" : "rgba(255, 255, 255, 0.9)",
    fontWeight: "500",
    fontSize: "1rem",
    padding: "8px 16px",
    borderRadius: "25px",
    margin: "0 4px",
    transition: "all 0.3s ease",
    textDecoration: "none",
    position: "relative",
    overflow: "hidden",
    backgroundColor: isActive ? "rgba(149, 149, 149, 0.12)" : "transparent",
    boxShadow: isActive ? "0 2px 8px rgba(255, 255, 255, 0.2)" : "none",
  });

  return (
    <Navbar
      expand="lg"
      style={{
        background: "linear-gradient(135deg, #1e3a8a 0%, #2563eb 100%)",
        boxShadow: "0 4px 20px rgba(30, 58, 138, 0.15)",
        borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
      }}
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
            {navLinks.map(({ to, text, badge }) => (
              <Nav.Link
                key={to}
                as={Link}
                to={to}
                style={linkBaseStyle(isActive(to))}
                onMouseEnter={(e) => {
                  if (!isActive(to)) {
                    e.target.style.backgroundColor =
                      "rgba(255, 255, 255, 0.15)";
                    e.target.style.color = "white";
                    e.target.style.transform = "translateY(-1px)";
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isActive(to)) {
                    e.target.style.backgroundColor = linkBaseStyle(
                      isActive(to)
                    ).backgroundColor;
                    e.target.style.color = linkBaseStyle(isActive(to)).color;
                    e.target.style.transform = "translateY(0)";
                  }
                }}
              >
                {text}
                {isActive(to) && (
                  <div
                    style={{
                      position: "absolute",
                      bottom: "4px",
                      left: "50%",
                      transform: "translateX(-50%)",
                      width: "24px",
                      height: "2px",
                      backgroundColor: "white",
                      borderRadius: "2px",
                    }}
                  />
                )}
                {badge > 0 && text === "Carrito" && (
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
                      animation: badge > 0 ? "pulse 2s infinite" : "none",
                      marginLeft: "8px",
                      marginBottom: "4px",
                    }}
                  >
                    {badge}
                  </Badge>
                )}
              </Nav.Link>
            ))}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavigationBar;
