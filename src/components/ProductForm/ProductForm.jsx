import { useState, useEffect } from "react";
import { Modal, Form, Button, Alert, Row, Col } from "react-bootstrap";
import { useProducts } from "../../context/ProductContext";
import { FiSave, FiX } from "react-icons/fi";
import { toast } from "react-toastify";

const ProductForm = ({ show, onHide, product = null, onSuccess }) => {
  const { createProduct, updateProduct, loading } = useProducts();
  const [formData, setFormData] = useState({
    title: "",
    price: "",
    description: "",
    category: "",
    image: "",
  });
  const [errors, setErrors] = useState({});
  const [submitError, setSubmitError] = useState("");
  const [submitSuccess, setSubmitSuccess] = useState("");

  const isEditing = !!product;

  // Reset form when modal opens/closes or product changes
  useEffect(() => {
    if (show) {
      if (product) {
        setFormData({
          title: product.title || "",
          price: product.price?.toString() || "",
          description: product.description || "",
          category: product.category || "",
          image: product.image || "",
        });
      } else {
        setFormData({
          title: "",
          price: "",
          description: "",
          category: "",
          image: "",
        });
      }
      setErrors({});
      setSubmitError("");
      setSubmitSuccess("");
    }
  }, [show, product]);

  const validateForm = () => {
    const newErrors = {};

    // Nombre obligatorio
    if (!formData.title.trim()) {
      newErrors.title = "El nombre del producto es obligatorio";
    }

    // Precio mayor a 0
    const price = parseFloat(formData.price);
    if (!formData.price || isNaN(price) || price <= 0) {
      newErrors.price = "El precio debe ser mayor a 0";
    }

    // Descripción mínima de 10 caracteres
    if (!formData.description.trim()) {
      newErrors.description = "La descripción es obligatoria";
    } else if (formData.description.trim().length < 10) {
      newErrors.description =
        "La descripción debe tener al menos 10 caracteres";
    }

    // Categoría obligatoria
    if (!formData.category.trim()) {
      newErrors.category = "La categoría es obligatoria";
    }

    // URL de imagen (opcional pero si se proporciona debe ser válida)
    if (formData.image && !isValidUrl(formData.image)) {
      newErrors.image = "La URL de la imagen no es válida";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const isValidUrl = (string) => {
    try {
      new URL(string);
      return true;
    } catch (_) {
      return false;
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitError("");
    setSubmitSuccess("");

    if (!validateForm()) {
      return;
    }

    const productData = {
      title: formData.title.trim(),
      price: parseFloat(formData.price),
      description: formData.description.trim(),
      category: formData.category.trim(),
      image:
        formData.image.trim() ||
        "https://via.placeholder.com/300x300?text=Producto",
    };

    try {
      let result;
      if (isEditing) {
        result = await updateProduct(product.id, productData);
      } else {
        result = await createProduct(productData);
      }

      if (result.success) {
        setSubmitSuccess(
          isEditing
            ? "¡Producto actualizado exitosamente!"
            : "¡Producto creado exitosamente!"
        );

        // Toast notification
        toast.success(
          isEditing
            ? `Producto "${productData.title}" actualizado correctamente`
            : `Producto "${productData.title}" creado correctamente`,
          {
            icon: isEditing ? "✏️" : "✅",
            position: "top-right",
            autoClose: 3000,
          }
        );

        // Call success callback and close modal after a short delay
        setTimeout(() => {
          onSuccess && onSuccess(result.data);
          onHide();
        }, 1500);
      } else {
        setSubmitError(result.error);
        toast.error(result.error, {
          icon: "❌",
          position: "top-right",
          autoClose: 4000,
        });
      }
    } catch (error) {
      setSubmitError("Error inesperado: " + error.message);
      toast.error("Error inesperado: " + error.message, {
        icon: "❌",
        position: "top-right",
        autoClose: 4000,
      });
    }
  };

  const categories = [
    "electronics",
    "jewelery",
    "men's clothing",
    "women's clothing",
    "books",
    "home & garden",
    "sports",
    "toys",
  ];

  return (
    <Modal
      show={show}
      onHide={onHide}
      size="lg"
      backdrop="static"
      keyboard={false}
    >
      <Modal.Header
        closeButton
        style={{
          backgroundColor: "#f8fafc",
          borderBottom: "1px solid #e2e8f0",
        }}
      >
        <Modal.Title
          style={{
            color: "#1e293b",
            fontWeight: "700",
            fontSize: "1.5rem",
          }}
        >
          {isEditing ? "Editar Producto" : "Agregar Nuevo Producto"}
        </Modal.Title>
      </Modal.Header>

      <Modal.Body style={{ padding: "2rem" }}>
        {submitError && (
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
            <div style={{ fontSize: "1.2rem", marginBottom: "0.5rem" }}>⚠️</div>
            {submitError}
          </Alert>
        )}

        {submitSuccess && (
          <Alert
            variant="success"
            style={{
              borderRadius: "12px",
              border: "1px solid #bbf7d0",
              backgroundColor: "#dcfce7",
              color: "#166534",
              marginBottom: "1.5rem",
            }}
          >
            <div style={{ fontSize: "1.2rem", marginBottom: "0.5rem" }}>✅</div>
            {submitSuccess}
          </Alert>
        )}

        <Form onSubmit={handleSubmit}>
          <Row>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label
                  style={{
                    fontWeight: "600",
                    color: "#1e293b",
                    marginBottom: "0.5rem",
                  }}
                >
                  Nombre del Producto *
                </Form.Label>
                <Form.Control
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  isInvalid={!!errors.title}
                  placeholder="Ej: iPhone 15 Pro Max"
                  style={{
                    borderRadius: "12px",
                    border: "2px solid #e2e8f0",
                    padding: "12px 16px",
                    fontSize: "1rem",
                  }}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.title}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>

            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label
                  style={{
                    fontWeight: "600",
                    color: "#1e293b",
                    marginBottom: "0.5rem",
                  }}
                >
                  Precio *
                </Form.Label>
                <Form.Control
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  isInvalid={!!errors.price}
                  placeholder="0.00"
                  min="0"
                  step="0.01"
                  style={{
                    borderRadius: "12px",
                    border: "2px solid #e2e8f0",
                    padding: "12px 16px",
                    fontSize: "1rem",
                  }}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.price}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
          </Row>

          <Row>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label
                  style={{
                    fontWeight: "600",
                    color: "#1e293b",
                    marginBottom: "0.5rem",
                  }}
                >
                  Categoría *
                </Form.Label>
                <Form.Select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  isInvalid={!!errors.category}
                  style={{
                    borderRadius: "12px",
                    border: "2px solid #e2e8f0",
                    padding: "12px 16px",
                    fontSize: "1rem",
                  }}
                >
                  <option value="">Seleccionar categoría</option>
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat.charAt(0).toUpperCase() + cat.slice(1)}
                    </option>
                  ))}
                </Form.Select>
                <Form.Control.Feedback type="invalid">
                  {errors.category}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>

            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label
                  style={{
                    fontWeight: "600",
                    color: "#1e293b",
                    marginBottom: "0.5rem",
                  }}
                >
                  URL de Imagen
                </Form.Label>
                <Form.Control
                  type="url"
                  name="image"
                  value={formData.image}
                  onChange={handleChange}
                  isInvalid={!!errors.image}
                  placeholder="https://ejemplo.com/imagen.jpg"
                  style={{
                    borderRadius: "12px",
                    border: "2px solid #e2e8f0",
                    padding: "12px 16px",
                    fontSize: "1rem",
                  }}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.image}
                </Form.Control.Feedback>
                <Form.Text style={{ color: "#64748b", fontSize: "0.85rem" }}>
                  Opcional - Se usará una imagen por defecto si no se
                  proporciona
                </Form.Text>
              </Form.Group>
            </Col>
          </Row>

          <Form.Group className="mb-4">
            <Form.Label
              style={{
                fontWeight: "600",
                color: "#1e293b",
                marginBottom: "0.5rem",
              }}
            >
              Descripción *
            </Form.Label>
            <Form.Control
              as="textarea"
              rows={4}
              name="description"
              value={formData.description}
              onChange={handleChange}
              isInvalid={!!errors.description}
              placeholder="Describe las características principales del producto..."
              style={{
                borderRadius: "12px",
                border: "2px solid #e2e8f0",
                padding: "12px 16px",
                fontSize: "1rem",
                resize: "vertical",
              }}
            />
            <Form.Control.Feedback type="invalid">
              {errors.description}
            </Form.Control.Feedback>
            <Form.Text style={{ color: "#64748b", fontSize: "0.85rem" }}>
              Mínimo 10 caracteres ({formData.description.length}/10)
            </Form.Text>
          </Form.Group>
        </Form>
      </Modal.Body>

      <Modal.Footer
        style={{
          backgroundColor: "#f8fafc",
          borderTop: "1px solid #e2e8f0",
          padding: "1.5rem 2rem",
        }}
      >
        <Button
          variant="secondary"
          onClick={onHide}
          disabled={loading}
          style={{
            borderRadius: "25px",
            padding: "10px 24px",
            fontWeight: "600",
            backgroundColor: "#6b7280",
            border: "none",
          }}
        >
          Cancelar
        </Button>
        <Button
          type="submit"
          onClick={handleSubmit}
          disabled={loading}
          style={{
            background: "linear-gradient(45deg, #2563eb, #3b82f6)",
            border: "none",
            borderRadius: "25px",
            padding: "10px 24px",
            fontWeight: "600",

            color: "white",
            boxShadow: "0 4px 15px rgba(37, 99, 235, 0.3)",
          }}
        >
          <FiX style={{ marginRight: "4px" }} />
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
              {isEditing ? "Actualizando..." : "Creando..."}
            </>
          ) : (
            <>
              <FiSave style={{ marginRight: "8px" }} />
              {isEditing ? "Actualizar Producto" : "Crear Producto"}
            </>
          )}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ProductForm;
