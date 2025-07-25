"use client";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Container,
  Row,
  Col,
  Image,
  Button,
  Badge,
} from "react-bootstrap";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import { useProducts } from "../context/ProductContext";
import { 
  FiShoppingCart, 
  FiTruck, 
  FiStar,
  FiMinus,
  FiPlus,
  FiCreditCard
} from 'react-icons/fi';
import { toast } from 'react-toastify';

const ProductDetail = () => {
  const { id } = useParams();
  const { addToCart } = useCart();
  const { isAuthenticated } = useAuth();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedQuantity, setSelectedQuantity] = useState(1);
  const { products } = useProducts();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const foundProduct = products.find((p) => String(p.id) === String(id));
        if (!foundProduct) throw new Error("Producto no encontrado");
        setProduct(foundProduct);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id, products]);

  if (loading)
    return (
      <Container
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
            width: "60px",
            height: "60px",
            border: "4px solid #e2e8f0",
            borderTop: "4px solid #2563eb",
            borderRadius: "50%",
            animation: "spin 1s linear infinite",
            marginBottom: "1.5rem",
          }}
        ></div>
        <p
          style={{
            color: "#64748b",
            fontSize: "1.1rem",
            fontWeight: "500",
          }}
        >
          Cargando producto...
        </p>
      </Container>
    );

  if (error)
    return (
      <Container style={{ padding: "2rem 0" }}>
        <Alert
          style={{
            backgroundColor: "#fef2f2",
            border: "1px solid #fecaca",
            borderRadius: "16px",
            padding: "2rem",
            color: "#dc2626",
            fontSize: "1.1rem",
            textAlign: "center",
          }}
        >
          <div style={{ fontSize: "2rem", marginBottom: "1rem" }}>⚠️</div>
          <strong>Error:</strong> {error}
        </Alert>
      </Container>
    );

  return (
    <Container style={{ padding: "2rem 0", maxWidth: "1200px" }}>
      <Row>
        {/* Columna de la imagen */}
        <Col lg={6} md={12} className="mb-4">
          <div
            style={{
              backgroundColor: "white",
              padding: "2rem",
              borderRadius: "20px",
              boxShadow: "0 8px 32px rgba(0,0,0,0.1)",
              position: "relative",
              overflow: "hidden",
            }}
          >
            <Image
              src={product.image || "/placeholder.svg"}
              fluid
              style={{
                maxHeight: "500px",
                minHeight: "300px",
                width: "100%",
                height: "220px",
                objectFit: "cover",
                padding: 0,
                transition: "transform 0.3s ease",
                backgroundColor: "transparent",
                borderRadius: "16px 16px 0 0",
                display: "block",
                overflow: "hidden",
              }}
              onMouseEnter={(e) => {
                e.target.style.transform = "scale(1.05)";
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = "scale(1)";
              }}
            />
          </div>
        </Col>

        {/* Columna de la información */}
        <Col lg={6} md={12}>
          <div style={{ padding: "1rem 0" }}>
            {/* Título */}
            <h1
              style={{
                color: "#1e293b",
                fontWeight: "700",
                fontSize: "2rem",
                lineHeight: "1.3",
                marginBottom: "1.5rem",
              }}
            >
              {product.title}
            </h1>

            {/* Categoría y Rating */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "1rem",
                marginBottom: "2rem",
                flexWrap: "wrap",
              }}
            >
              <Badge
                style={{
                  backgroundColor: "#2563eb",
                  color: "white",
                  fontSize: "0.9rem",
                  fontWeight: "600",
                  padding: "8px 16px",
                  borderRadius: "20px",
                  textTransform: "capitalize",
                }}
              >
                {product.category}
              </Badge>
              <div
                style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}
              >
                <div style={{ display: "flex", gap: "2px" }}>
                  {[...Array(5)].map((_, i) => (
                    <FiStar
                      key={i}
                      style={{
                        color:
                          i < Math.round(product.rating)
                            ? "#fbbf24"
                            : "#e5e7eb",
                        fontSize: "1.2rem",
                        fill: i < Math.round(product.rating) ? "#fbbf24" : "none",
                      }}
                    />
                  ))}
                </div>
                <span
                  style={{
                    color: "#64748b",
                    fontSize: "0.9rem",
                    fontWeight: "500",
                  }}
                >
                  ({product.rating.count} reseñas)
                </span>
              </div>
            </div>

            {/* Precio */}
            <div
              style={{
                marginBottom: "2rem",
                padding: "1.5rem",
                backgroundColor: "#f8fafc",
                borderRadius: "16px",
                border: "1px solid #e2e8f0",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "1rem",
                  marginBottom: "0.5rem",
                }}
              >
                <h2
                  style={{
                    color: "#2563eb",
                    fontWeight: "700",
                    fontSize: "2.5rem",
                    margin: 0,
                    background: "linear-gradient(45deg, #2563eb, #3b82f6)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                >
                  ${product.price}
                </h2>
                <div
                  style={{
                    backgroundColor: "#dcfce7",
                    color: "#166534",
                    padding: "4px 12px",
                    borderRadius: "12px",
                    fontSize: "0.8rem",
                    fontWeight: "600",
                    display: "flex",
                    alignItems: "center",
                    gap: "4px",
                  }}
                >
                  <FiTruck size={14} />
                  Envío gratis
                </div>
              </div>
              <p
                style={{
                  color: "#64748b",
                  fontSize: "0.9rem",
                  margin: 0,
                }}
              >
                Precio final con todos los impuestos incluidos
              </p>
            </div>

            {/* Descripción */}
            <div style={{ marginBottom: "2rem" }}>
              <h4
                style={{
                  color: "#1e293b",
                  fontWeight: "600",
                  marginBottom: "1rem",
                }}
              >
                Descripción
              </h4>
              <p
                style={{
                  color: "#475569",
                  fontSize: "1.1rem",
                  lineHeight: "1.6",
                  backgroundColor: "white",
                  padding: "1.5rem",
                  borderRadius: "12px",
                  border: "1px solid #e2e8f0",
                }}
              >
                {product.description}
              </p>
            </div>

            {/* Cantidad y Botones */}
            <div
              style={{
                backgroundColor: "white",
                padding: "1.5rem",
                borderRadius: "16px",
                boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
                marginBottom: "2rem",
              }}
            >
              {/* Selector de cantidad */}
              <div style={{ marginBottom: "1.5rem" }}>
                <label
                  style={{
                    color: "#1e293b",
                    fontWeight: "600",
                    marginBottom: "0.5rem",
                    display: "block",
                  }}
                >
                  Cantidad:
                </label>
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
                      setSelectedQuantity(Math.max(1, selectedQuantity - 1))
                    }
                    style={{
                      backgroundColor: "#f1f5f9",
                      border: "1px solid #e2e8f0",
                      color: "#475569",
                      borderRadius: "8px",
                      width: "40px",
                      height: "40px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontWeight: "600",
                    }}
                  >
                    <FiMinus size={16} />
                  </Button>
                  <input
                    type="number"
                    min="1"
                    value={selectedQuantity}
                    onChange={(e) =>
                      setSelectedQuantity(Number.parseInt(e.target.value) || 1)
                    }
                    style={{
                      width: "80px",
                      height: "40px",
                      textAlign: "center",
                      border: "1px solid #e2e8f0",
                      borderRadius: "8px",
                      fontSize: "1rem",
                      fontWeight: "600",
                    }}
                  />
                  <Button
                    size="sm"
                    onClick={() => setSelectedQuantity(selectedQuantity + 1)}
                    style={{
                      backgroundColor: "#2563eb",
                      border: "1px solid #2563eb",
                      color: "white",
                      borderRadius: "8px",
                      width: "40px",
                      height: "40px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontWeight: "600",
                    }}
                  >
                    <FiPlus size={16} />
                  </Button>
                </div>
              </div>

              {/* Botones de acción */}
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "0.75rem",
                }}
              >
                <Button
                  size="lg"
                  onClick={() => {
                    if (isAuthenticated()) {
                      for (let i = 0; i < selectedQuantity; i++) {
                        addToCart(product);
                      }
                      toast.success(`¡${selectedQuantity} ${product.title} agregado${selectedQuantity > 1 ? 's' : ''} al carrito!`, {
                        icon: '🛒',
                        position: "top-right",
                        autoClose: 3000,
                      });
                    } else {
                      toast.warning('Inicia sesión para agregar productos al carrito', {
                        icon: '🔒',
                        position: "top-right",
                        autoClose: 3000,
                      });
                    }
                  }}
                  style={{
                    background: "linear-gradient(45deg, #2563eb, #3b82f6)",
                    border: "none",
                    borderRadius: "25px",
                    padding: "15px 20px",
                    fontSize: "1.1rem",
                    fontWeight: "600",
                    color: "white",
                    boxShadow: "0 8px 25px rgba(37, 99, 235, 0.3)",
                    transition: "all 0.3s ease",
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.transform = "translateY(-2px)";
                    e.target.style.boxShadow =
                      "0 12px 35px rgba(37, 99, 235, 0.4)";
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.transform = "translateY(0)";
                    e.target.style.boxShadow =
                      "0 8px 25px rgba(37, 99, 235, 0.3)";
                  }}
                >
                  <FiShoppingCart style={{ marginRight: '8px' }} />
                  Agregar al carrito
                </Button>
              </div>
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default ProductDetail;