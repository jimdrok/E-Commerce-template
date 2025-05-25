"use client";
import { Container, Row, Col } from "react-bootstrap";

const Footer = () => {
  return (
    <footer
      style={{
        background:
          "linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #334155 100%)",
        color: "white",
        marginTop: "auto",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          height: "4px",
          background:
            "linear-gradient(90deg, #2563eb, #3b82f6, #60a5fa, #3b82f6, #2563eb)",
          backgroundSize: "200% 100%",
          animation: "gradient 3s ease infinite",
        }}
      ></div>

      <Container style={{ position: "relative", zIndex: 2 }}>
        <Row className="py-3">
          <Col md={12}>
            <div style={{ textAlign: "right" }}>
              <p
                style={{
                  color: "rgba(255, 255, 255, 0.6)",
                  margin: 0,
                  fontSize: "0.9rem",
                }}
              >
                Hecho con ❤️ usando React & Bootstrap Desarrollador: Pedro
                Jimenez DNI 96450245 comisión 25017
              </p>
            </div>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
