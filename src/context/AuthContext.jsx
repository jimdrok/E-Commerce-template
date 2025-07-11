import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Verificar si hay un usuario guardado en localStorage al cargar
  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (error) {
        console.error("Error parsing saved user:", error);
        localStorage.removeItem("user");
      }
    }
    setLoading(false);
  }, []);

  // Login simulado
  const login = async (email, password) => {
    // Simulamos una validación básica
    if (!email || !password) {
      throw new Error("Email y contraseña son requeridos");
    }

    if (password.length < 6) {
      throw new Error("La contraseña debe tener al menos 6 caracteres");
    }

    // Simulamos una llamada a API con delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Usuario simulado
    const userData = {
      id: Date.now(),
      email: email,
      name: email.split("@")[0],
      avatar: `https://ui-avatars.com/api/?name=${email.split("@")[0]}&background=2563eb&color=fff`,
      loginTime: new Date().toISOString()
    };

    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));
    
    return userData;
  };

  // Logout
  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  // Verificar si el usuario está autenticado
  const isAuthenticated = () => {
    return user !== null;
  };

  const value = {
    user,
    login,
    logout,
    isAuthenticated,
    loading
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth debe ser usado dentro de un AuthProvider");
  }
  return context;
};