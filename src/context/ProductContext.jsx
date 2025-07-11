import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const ProductContext = createContext();

// MockAPI base URL - replace with your actual MockAPI endpoint
const API_BASE_URL = "https://68706bd17ca4d06b34b6bcd6.mockapi.io/";

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch all products
  const fetchProducts = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(`${API_BASE_URL}/products`);
      setProducts(response.data);
    } catch (err) {
      setError("Error al cargar los productos: " + err.message);
      console.error("Error fetching products:", err);
    } finally {
      setLoading(false);
    }
  };

  // Create new product
  const createProduct = async (productData) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.post(`${API_BASE_URL}/products`, productData);
      setProducts(prev => [...prev, response.data]);
      return { success: true, data: response.data };
    } catch (err) {
      const errorMessage = "Error al crear el producto: " + err.message;
      setError(errorMessage);
      console.error("Error creating product:", err);
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  };

  // Update product
  const updateProduct = async (id, productData) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.put(`${API_BASE_URL}/products/${id}`, productData);
      setProducts(prev => 
        prev.map(product => 
          product.id === id ? response.data : product
        )
      );
      return { success: true, data: response.data };
    } catch (err) {
      const errorMessage = "Error al actualizar el producto: " + err.message;
      setError(errorMessage);
      console.error("Error updating product:", err);
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  };

  // Delete product
  const deleteProduct = async (id) => {
    setLoading(true);
    setError(null);
    try {
      await axios.delete(`${API_BASE_URL}/products/${id}`);
      setProducts(prev => prev.filter(product => product.id !== id));
      return { success: true };
    } catch (err) {
      const errorMessage = "Error al eliminar el producto: " + err.message;
      setError(errorMessage);
      console.error("Error deleting product:", err);
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  };

  // Get product by ID
  const getProductById = (id) => {
    return products.find(product => product.id === id);
  };

  // Clear error
  const clearError = () => {
    setError(null);
  };

  // Load products on mount
  useEffect(() => {
    fetchProducts();
  }, []);

  const value = {
    products,
    loading,
    error,
    fetchProducts,
    createProduct,
    updateProduct,
    deleteProduct,
    getProductById,
    clearError
  };

  return (
    <ProductContext.Provider value={value}>
      {children}
    </ProductContext.Provider>
  );
};

export const useProducts = () => {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error("useProducts debe ser usado dentro de un ProductProvider");
  }
  return context;
};