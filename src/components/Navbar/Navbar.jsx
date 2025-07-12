"use client";

import { Link, useLocation } from "react-router-dom";
import { Badge, Container, Nav, Navbar, Dropdown } from "react-bootstrap";
import { useCart } from "../../context/CartContext";
import { useAuth } from "../../context/AuthContext";
import { useState } from "react";
import { slide as Menu } from 'react-burger-menu';
import { 
  FiHome, 
  FiPackage, 
  FiShoppingCart, 
  FiUser, 
  FiLogOut,
  FiArchive,
  FiMenu,
  FiX
} from 'react-icons/fi';
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
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Configuración para los enlaces principales
  const navLinks = [
    { to: "/", text: "Home", icon: FiHome },
    { to: "/products", text: "Productos", icon: FiPackage },
    { to: "/admin/products", text: "Inventario", icon: FiArchive, protected: true },
  ];

  const isActive = (path) => pathname === path;

  const handleMenuToggle = (state) => {
    setIsMenuOpen(state.isOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const handleLogout = () => {
    logout();
    closeMenu();
  };

  // Estilos para el drawer
  const drawerStyles = {
    bmBurgerButton: {
      display: 'none' // Lo ocultamos porque usamos nuestro botón personalizado
    },
    bmCrossButton: {
      height: '24px',
      width: '24px',
      right: '20px',
      top: '20px'
    },
    bmCross: {
      background: '#ffffff',
      height: '2px',
      width: '2px'
    },
    bmMenuWrap: {
      position: 'fixed',
      height: '100%',
      top: 0,
      left: 0
    },
    bmMenu: {
      background: 'linear-gradient(135deg, #1e3a8a 0%, #2563eb 100%)',
      padding: '2.5em 1.5em 0',
      fontSize: '1.15em',
      overflow: 'hidden'
    },
    bmMorphShape: {
      fill: '#373a47'
    },
    bmItemList: {
      color: '#ffffff',
      padding: '0.8em'
    },
    bmItem: {
      display: 'block',
      color: '#ffffff',
      textDecoration: 'none',
      marginBottom: '1rem',
      padding: '12px 16px',
      borderRadius: '12px',
      transition: 'all 0.3s ease',
      fontSize: '1rem',
      fontWeight: '500'
    },
    bmOverlay: {
      background: 'rgba(0, 0, 0, 0.3)',
      top: 0,
      left: 0
    }
  };

  return (
    <>
      {/* Desktop Navbar */}
      <StyledNavbar expand="lg" className="d-none d-lg-flex">
        <Container>
          <NavBrand as={Link} to="/">
            PedroShop
          </NavBrand>

          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              {navLinks.map(({ to, text, icon: Icon, protected: isProtected }) => {
                if (isProtected && !isAuthenticated()) return null;
                
                return (
                <Nav.Link
                  key={to}
                  as={NavLink}
                  href={to}
                  $isActive={isActive(to)}
                >
                  <Icon style={{ marginRight: '8px', fontSize: '1.1rem' }} />
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

            <Nav>
              {isAuthenticated() ? (
                <>
                  <Nav.Link
                    as={CartButton}
                    href="/cart"
                    $isActive={pathname === "/cart"}
                  >
                    <FiShoppingCart size={20} />
                    {totalItems > 0 && (
                      <CartBadge pill $hasItems={totalItems > 0}>
                        {totalItems}
                      </CartBadge>
                    )}
                  </Nav.Link>

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
                        <FiShoppingCart size={16} />
                        Mi Carrito
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
                >
                  <FiUser style={{ marginRight: '8px', fontSize: '1rem' }} />
                  Iniciar Sesión
                </Nav.Link>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </StyledNavbar>

      {/* Mobile/Tablet Header */}
      <div className="d-flex d-lg-none" style={{
        background: 'linear-gradient(135deg, #1e3a8a 0%, #2563eb 100%)',
        padding: '1rem',
        position: 'sticky',
        top: 0,
        zIndex: 1000,
        boxShadow: '0 4px 20px rgba(30, 58, 138, 0.15)'
      }}>
        <Container className="d-flex justify-content-between align-items-center">
          <NavBrand as={Link} to="/" style={{ margin: 0 }}>
            PedroShop
          </NavBrand>
          
          <button
            onClick={() => setIsMenuOpen(true)}
            style={{
              background: 'transparent',
              border: '2px solid rgba(255, 255, 255, 0.3)',
              borderRadius: '8px',
              color: 'white',
              padding: '8px',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
            onMouseEnter={(e) => {
              e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
              e.target.style.borderColor = 'rgba(255, 255, 255, 0.5)';
            }}
            onMouseLeave={(e) => {
              e.target.style.backgroundColor = 'transparent';
              e.target.style.borderColor = 'rgba(255, 255, 255, 0.3)';
            }}
          >
            <FiMenu size={24} />
          </button>
        </Container>
      </div>

      {/* Mobile/Tablet Drawer Menu */}
      <Menu 
        isOpen={isMenuOpen}
        onStateChange={handleMenuToggle}
        styles={drawerStyles}
        width={'280px'}
        className="d-flex d-lg-none"
      >
        {/* User Section */}
        {isAuthenticated() ? (
          <div style={{
            padding: '1rem 0 2rem 0',
            borderBottom: '1px solid rgba(255, 255, 255, 0.2)',
            marginBottom: '1rem'
          }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '1rem',
              marginBottom: '1rem'
            }}>
              <img
                src={user?.avatar}
                alt={user?.name}
                style={{
                  width: '48px',
                  height: '48px',
                  borderRadius: '50%',
                  objectFit: 'cover',
                  border: '2px solid rgba(255, 255, 255, 0.3)'
                }}
              />
              <div>
                <div style={{
                  color: 'white',
                  fontWeight: '600',
                  fontSize: '1rem'
                }}>
                  {user?.name}
                </div>
                <div style={{
                  color: 'rgba(255, 255, 255, 0.7)',
                  fontSize: '0.85rem'
                }}>
                  {user?.email}
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div style={{
            padding: '1rem 0 2rem 0',
            borderBottom: '1px solid rgba(255, 255, 255, 0.2)',
            marginBottom: '1rem'
          }}>
            <Link
              to="/login"
              onClick={closeMenu}
              style={{
                color: 'white',
                textDecoration: 'none',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                padding: '12px 16px',
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                borderRadius: '12px',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                transition: 'all 0.3s ease'
              }}
            >
              <FiUser size={20} />
              <span style={{ fontWeight: '600' }}>Iniciar Sesión</span>
            </Link>
          </div>
        )}

        {/* Navigation Links */}
        {navLinks.map(({ to, text, icon: Icon, protected: isProtected }) => {
          if (isProtected && !isAuthenticated()) return null;
          
          return (
            <Link
              key={to}
              to={to}
              onClick={closeMenu}
              style={{
                ...drawerStyles.bmItem,
                backgroundColor: isActive(to) ? 'rgba(255, 255, 255, 0.15)' : 'transparent',
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem'
              }}
              onMouseEnter={(e) => {
                if (!isActive(to)) {
                  e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
                }
              }}
              onMouseLeave={(e) => {
                if (!isActive(to)) {
                  e.target.style.backgroundColor = 'transparent';
                }
              }}
            >
              <Icon size={20} />
              <span>{text}</span>
            </Link>
          );
        })}

        {/* Cart Link (only for authenticated users) */}
        {isAuthenticated() && (
          <Link
            to="/cart"
            onClick={closeMenu}
            style={{
              ...drawerStyles.bmItem,
              backgroundColor: isActive('/cart') ? 'rgba(255, 255, 255, 0.15)' : 'transparent',
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem',
              justifyContent: 'space-between'
            }}
            onMouseEnter={(e) => {
              if (!isActive('/cart')) {
                e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
              }
            }}
            onMouseLeave={(e) => {
              if (!isActive('/cart')) {
                e.target.style.backgroundColor = 'transparent';
              }
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <FiShoppingCart size={20} />
              <span>Mi Carrito</span>
            </div>
            {totalItems > 0 && (
              <Badge
                pill
                style={{
                  backgroundColor: '#ef4444',
                  color: 'white',
                  fontSize: '0.75rem',
                  fontWeight: '600',
                  padding: '4px 8px',
                  minWidth: '24px',
                  height: '24px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                {totalItems}
              </Badge>
            )}
          </Link>
        )}

        {/* Logout (only for authenticated users) */}
        {isAuthenticated() && (
          <div style={{
            marginTop: 'auto',
            paddingTop: '2rem',
            borderTop: '1px solid rgba(255, 255, 255, 0.2)'
          }}>
            <button
              onClick={handleLogout}
              style={{
                ...drawerStyles.bmItem,
                backgroundColor: 'transparent',
                border: 'none',
                width: '100%',
                textAlign: 'left',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                color: '#fca5a5'
              }}
              onMouseEnter={(e) => {
                e.target.style.backgroundColor = 'rgba(239, 68, 68, 0.1)';
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = 'transparent';
              }}
            >
              <FiLogOut size={20} />
              <span>Cerrar Sesión</span>
            </button>
          </div>
        )}
      </Menu>
    </>
  );
};

export default NavigationBar;