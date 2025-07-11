import { useState } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { Container, Row, Col, Card, Form, Button, Alert } from "react-bootstrap";
import { useAuth } from "../context/AuthContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  
  // Obtener la ruta desde donde vino el usuario
  const from = location.state?.from?.pathname || "/";

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await login(email, password);
      navigate(from, { replace: true });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container
      style={{
        minHeight: "80vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "2rem 0",
      }}
    >
      <Row className="w-100 justify-content-center">
        <Col md={6} lg={4}>
          <Card
            style={{
              border: "none",
              borderRadius: "20px",
              boxShadow: "0 8px 32px rgba(0,0,0,0.1)",
              overflow: "hidden",
            }}
          >
            <div
              style={{
                background: "linear-gradient(135deg, #2563eb 0%, #3b82f6 100%)",
                padding: "2rem",
                textAlign: "center",
                color: "white",
              }}
            >
              <h2
                style={{
                  fontWeight: "700",
                  marginBottom: "0.5rem",
                  fontSize: "2rem",
                }}
              >
                Bienvenido
              </h2>
              <p
                style={{
                  opacity: 0.9,
                  margin: 0,
                  fontSize: "1.1rem",
                }}
              >
                Inicia sesión en PedroShop
              </p>
            </div>

            <Card.Body style={{ padding: "2rem" }}>
              {error && (
                <Alert
                  variant="danger"
                  style={{
                    borderRadius: "12px",
                    border: "1px solid #fecaca",
                    backgroundColor: "#fef2f2",
                    color: "#dc2626",
                    marginBottom: "1.5rem",
                  }}
                >
                  <div style={{ fontSize: "1.2rem", marginBottom: "0.5rem" }}>
                    ⚠️
                  </div>
                  {error}
                </Alert>
              )}

              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                  <Form.Label
                    style={{
                      fontWeight: "600",
                      color: "#1e293b",
                      marginBottom: "0.5rem",
                    }}
                  >
                    Email
                  </Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="tu@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    style={{
                      borderRadius: "12px",
                      border: "2px solid #e2e8f0",
                      padding: "12px 16px",
                      fontSize: "1rem",
                      transition: "all 0.3s ease",
                    }}
                    onFocus={(e) => {
                      e.target.style.borderColor = "#2563eb";
                      e.target.style.boxShadow = "0 0 0 3px rgba(37, 99, 235, 0.1)";
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = "#e2e8f0";
                      e.target.style.boxShadow = "none";
                    }}
                  />
                </Form.Group>

                <Form.Group className="mb-4">
                  <Form.Label
                    style={{
                      fontWeight: "600",
                      color: "#1e293b",
                      marginBottom: "0.5rem",
                    }}
                  >
                    Contraseña
                  </Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    minLength={6}
                    style={{
                      borderRadius: "12px",
                      border: "2px solid #e2e8f0",
                      padding: "12px 16px",
                      fontSize: "1rem",
                      transition: "all 0.3s ease",
                    }}
                    onFocus={(e) => {
                      e.target.style.borderColor = "#2563eb";
                      e.target.style.boxShadow = "0 0 0 3px rgba(37, 99, 235, 0.1)";
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = "#e2e8f0";
                      e.target.style.boxShadow = "none";
                    }}
                  />
                  <Form.Text
                    style={{
                      color: "#64748b",
                      fontSize: "0.85rem",
                      marginTop: "0.5rem",
                    }}
                  >
                    Mínimo 6 caracteres
                  </Form.Text>
                </Form.Group>

                <Button
                  type="submit"
                  disabled={loading}
                  style={{
                    width: "100%",
                    background: "linear-gradient(45deg, #2563eb, #3b82f6)",
                    border: "none",
                    borderRadius: "12px",
                    padding: "12px",
                    fontSize: "1.1rem",
                    fontWeight: "600",
                    color: "white",
                    boxShadow: "0 4px 15px rgba(37, 99, 235, 0.3)",
                    transition: "all 0.3s ease",
                    marginBottom: "1rem",
                  }}
                  onMouseEnter={(e) => {
                    if (!loading) {
                      e.target.style.transform = "translateY(-2px)";
                      e.target.style.boxShadow = "0 8px 25px rgba(37, 99, 235, 0.4)";
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!loading) {
                      e.target.style.transform = "translateY(0)";
                      e.target.style.boxShadow = "0 4px 15px rgba(37, 99, 235, 0.3)";
                    }
                  }}
                >
                  {loading ? (
                    <>
                      <span
                        style={{
                          display: "inline-block",
                          width: "16px",
                          height: "16px",
                          border: "2px solid transparent",
                          borderTop: "2px solid white",
                          borderRadius: "50%",
                          animation: "spin 1s linear infinite",
                          marginRight: "8px",
                        }}
                      ></span>
                      Iniciando sesión...
                    </>
                  ) : (
                    "Iniciar Sesión"
                  )}
                </Button>
              </Form>

              <div
                style={{
                  textAlign: "center",
                  padding: "1rem",
                  backgroundColor: "#f8fafc",
                  borderRadius: "12px",
                  marginTop: "1rem",
                }}
              >
                <p
                  style={{
                    color: "#64748b",
                    fontSize: "0.9rem",
                    margin: "0 0 0.5rem 0",
                    fontWeight: "500",
                  }}
                >
                  💡 Datos de prueba:
                </p>
                <p
                  style={{
                    color: "#475569",
                    fontSize: "0.85rem",
                    margin: 0,
                    fontFamily: "monospace",
                  }}
                >
                  Email: cualquier@email.com<br />
                  Contraseña: 123456
                </p>
              </div>

              <div style={{ textAlign: "center", marginTop: "1.5rem" }}>
                <Link
                  to="/"
                  style={{
                    color: "#2563eb",
                    textDecoration: "none",
                    fontSize: "0.9rem",
                    fontWeight: "500",
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.textDecoration = "underline";
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.textDecoration = "none";
                  }}
                >
                  ← Volver al inicio
                </Link>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;