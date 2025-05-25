import { Link } from "react-router-dom";
import { Badge, Container, Nav, Navbar } from "react-bootstrap";
import { useCart } from "../../context/CartContext";

const NavigationBar = () => {
  const { totalItems } = useCart();
  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand as={Link} to="/">
          Mi E-Commerce
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/">
              Home
            </Nav.Link>
            <Nav.Link as={Link} to="/products">
              Productos
            </Nav.Link>
            <Nav.Link as={Link} to="/cart" className="position-relative">
              Carrito
              {totalItems > 0 && (
                <Badge
                  bg="danger"
                  pill
                  className="position-absolute top-0 start-100 translate-middle"
                >
                  {totalItems}
                </Badge>
              )}
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavigationBar;
