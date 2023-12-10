import React, { createContext, useContext, useState, useEffect } from "react";
import Cookies from "js-cookie";
import { checkToken } from "../services/AuthService";

// Creación del contexto de autenticación
const AuthContext = createContext();

// Proveedor del contexto de autenticación
export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const obtenerToken = async () => {
      try{
        // Recuperar el token almacenado en la cookie al cargar la aplicación
        const token = Cookies.get('jwtToken');

        // Comprobamos que el token es correcto
        if (token !== null && token !== undefined && token.trim() !== '' && token !== "null") {
          const headers = {
            Authorization: `Bearer ${token}`,
          };
          const response = await checkToken(headers);

          if (response.data.success) {
            setIsAuthenticated(true);
            
          } else {
            Cookies.remove('jwtToken');
            setIsAuthenticated(false);
          }
        }

      } catch (error) {
        console.error('Error al verificar el token:', error);
      }
    };

    obtenerToken();
  }, []);

  const login = (token) => {
    // Establecer la cookie con el token
    // Calcula el tiempo de expiración sumando 60 minutos en milisegundos
    const ExpirationTime = new Date(new Date().getTime() + 60 * 60 * 1000);

    Cookies.set('jwtToken', token, { expires: ExpirationTime});

    setIsAuthenticated(true);
  };

  const logout = () => {
    // Eliminar la cookie al cerrar sesión
    Cookies.remove("jwtToken");

    setIsAuthenticated(false);
  };

  const updateToken = (newToken) => {
    const ExpirationTime = new Date(new Date().getTime() + 60 * 60 * 1000);

    Cookies.set('jwtToken', newToken, { expires: ExpirationTime});
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout, updateToken }}>
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => useContext(AuthContext);

export { useAuth };
