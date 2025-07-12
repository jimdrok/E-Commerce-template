"use client";

import { Link, useLocation } from "react-router-dom";
import { Badge, Container, Nav, Navbar, Dropdown } from "react-bootstrap";
import { useCart } from "../../context/CartContext";
import { useAuth } from "../../context/AuthContext";
import {
  FiHome,
  FiPackage,
  FiShoppingCart,
  FiUser,
  FiLogOut,
  FiArchive,
} from "react-icons/fi";

const NavigationBar = () => {
  const { totalItems } = useCart();
  const { user, logout, isAuthenticated } = useAuth();
  const { pathname } = useLocation();

  const navLinks = [
    { to: "/", text: "Home", icon: FiHome },
    { to: "/products", text: "Productos", icon: FiPackage },
    {
      to: "/admin/products",
      text: "Inventario",
      icon: FiArchive,
      protected: true,
    },
  ];

  const isActive = (path) => pathname === path;

  return (
    <Navbar expand="lg" bg="primary" variant="dark" className="sticky-top">
      <Container>
        <Navbar.Brand as={Link} to="/" className="fw-bold">
          PedroShop
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />

        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            {navLinks.map(
              ({ to, text, icon: Icon, protected: isProtected }) => {
                if (isProtected && !isAuthenticated()) return null;

                return (
                  <Nav.Link
                    key={to}
                    as={Link}
                    to={to}
                    active={isActive(to)}
                    className="d-flex align-items-center gap-1"
                  >
                    <Icon size={16} />
                    {text}
                  </Nav.Link>
                );
              }
            )}
          </Nav>

          <Nav className="align-items-center bg-red-100">
            {isAuthenticated() ? (
              <>
                <Dropdown align="end" className="">
                  <Dropdown.Toggle
                    variant="light"
                    id="dropdown-user"
                    className="rounded-circle p-0 border-0 bg-white bg-opacity-10"
                    style={{ width: "40px", height: "40px" }}
                  >
                    {user?.avatar ? (
                      <img
                        src={user.avatar}
                        alt={user.name}
                        className="rounded-circle"
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                        }}
                      />
                    ) : (
                      <FiUser size={20} className="mx-auto" />
                    )}
                  </Dropdown.Toggle>

                  <Dropdown.Menu className="mt-2 border-0 shadow">
                    <Dropdown.Header>
                      <div className="fw-bold">{user?.name}</div>
                      <div className="small text-muted">{user?.email}</div>
                    </Dropdown.Header>

                    <Dropdown.Divider />

                    <Dropdown.Item
                      as={Link}
                      to="/cart"
                      className="d-flex align-items-center gap-2"
                    >
                      <FiShoppingCart size={16} />
                      Mi Carrito
                      {totalItems > 0 && (
                        <Badge pill bg="primary" className="ms-auto">
                          {totalItems}
                        </Badge>
                      )}
                    </Dropdown.Item>

                    <Dropdown.Divider />

                    <Dropdown.Item
                      onClick={logout}
                      className="text-danger d-flex align-items-center gap-2"
                    >
                      <FiLogOut size={16} />
                      Cerrar Sesión
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </>
            ) : (
              <Nav.Link
                as={Link}
                to="/login"
                className="d-flex align-items-center gap-1 bg-white bg-opacity-10 rounded-pill px-3"
              >
                <FiUser size={16} />
                Iniciar Sesión
              </Nav.Link>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavigationBar;
