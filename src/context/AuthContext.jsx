//context/AuthContext.jsx
import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';

// Configurar axios con la URL base de tu backend
axios.defaults.baseURL = 'https://proyectogimnasioback.onrender.com/api'; // Ajusta esto a tu URL de backend real

// Crear un contexto de autenticación
const AuthContext = createContext(null);

// Proveedor de contexto de autenticación
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [loading, setLoading] = useState(true);
  const [authError, setAuthError] = useState(null);

  // Configurar interceptor de axios para incluir token en cada solicitud
  useEffect(() => {
    const interceptor = axios.interceptors.request.use(
      config => {
        if (token) {
          config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
      },
      error => {
        return Promise.reject(error);
      }
    );

    // Verificar token al cargar
    if (token) {
      verificarToken();
    } else {
      setLoading(false);
    }

    // Limpiar interceptor
    return () => {
      axios.interceptors.request.eject(interceptor);
    };
  }, [token]);

  // Función de inicio de sesión
  const login = async (user, password) => {
    try {
      setAuthError(null);
      const response = await axios.post('/auth/login', { user, password });
      
      if (response.data.status) {
        const { token, id, nombre, user: userName } = response.data.data;
        
        // Guardar token en localStorage
        localStorage.setItem('token', token);
        
        // Actualizar estado
        setToken(token);
        setUser({ id, nombre, user: userName });
        
        return response.data;
      }
    } catch (error) {
      const errorMsg = error.response?.data?.message || 'Error de inicio de sesión';
      setAuthError(errorMsg);
      console.error('Error de inicio de sesión:', errorMsg);
      throw error;
    }
  };

  // Función de registro
  const register = async (nombre, user, password) => {
    try {
      setAuthError(null);
      const response = await axios.post('/auth/register', { 
        nombre, 
        user, 
        password 
      });
      
      if (response.data.status) {
        // Iniciar sesión después del registro
        await login(user, password);
        return response.data;
      }
    } catch (error) {
      const errorMsg = error.response?.data?.message || 'Error de registro';
      setAuthError(errorMsg);
      console.error('Error de registro:', errorMsg);
      throw error;
    }
  };

  // Función de cierre de sesión
  const logout = () => {
    // Eliminar token de localStorage
    localStorage.removeItem('token');
    
    // Limpiar estado
    setToken(null);
    setUser(null);
  };

  // Verificar validez del token
  const verificarToken = async () => {
    try {
      // Esta ruta dependerá de tu backend. Debe verificar la validez del token
      const response = await axios.get('/auth/verify-token');
      
      if (response.data.status) {
        setUser(response.data.user);
      } else {
        // Token inválido, cerrar sesión
        logout();
      }
    } catch (error) {
      console.error('Error al verificar token:', error);
      logout();
    } finally {
      setLoading(false);
    }
  };

  // Función para proteger rutas (con el sistema de navegación anterior)
  const isAuthenticated = () => {
    return !!user;
  };

  // Valor del contexto
  const value = {
    user,
    token,
    login,
    register,
    logout,
    loading,
    isAuthenticated,
    authError
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook personalizado para usar el contexto de autenticación
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === null) {
    throw new Error('useAuth debe ser usado dentro de un AuthProvider');
  }
  return context;
};

// Componente de ruta protegida para el sistema de navegación anterior
export const ProtectedRoute = ({ children, requiredRole }) => {
  const { isAuthenticated, user, loading } = useAuth();

  if (loading) {
    return <div>Cargando...</div>;
  }

  if (!isAuthenticated()) {
    // Si no está autenticado, puedes redirigir o mostrar un mensaje
    return (
      <div className="text-center text-red-500">
        Debes iniciar sesión para acceder a esta página
      </div>
    );
  }

  // Si se requiere un rol específico
  if (requiredRole && user.role !== requiredRole) {
    return (
      <div className="text-center text-red-500">
        No tienes permisos para acceder a esta página
      </div>
    );
  }

  return children;
};