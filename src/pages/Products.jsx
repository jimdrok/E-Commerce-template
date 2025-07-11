// pages/Products.jsx
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Container, Alert, Spinner } from "react-bootstrap";
import ProductList from "../components/ProductList/ProductList";
import { useProducts } from "../context/ProductContext";

const Products = () => {
  const { products, loading, error, clearError } = useProducts();
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchParams] = useSearchParams();
  const category = searchParams.get("category");

  useEffect(() => {
    if (category) {
      const filtered = products.filter(product => 
        product.category.toLowerCase() === category.toLowerCase()
      );
      setFilteredProducts(filtered);
    } else {
      setFilteredProducts(products);
    }
  }, [products, category]);

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
        <Spinner
          animation="border"
          style={{
            width: "60px",
            height: "60px",
            borderWidth: "4px",
            color: "#2563eb",
            marginBottom: "1.5rem"
          }}
        />
        <p
          style={{
            color: "#64748b",
            fontSize: "1.1rem",
            fontWeight: "500",
          }}
        >
          Cargando productos...
        </p>
      </Container>
    );

  if (error)
    return (
      <Container style={{ padding: "2rem 0" }}>
        <Alert
          variant="danger"
          dismissible
          onClose={clearError}
          style={{
            borderRadius: "12px",
            border: "1px solid #fecaca",
            backgroundColor: "#fef2f2",
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
    <div className="container">
      <h1 
        className="my-4 text-center"
        style={{
          color: "#1e293b",
          fontWeight: "700",
          fontSize: "2.5rem",
          marginBottom: "2rem"
        }}
      >
        {category 
          ? `Productos de ${category.charAt(0).toUpperCase() + category.slice(1)}` 
          : "Nuestros Productos"
        }
      </h1>
      <ProductList products={filteredProducts} />
    </div>
  );
};

export default Products;
