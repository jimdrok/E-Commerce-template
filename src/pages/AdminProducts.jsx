import { useState } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Alert,
  Badge,
  Table,
  Spinner,
} from "react-bootstrap";
import { useProducts } from "../context/ProductContext";
import ProductForm from "../components/ProductForm/ProductForm";
import ConfirmationModal from "../components/ConfirmationModal/ConfirmationModal";
import { 
  FiPlus, 
  FiEdit3, 
  FiTrash2, 
  FiPackage,
  FiChevronLeft,
  FiChevronRight
} from 'react-icons/fi';
import { toast } from 'react-toastify';

const AdminProducts = () => {
  const { products, loading, error, deleteProduct, clearError } = useProducts();
  const [showForm, setShowForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const productsPerPage = 10;
  const totalPages = Math.ceil(products.length / productsPerPage);
  const startIdx = (currentPage - 1) * productsPerPage;
  const endIdx = startIdx + productsPerPage;
  const paginatedProducts = products.slice(startIdx, endIdx);

  const handleAddProduct = () => {
    setEditingProduct(null);
    setShowForm(true);
  };

  const handleEditProduct = (product) => {
    setEditingProduct(product);
    setShowForm(true);
  };

  const handleDeleteClick = (product) => {
    setProductToDelete(product);
    setShowDeleteModal(true);
  };

  const handleDeleteConfirm = async () => {
    if (!productToDelete) return;

    setDeleteLoading(true);
    try {
      const result = await deleteProduct(productToDelete.id);
      if (result.success) {
        toast.success(`Producto "${productToDelete.title}" eliminado correctamente`, {
          icon: '🗑️',
          position: "top-right",
          autoClose: 3000,
        });
        setShowDeleteModal(false);
        setProductToDelete(null);
      }
    } catch (error) {
      console.error("Error deleting product:", error);
      toast.error('Error al eliminar el producto', {
        icon: '❌',
        position: "top-right",
        autoClose: 4000,
      });
    } finally {
      setDeleteLoading(false);
    }
  };

  const handleFormSuccess = () => {
    setShowForm(false);
    setEditingProduct(null);
  };

  const goToPage = (page) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
  };

  if (loading && products.length === 0) {
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
            marginBottom: "1.5rem",
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
  }

  return (
    <Container style={{ padding: "2rem 0", maxWidth: "1400px" }}>
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
        <div>
          <h1
            style={{
              color: "#1e293b",
              fontWeight: "700",
              margin: 0,
              fontSize: "2rem",
            }}
          >
            Gestión de Inventario
          </h1>
          <p
            style={{
              color: "#64748b",
              margin: "0.5rem 0 0 0",
              fontSize: "1rem",
            }}
          >
            Administra tu inventario de productos
          </p>
        </div>
        <Button
          onClick={handleAddProduct}
          style={{
            background: "linear-gradient(45deg, #2563eb, #3b82f6)",
            border: "none",
            borderRadius: "25px",
            padding: "12px 24px",
            fontSize: "1rem",
            fontWeight: "600",
            color: "white",
            boxShadow: "0 4px 15px rgba(37, 99, 235, 0.3)",
            transition: "all 0.3s ease",
          }}
          onMouseEnter={(e) => {
            e.target.style.transform = "translateY(-2px)";
            e.target.style.boxShadow = "0 8px 25px rgba(37, 99, 235, 0.4)";
          }}
          onMouseLeave={(e) => {
            e.target.style.transform = "translateY(0)";
            e.target.style.boxShadow = "0 4px 15px rgba(37, 99, 235, 0.3)";
          }}
        >
          <FiPlus style={{ marginRight: '8px' }} />
          Agregar Producto
        </Button>
      </div>

      {/* Error Alert */}
      {error && (
        <Alert
          variant="danger"
          dismissible
          onClose={clearError}
          style={{
            borderRadius: "12px",
            border: "1px solid #fecaca",
            backgroundColor: "#fef2f2",
            color: "#dc2626",
            marginBottom: "2rem",
          }}
        >
          <div style={{ fontSize: "1.2rem", marginBottom: "0.5rem" }}>⚠️</div>
          <strong>Error:</strong> {error}
        </Alert>
      )}

      {/* Products Table */}
      <Card
        style={{
          border: "none",
          borderRadius: "16px",
          boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
          overflow: "hidden",
        }}
      >
        <Card.Body style={{ padding: 0 }}>
          {products.length === 0 ? (
            <div
              style={{
                textAlign: "center",
                padding: "4rem 2rem",
                color: "#64748b",
              }}
            >
              <div
                style={{ fontSize: "4rem", marginBottom: "1rem", opacity: 0.5 }}
              >
                <FiPackage size={64} />
              </div>
              <h3 style={{ color: "#1e293b", marginBottom: "1rem" }}>
                No hay productos
              </h3>
              <p style={{ fontSize: "1.1rem", marginBottom: "2rem" }}>
                Comienza agregando tu primer producto al catálogo
              </p>
              <Button
                onClick={handleAddProduct}
                style={{
                  background: "linear-gradient(45deg, #2563eb, #3b82f6)",
                  border: "none",
                  borderRadius: "25px",
                  padding: "12px 24px",
                  fontSize: "1rem",
                  fontWeight: "600",
                  color: "white",
                }}
              >
                <FiPlus style={{ marginRight: '8px' }} />
                Agregar Primer Producto
              </Button>
            </div>
          ) : (
            <div style={{ overflowX: "auto" }}>
              <Table responsive hover style={{ margin: 0, minWidth: "800px" }}>
                <thead
                  style={{
                    backgroundColor: "#f8fafc",
                    borderBottom: "2px solid #e2e8f0",
                  }}
                >
                  <tr>
                    <th
                      style={{
                        padding: "1rem",
                        fontWeight: "600",
                        color: "#1e293b",
                        minWidth: "200px"
                      }}
                    >
                      Producto
                    </th>
                    <th
                      style={{
                        padding: "1rem",
                        fontWeight: "600",
                        color: "#1e293b",
                        minWidth: "120px"
                      }}
                    >
                      Categoría
                    </th>
                    <th
                      style={{
                        padding: "1rem",
                        fontWeight: "600",
                        color: "#1e293b",
                        minWidth: "100px"
                      }}
                    >
                      Precio
                    </th>
                    <th
                      style={{
                        padding: "1rem",
                        fontWeight: "600",
                        color: "#1e293b",
                        minWidth: "250px"
                      }}
                    >
                      Descripción
                    </th>
                    <th
                      style={{
                        padding: "1rem",
                        fontWeight: "600",
                        color: "#1e293b",
                        textAlign: "center",
                        minWidth: "180px"
                      }}
                    >
                      Acciones
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {paginatedProducts.map((product) => (
                    <tr
                      key={product.id}
                      style={{ borderBottom: "1px solid #f1f5f9" }}
                    >
                      <td style={{ padding: "1rem" }}>
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "1rem",
                          }}
                        >
                          <div
                            style={{
                              width: "60px",
                              height: "60px",
                              backgroundColor: "#f8fafc",
                              borderRadius: "8px",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              padding: "4px",
                            }}
                          >
                            <img
                              src={product.image || "/placeholder.svg"}
                              alt={product.title}
                              style={{
                                width: "100%",
                                height: "100%",
                                objectFit: "cover", // Asegura que la imagen cubra el área
                                borderRadius: "8px",
                                display: "block",
                                overflow: "hidden", // Oculta el desbordamiento
                              }}
                            />
                          </div>
                          <div>
                            <h6
                              style={{
                                color: "#1e293b",
                                fontWeight: "600",
                                margin: 0,
                                fontSize: "0.95rem",
                                lineHeight: "1.4",
                                maxWidth: "200px",
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                                whiteSpace: "nowrap",
                              }}
                            >
                              {product.title}
                            </h6>
                          </div>
                        </div>
                      </td>
                      <td style={{ padding: "1rem" }}>
                        <Badge
                          style={{
                            backgroundColor: "#2563eb",
                            color: "white",
                            fontSize: "0.8rem",
                            fontWeight: "500",
                            padding: "6px 12px",
                            borderRadius: "12px",
                            textTransform: "capitalize",
                          }}
                        >
                          {product.category}
                        </Badge>
                      </td>
                      <td style={{ padding: "1rem" }}>
                        <span
                          style={{
                            color: "#2563eb",
                            fontWeight: "700",
                            fontSize: "1.1rem",
                          }}
                        >
                          ${product.price}
                        </span>
                      </td>
                      <td style={{ padding: "1rem", maxWidth: "300px" }}>
                        <p
                          style={{
                            color: "#475569",
                            margin: 0,
                            fontSize: "0.9rem",
                            lineHeight: "1.4",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            display: "-webkit-box",
                            WebkitLineClamp: 2,
                            WebkitBoxOrient: "vertical",
                          }}
                        >
                          {product.description}
                        </p>
                      </td>
                      <td style={{ padding: "1rem", textAlign: "center" }}>
                        <div
                          style={{
                            display: "flex",
                            gap: "0.5rem",
                            justifyContent: "center",
                          }}
                        >
                          <Button
                            size="sm"
                            onClick={() => handleEditProduct(product)}
                            style={{
                              backgroundColor: "#f59e0b",
                              border: "none",
                              borderRadius: "8px",
                              padding: "6px 12px",
                              fontSize: "0.8rem",
                              fontWeight: "600",
                              display: "flex",
                              alignItems: "center",
                              gap: "4px",
                            }}
                          >
                            <FiEdit3 size={14} />
                            Editar
                          </Button>
                          <Button
                            size="sm"
                            onClick={() => handleDeleteClick(product)}
                            style={{
                              backgroundColor: "#ef4444",
                              border: "none",
                              borderRadius: "8px",
                              padding: "6px 12px",
                              fontSize: "0.8rem",
                              fontWeight: "600",
                              display: "flex",
                              alignItems: "center",
                              gap: "4px",
                            }}
                          >
                            <FiTrash2 size={14} />
                            Eliminar
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>
          )}
          {/* Paginador */}
          {totalPages > 1 && (
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                margin: "2rem 0 1rem 0",
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
                <FiChevronLeft style={{ marginRight: '4px' }} />
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
                  background:
                    currentPage === totalPages ? "#e5e7eb" : "#2563eb",
                  color: currentPage === totalPages ? "#64748b" : "white",
                  fontWeight: "600",
                  cursor:
                    currentPage === totalPages ? "not-allowed" : "pointer",
                  transition: "all 0.2s",
                }}
              >
                <FiChevronRight style={{ marginLeft: '4px' }} />
                Siguiente
              </button>
            </div>
          )}
        </Card.Body>
      </Card>

      {/* Product Form Modal */}
      <ProductForm
        show={showForm}
        onHide={() => setShowForm(false)}
        product={editingProduct}
        onSuccess={handleFormSuccess}
      />

      {/* Delete Confirmation Modal */}
      <ConfirmationModal
        show={showDeleteModal}
        onHide={() => setShowDeleteModal(false)}
        onConfirm={handleDeleteConfirm}
        title="Eliminar Producto"
        message={`¿Estás seguro de que deseas eliminar "${productToDelete?.title}"? Esta acción no se puede deshacer.`}
        confirmText="Eliminar"
        cancelText="Cancelar"
        variant="danger"
        loading={deleteLoading}
      />
    </Container>
  );
};

export default AdminProducts;