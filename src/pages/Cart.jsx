"use client";
import { Button, Badge, Container, Row, Col, Card } from "react-bootstrap";
import { useCart } from "../context/CartContext";
import { Link } from "react-router-dom";
import { 
  FiShoppingCart, 
  FiTrash2, 
  FiMinus, 
  FiPlus,
  FiCreditCard,
  FiPackage
} from 'react-icons/fi';

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
      <Container
        className="text-center"
        style={{
          minHeight: "60vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          padding: "4rem 2rem",
        }}
      >
        <div
          style={{
            backgroundColor: "white",
            borderRadius: "24px",
            padding: "3rem 2rem",
            boxShadow: "0 8px 32px rgba(0,0,0,0.1)",
            maxWidth: "500px",
          <FiShoppingCart size={64} />
          }}
        >
          <div
            style={{
              fontSize: "4rem",
              marginBottom: "1.5rem",
              opacity: 0.6,
            }}
          >
            🛒
          </div>
          <h2
            style={{
              color: "#1e293b",
              fontWeight: "700",
              marginBottom: "1rem",
              fontSize: "1.8rem",
            }}
          >
            Tu carrito está vacío
          </h2>
          <p
            style={{
              color: "#64748b",
              marginBottom: "2rem",
              fontSize: "1.1rem",
              lineHeight: "1.6",
            }}
          >
            ¡Descubre nuestros increíbles productos y comienza a llenar tu
            carrito!
          </p>
          <Button
            as={Link}
            to="/products"
            style={{
              background: "linear-gradient(45deg, #2563eb, #3b82f6)",
              border: "none",
              borderRadius: "50px",
              padding: "15px 40px",
              fontSize: "1.1rem",
              fontWeight: "600",
              color: "white",
              boxShadow: "0 8px 25px rgba(37, 99, 235, 0.3)",
              transition: "all 0.3s ease",
              textDecoration: "none",
            }}
            onMouseEnter={(e) => {
              e.target.style.transform = "translateY(-2px)";
              e.target.style.boxShadow = "0 12px 35px rgba(37, 99, 235, 0.4)";
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = "translateY(0)";
              e.target.style.boxShadow = "0 8px 25px rgba(37, 99, 235, 0.3)";
            }}
          >
            Ver productos
          </Button>
        </div>
      </Container>
    );
  }

  return (
    <Container style={{ padding: "2rem 0", maxWidth: "1200px" }}>
      {/* Header */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: "2rem",
          padding: "1.5rem",
          backgroundColor: "white",
          borderRadius: "16px",
          boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
          <h2
            style={{
              color: "#1e293b",
              fontWeight: "700",
              margin: 0,
              fontSize: "1.8rem",
            }}
          >
            Carrito de Compras
          </h2>
          <Badge
            style={{
              backgroundColor: "#2563eb",
              color: "white",
              fontSize: "0.9rem",
              fontWeight: "600",
              padding: "8px 16px",
              borderRadius: "20px",
            }}
          >
            {totalItems} {totalItems === 1 ? "item" : "items"}
          </Badge>
        </div>
      </div>

      <Row>
        {/* Products List */}
        <Col lg={8}>
          <div
            style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
          >
            {cart.map((item) => (
              <Card
                key={item.id}
                style={{
                  border: "none",
                  borderRadius: "16px",
                  boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
                  overflow: "hidden",
                  transition: "all 0.3s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.boxShadow =
                    "0 8px 30px rgba(0,0,0,0.12)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.boxShadow =
                    "0 4px 20px rgba(0,0,0,0.08)";
                }}
              >
                <Card.Body style={{ padding: "1.5rem" }}>
                  <Row className="align-items-center">
                    {/* Product Image & Info */}
                    <Col md={6}>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "1rem",
                        }}
                      >
                        <div
                          style={{
                            width: "80px",
                            height: "80px",
                            backgroundColor: "#f8fafc",
                            borderRadius: "12px",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            padding: "8px",
                          }}
                        >
                          <img
                            src={item.image || "/placeholder.svg"}
                            alt={item.title}
                            style={{
                              width: "100%",
                              height: "100%",
                              objectFit: "cover", // Ajuste para cubrir el componente
                              borderRadius: "12px",
                              display: "block",
                              overflow: "hidden",
                            }}
                          />
                        </div>
                        <div style={{ flex: 1 }}>
                          <h6
                            style={{
                              color: "#1e293b",
                              fontWeight: "600",
                              margin: 0,
                              fontSize: "1rem",
                              lineHeight: "1.4",
                              display: "-webkit-box",
                              WebkitLineClamp: 2,
                              WebkitBoxOrient: "vertical",
                              overflow: "hidden",
                            }}
                          >
                            {item.title}
                          </h6>
                          <p
                            style={{
                              color: "#2563eb",
                              fontWeight: "700",
                              margin: "0.5rem 0 0 0",
                              fontSize: "1.1rem",
                            }}
                          >
                            ${item.price}
                          </p>
                        </div>
                      </div>
                    </Col>

                    {/* Quantity Controls */}
                    <Col md={3}>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "0.5rem",
                        }}
                      >
                        <Button
                          size="sm"
                          onClick={() =>
                            updateQuantity(
                              item.id,
                              Math.max(1, item.quantity - 1)
                            )
                          }
                          style={{
                            backgroundColor: "#f1f5f9",
                            border: "1px solid #e2e8f0",
                            color: "#475569",
                            borderRadius: "8px",
                            width: "32px",
                            height: "32px",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            fontWeight: "600",
                          }}
                        >
                          <FiMinus size={14} />
                        </Button>
                        <input
                          type="number"
                          min="1"
                          value={item.quantity}
                          onChange={(e) =>
                            updateQuantity(
                              item.id,
                              Number.parseInt(e.target.value) || 1
                            )
                          }
                          style={{
                            width: "60px",
                            height: "32px",
                            textAlign: "center",
                            border: "1px solid #e2e8f0",
                            borderRadius: "8px",
                            fontSize: "0.9rem",
                            fontWeight: "600",
                          }}
                        />
                        <Button
                          size="sm"
                          onClick={() =>
                            updateQuantity(item.id, item.quantity + 1)
                          }
                          style={{
                            backgroundColor: "#2563eb",
                            border: "1px solid #2563eb",
                            color: "white",
                            borderRadius: "8px",
                            width: "32px",
                            height: "32px",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            fontWeight: "600",
                          }}
                        >
                          <FiPlus size={14} />
                        </Button>
                      </div>
                    </Col>

                    {/* Subtotal & Actions */}
                    <Col md={3}>
                      <div style={{ textAlign: "right" }}>
                        <p
                          style={{
                            color: "#1e293b",
                            fontWeight: "700",
                            fontSize: "1.2rem",
                            margin: "0 0 0.5rem 0",
                          }}
                        >
                          ${(item.price * item.quantity).toFixed(2)}
                        </p>
                        <Button
                          size="sm"
                          onClick={() => removeFromCart(item.id)}
                          style={{
                            backgroundColor: "transparent",
                            color: "#ef4444",
                            border: "1px solid #ef4444",
                            borderRadius: "20px",
                            padding: "4px 12px",
                            fontSize: "0.8rem",
                            fontWeight: "600",
                            transition: "all 0.3s ease",
                          }}
                          onMouseEnter={(e) => {
                            e.target.style.backgroundColor = "#ef4444";
                            e.target.style.color = "white";
                          }}
                          onMouseLeave={(e) => {
                            e.target.style.backgroundColor = "transparent";
                            e.target.style.color = "#ef4444";
                          }}
                        >
                          <FiTrash2 style={{ marginRight: '4px' }} size={14} />
                          Eliminar
                        </Button>
                      </div>
                    </Col>
                  </Row>
                </Card.Body>
              </Card>
            ))}
          </div>
        </Col>

        {/* Order Summary */}
        <Col lg={4}>
          <Card
            style={{
              border: "none",
              borderRadius: "16px",
              boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
              position: "sticky",
              top: "2rem",
            }}
          >
            <Card.Body style={{ padding: "2rem" }}>
              <h5
                style={{
                  color: "#1e293b",
                  fontWeight: "700",
                  marginBottom: "1.5rem",
                  fontSize: "1.3rem",
                }}
              >
                Resumen del pedido
              </h5>

              <div style={{ marginBottom: "1.5rem" }}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginBottom: "0.5rem",
                  }}
                >
                  <span style={{ color: "#64748b" }}>
                    Subtotal ({totalItems} items)
                  </span>
                  <span style={{ fontWeight: "600" }}>
                    ${totalPrice.toFixed(2)}
                  </span>
                </div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginBottom: "0.5rem",
                  }}
                >
                  <span style={{ color: "#64748b" }}>Envío</span>
                  <span style={{ color: "#10b981", fontWeight: "600" }}>
                    Gratis
                  </span>
                </div>
                <hr style={{ margin: "1rem 0", border: "1px solid #e2e8f0" }} />
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    fontSize: "1.2rem",
                    fontWeight: "700",
                    color: "#1e293b",
                  }}
                >
                  <span>Total</span>
                  <span>${totalPrice.toFixed(2)}</span>
                </div>
              </div>

              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "0.75rem",
                }}
              >
                <Button
                  style={{
                    background: "linear-gradient(45deg, #10b981, #059669)",
                    border: "none",
                    borderRadius: "25px",
                    padding: "15px",
                    fontSize: "1.1rem",
                    fontWeight: "600",
                    color: "white",
                    boxShadow: "0 4px 15px rgba(16, 185, 129, 0.3)",
                    transition: "all 0.3s ease",
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.transform = "translateY(-2px)";
                    e.target.style.boxShadow =
                      "0 8px 25px rgba(16, 185, 129, 0.4)";
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.transform = "translateY(0)";
                    e.target.style.boxShadow =
                      "0 4px 15px rgba(16, 185, 129, 0.3)";
                  }}
                >
                  <FiCreditCard style={{ marginRight: '8px' }} />
                  Finalizar Compra
                </Button>

                <Button
                  onClick={clearCart}
                  style={{
                    backgroundColor: "transparent",
                    color: "#ef4444",
                    border: "2px solid #ef4444",
                    borderRadius: "25px",
                    padding: "12px",
                    fontSize: "1rem",
                    fontWeight: "600",
                    transition: "all 0.3s ease",
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.backgroundColor = "#ef4444";
                    e.target.style.color = "white";
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.backgroundColor = "transparent";
                    e.target.style.color = "#ef4444";
                  }}
                >
                  <FiTrash2 style={{ marginRight: '8px' }} />
                  Vaciar Carrito
                </Button>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default CartPage;
