"use client";
import { Container, Row, Col } from "react-bootstrap";
import { StyledFooter, FooterContent } from "../styled/StyledComponents";

const Footer = () => {
  return (
    <StyledFooter>
      <Container>
        <FooterContent>
          <Row className="py-3">
            <Col md={12}>
              <div style={{ textAlign: "right" }}>
                <p>
                  Hecho con ❤️ usando React & Bootstrap Desarrollador: Pedro
                  Jimenez DNI 96450245 comisión 25017
                </p>
              </div>
            </Col>
          </Row>
        </FooterContent>
      </Container>
    </StyledFooter>
  );
};

export default Footer;