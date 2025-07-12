"use client";

import { Link, useLocation } from "react-router-dom";
import { Badge, Container, Nav, Navbar, Dropdown } from "react-bootstrap";
import { useCart } from "../../context/CartContext";
import { useAuth } from "../../context/AuthContext";
import {
  StyledNavbar,
  NavBrand,
  NavLink,
  CartButton,
  CartBadge
} from "../styled/StyledComponents";

const NavigationBar = () => {
  const { totalItems } = useCart();
  const { user, logout, isAuthenticated } = useAuth();
  const { pathname } = useLocation();

  // Configuración para los enlaces principales (sin carrito)
  const navLinks = [
    { to: "/", text: "Home" },
    { to: "/products", text: "Productos" },
    { to: "/admin/products", text: "Inventario", protected: true },
  ];

  const isActive = (path) => pathname === path;

  return (
    <>
      <StyledNavbar expand="lg">
        <Container>
          <NavBrand as={Link} to="/">
            PedroShop
          </NavBrand>

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
              {navLinks.map(({ to, text, protected: isProtected }) => {
                // Solo mostrar enlaces protegidos si el usuario está autenticado
                if (isProtected && !isAuthenticated()) return null;
                
                return (
                <Nav.Link
                  key={to}
                  as={NavLink}
                  href={to}
                  $isActive={isActive(to)}
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
                </Nav.Link>
              );
              })}
            </Nav>

            {/* Carrito de compras en la derecha */}
            <Nav>
              {isAuthenticated() ? (
                <>
                  {/* Carrito - solo visible para usuarios autenticados */}
                  <Nav.Link
                    as={CartButton}
                    href="/cart"
                    $isActive={pathname === "/cart"}
                  >
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <circle cx="9" cy="21" r="1"></circle>
                      <circle cx="20" cy="21" r="1"></circle>
                      <path d="m1 1 4 4 2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
                    </svg>
                    {totalItems > 0 && (
                      <CartBadge pill $hasItems={totalItems > 0}>
                        {totalItems}
                      </CartBadge>
                    )}
                  </Nav.Link>

                  {/* Dropdown del usuario */}
                  <Dropdown align="end">
                    <Dropdown.Toggle
                      variant="link"
                      id="user-dropdown"
                      style={{
                        border: "2px solid rgba(255, 255, 255, 0.3)",
                        borderRadius: "50%",
                        padding: "4px",
                        backgroundColor: "transparent",
                        transition: "all 0.3s ease",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        width: "48px",
                        height: "48px",
                        marginLeft: "0.5rem",
                      }}
                      onMouseEnter={(e) => {
                        e.target.style.backgroundColor = "rgba(255, 255, 255, 0.15)";
                        e.target.style.borderColor = "rgba(255, 255, 255, 0.5)";
                        e.target.style.transform = "scale(1.1)";
                      }}
                      onMouseLeave={(e) => {
                        e.target.style.backgroundColor = "transparent";
                        e.target.style.borderColor = "rgba(255, 255, 255, 0.3)";
                        e.target.style.transform = "scale(1)";
                      }}
                    >
                      <img
                        src={user?.avatar}
                        alt={user?.name}
                        style={{
                          width: "32px",
                          height: "32px",
                          borderRadius: "50%",
                          objectFit: "cover",
                        }}
                      />
                    </Dropdown.Toggle>

                    <Dropdown.Menu
                      style={{
                        borderRadius: "12px",
                        border: "1px solid #e2e8f0",
                        boxShadow: "0 8px 32px rgba(0,0,0,0.1)",
                        padding: "0.5rem 0",
                        minWidth: "200px",
                      }}
                    >
                      <div
                        style={{
                          padding: "0.75rem 1rem",
                          borderBottom: "1px solid #e2e8f0",
                          marginBottom: "0.5rem",
                        }}
                      >
                        <div
                          style={{
                            fontWeight: "600",
                            color: "#1e293b",
                            fontSize: "0.9rem",
                          }}
                        >
                          {user?.name}
                        </div>
                        <div
                          style={{
                            color: "#64748b",
                            fontSize: "0.8rem",
                          }}
                        >
                          {user?.email}
                        </div>
                      </div>
                      
                      <Dropdown.Item
                        as={Link}
                        to="/cart"
                        style={{
                          padding: "0.5rem 1rem",
                          color: "#475569",
                          fontSize: "0.9rem",
                          display: "flex",
                          alignItems: "center",
                          gap: "0.5rem",
                        }}
                      >
                        🛒 Mi Carrito
                        {totalItems > 0 && (
                          <Badge
                            pill
                            bg="primary"
                            style={{ fontSize: "0.7rem" }}
                          >
                            {totalItems}
                          </Badge>
                        )}
                      </Dropdown.Item>
                      
                      <Dropdown.Divider />
                      
                      <Dropdown.Item
                        onClick={logout}
                        style={{
                          padding: "0.5rem 1rem",
                          color: "#ef4444",
                          fontSize: "0.9rem",
                          display: "flex",
                          alignItems: "center",
                          gap: "0.5rem",
                        }}
                      >
                        🚪 Cerrar Sesión
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </>
              ) : (
                /* Botón de login para usuarios no autenticados */
                <Nav.Link
                  as={Link}
                  to="/login"
                  style={{
                    color: "white",
                    backgroundColor: "rgba(255, 255, 255, 0.1)",
                    border: "2px solid rgba(255, 255, 255, 0.3)",
                    borderRadius: "25px",
                    padding: "8px 20px",
                    fontWeight: "600",
                    fontSize: "0.9rem",
                    transition: "all 0.3s ease",
                    textDecoration: "none",
                    marginLeft: "0.5rem",
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.backgroundColor = "rgba(255, 255, 255, 0.2)";
                    e.target.style.borderColor = "rgba(255, 255, 255, 0.5)";
                    e.target.style.transform = "translateY(-1px)";
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.backgroundColor = "rgba(255, 255, 255, 0.1)";
                    e.target.style.borderColor = "rgba(255, 255, 255, 0.3)";
                    e.target.style.transform = "translateY(0)";
                  }}
                >
                  Iniciar Sesión
                </Nav.Link>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </StyledNavbar>
    </>
  );
};

export default NavigationBar;