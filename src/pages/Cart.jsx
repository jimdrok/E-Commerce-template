// pages/Cart.jsx
import { Table, Button, Badge, Container, Stack } from "react-bootstrap";
import { useCart } from "../context/CartContext";
import { Link } from "react-router-dom";

const CartPage = () => {
  const {
    cart,
    removeFromCart,
    updateQuantity,
    totalPrice,
    totalItems,
    clearCart,
  } = useCart();

  if (cart.length === 0) {
    return (
      <Container className="text-center my-5">
        <h2>Tu carrito está vacío</h2>
        <Link to="/products" className="btn btn-primary mt-3">
          Ver productos
        </Link>
      </Container>
    );
  }

  return (
    <Container className="my-5">
      <h2 className="mb-4">
        Carrito de Compras <Badge bg="secondary">{totalItems} items</Badge>
      </h2>

      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>Producto</th>
            <th>Precio Unitario</th>
            <th>Cantidad</th>
            <th>Subtotal</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {cart.map((item) => (
            <tr key={item.id}>
              <td className="align-middle">
                <div className="d-flex align-items-center">
                  <img
                    src={item.image}
                    alt={item.title}
                    style={{
                      width: "50px",
                      height: "50px",
                      objectFit: "contain",
                    }}
                    className="me-3"
                  />
                  {item.title}
                </div>
              </td>
              <td className="align-middle">${item.price.toFixed(2)}</td>
              <td className="align-middle">
                <input
                  type="number"
                  min="1"
                  value={item.quantity}
                  onChange={(e) =>
                    updateQuantity(item.id, parseInt(e.target.value))
                  }
                  className="form-control"
                  style={{ width: "80px" }}
                />
              </td>
              <td className="align-middle">
                ${(item.price * item.quantity).toFixed(2)}
              </td>
              <td className="align-middle">
                <Button
                  variant="danger"
                  onClick={() => removeFromCart(item.id)}
                  size="sm"
                >
                  Eliminar
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <div className="text-end">
        <h4>Total: ${totalPrice.toFixed(2)}</h4>
        <Stack
          gap={2}
          direction="horizontal"
          className="justify-content-end mt-3"
        >
          <Button variant="outline-danger" onClick={clearCart}>
            Vaciar Carrito
          </Button>
          <Button variant="success">Finalizar Compra</Button>
        </Stack>
      </div>
    </Container>
  );
};

export default CartPage;
