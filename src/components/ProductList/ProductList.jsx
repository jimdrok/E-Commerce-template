"use client";
import { Container, Row, Col, Alert } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import { useAuth } from "../../context/AuthContext";
import { useState } from "react";
import { FiEye, FiShoppingCart, FiTruck } from 'react-icons/fi';
import { toast } from 'react-toastify';
import {
  ProductCard,
  ProductImageContainer,
  ProductImage,
  ProductBadge,
  ProductBody,
  ProductTitle,
  ProductPrice,
  ShippingBadge,
  SecondaryButton,
  AddToCartButton,
  SuccessAlert,
  WarningAlert
} from "../styled/StyledComponents";

const ProductList = ({ products }) => {
  const { addToCart } = useCart();
  const { isAuthenticated } = useAuth();
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 5;
  const totalPages = Math.ceil(products.length / productsPerPage);

  const startIdx = (currentPage - 1) * productsPerPage;
  const endIdx = startIdx + productsPerPage;
  const paginatedProducts = products.slice(startIdx, endIdx);

  const goToPage = (page) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
  };

  return (
    <Container className="my-4">
      <Row xs={1} sm={2} md={2} lg={3} xl={4} className="g-4">
        {paginatedProducts.map((product) => (
          <Col key={product.id}>
            <ProductCard className="h-100">
              <ProductImageContainer>
                <ProductImage
                  variant="top"
                  src={product.image}
                />
                <ProductBadge>
                  Nuevo
                </ProductBadge>
              </ProductImageContainer>

              <ProductBody className="d-flex flex-column">
                <ProductTitle className="flex-grow-1">
                  {product.title}
                </ProductTitle>

                <div className="mt-auto">
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      marginBottom: "1rem",
                    }}
                  >
                    <ProductPrice>
                      ${product.price}
                    </ProductPrice>
                    <ShippingBadge>
                      <FiTruck style={{ marginRight: '4px' }} />
                      Envío gratis
                    </ShippingBadge>
                  </div>

                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "8px",
                    }}
                  >
                    <SecondaryButton
                      as={Link}
                      to={`/products/${product.id}`}
                    >
                      <FiEye style={{ marginRight: '8px' }} />
                      Ver Detalles
                    </SecondaryButton>

                    <AddToCartButton
                      className="w-100"
                      onClick={() => {
                        if (isAuthenticated()) {
                          addToCart(product);
                          toast.success(`¡${product.title} agregado al carrito!`, {
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
                    >
                      <FiShoppingCart style={{ marginRight: '8px' }} />
                      Agregar al carrito
                    </AddToCartButton>
                  </div>
                </div>
              </ProductBody>
            </ProductCard>
          </Col>
        ))}
      </Row>

      {totalPages > 1 && (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: "2rem",
            gap: "8px",
          }}
        >
          <button
            onClick={() => goToPage(currentPage - 1)}
            disabled={currentPage === 1}
            style={{
              padding: "8px 16px",
              borderRadius: "8px",
              border: "1px solid #2563eb",
              background: currentPage === 1 ? "#e5e7eb" : "#2563eb",
              color: currentPage === 1 ? "#64748b" : "white",
              fontWeight: "600",
              cursor: currentPage === 1 ? "not-allowed" : "pointer",
              transition: "all 0.2s",
            }}
          >
            Anterior
          </button>
          {[...Array(totalPages)].map((_, idx) => (
            <button
              key={idx + 1}
              onClick={() => goToPage(idx + 1)}
              style={{
                padding: "8px 12px",
                borderRadius: "8px",
                border: "1px solid #2563eb",
                background: currentPage === idx + 1 ? "#2563eb" : "white",
                color: currentPage === idx + 1 ? "white" : "#2563eb",
                fontWeight: "600",
                cursor: "pointer",
                transition: "all 0.2s",
              }}
            >
              {idx + 1}
            </button>
          ))}
          <button
            onClick={() => goToPage(currentPage + 1)}
            disabled={currentPage === totalPages}
            style={{
              padding: "8px 16px",
              borderRadius: "8px",
              border: "1px solid #2563eb",
              background: currentPage === totalPages ? "#e5e7eb" : "#2563eb",
              color: currentPage === totalPages ? "#64748b" : "white",
              fontWeight: "600",
              cursor: currentPage === totalPages ? "not-allowed" : "pointer",
              transition: "all 0.2s",
            }}
          >
            Siguiente
          </button>
        </div>
      )}
    </Container>
  );
};

export default ProductList;