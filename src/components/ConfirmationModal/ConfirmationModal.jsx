import { Modal, Button } from "react-bootstrap";
import { FiAlertTriangle, FiInfo, FiBell, FiX, FiCheck } from 'react-icons/fi';

const ConfirmationModal = ({ 
  show, 
  onHide, 
  onConfirm, 
  title = "Confirmar Acción",
  message = "¿Estás seguro de que deseas continuar?",
  confirmText = "Confirmar",
  cancelText = "Cancelar",
  variant = "danger",
  loading = false
}) => {
  const getIcon = () => {
    switch(variant) {
      case "danger": return <FiAlertTriangle size={20} />;
      case "warning": return <FiBell size={20} />;
      case "info": return <FiInfo size={20} />;
      default: return <FiAlertTriangle size={20} />;
    }
  };

  return (
    <Modal 
      show={show} 
      onHide={onHide}
      centered
      backdrop="static"
      keyboard={false}
    >
      <Modal.Header 
        closeButton
        style={{
          backgroundColor: "#f8fafc",
          borderBottom: "1px solid #e2e8f0"
        }}
      >
        <Modal.Title
          style={{
            color: "#1e293b",
            fontWeight: "700",
            fontSize: "1.3rem",
            display: "flex",
            alignItems: "center",
            gap: "0.5rem"
          }}
        >
          {getIcon()}
          {title}
        </Modal.Title>
      </Modal.Header>

      <Modal.Body style={{ padding: "2rem" }}>
        <p
          style={{
            color: "#475569",
            fontSize: "1.1rem",
            lineHeight: "1.6",
            margin: 0,
            textAlign: "center"
          }}
        >
          {message}
        </p>
      </Modal.Body>

      <Modal.Footer
        style={{
          backgroundColor: "#f8fafc",
          borderTop: "1px solid #e2e8f0",
          padding: "1.5rem 2rem",
          justifyContent: "center",
          gap: "1rem"
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
            minWidth: "120px"
          }}
        >
          <FiX style={{ marginRight: '4px' }} />
          {cancelText}
        </Button>
        <Button
          variant={variant}
          onClick={onConfirm}
          disabled={loading}
          style={{
            borderRadius: "25px",
            padding: "10px 24px",
            fontWeight: "600",
            border: "none",
            minWidth: "120px",
            backgroundColor: variant === "danger" ? "#ef4444" : 
                           variant === "warning" ? "#f59e0b" : "#2563eb"
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
                  marginRight: "8px"
                }}
              ></span>
              Procesando...
            </>
          ) : (
            <>
              <FiCheck style={{ marginRight: '4px' }} />
              {confirmText}
            </>
          )}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ConfirmationModal;