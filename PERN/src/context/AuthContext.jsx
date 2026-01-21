import { createContext, useState, useEffect } from 'react';
import authService from '../services/authService';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // Para mostrar un spinner mientras verificamos sesión

  // Efecto para verificar sesión al cargar la app
  useEffect(() => {
    const checkUserLoggedIn = async () => {
      try {
        const token = localStorage.getItem('token');
        if (token) {
          const userData = await authService.getMe();
          setUser(userData);
        }
      } catch (error) {
        console.error("Sesión expirada o inválida");
        localStorage.removeItem('token'); // Limpiamos token inválido
      } finally {
        setLoading(false);
      }
    };

    checkUserLoggedIn();
  }, []);

  // Función de Login que usarán los componentes
  const login = async (email, password) => {
    const data = await authService.login({ email, password });
    setUser(data.user); // Actualizamos estado global
    return data;
  };

  // Función de Logout
  const logout = () => {
    authService.logout();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;