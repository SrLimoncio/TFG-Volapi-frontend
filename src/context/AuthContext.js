import React, { createContext, useContext, useState, useEffect } from "react";
import Cookies from "js-cookie";
import { checkAccessToken, renewAccessToken } from "../services/AuthService";

// Creación del contexto de autenticación
const AuthContext = createContext();

// Proveedor del contexto de autenticación
export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({
    user: null,
    isAuthenticated: false,
    isCheckingToken: false,
    needCheckToken: false
  });

  const logout = () => {
    Cookies.remove('accessJwtToken');
    Cookies.remove('refreshJwtToken');
    setAuth({ user: null, isAuthenticated: false, isCheckingToken: false, needCheckToken: false});
  };

  const getAccessTokenCookie = () => {
    return Cookies.get('accessJwtToken');
  };

  const getRefreshTokenCookie = () => {
    return Cookies.get('refreshJwtToken');
  };

  useEffect(() => {
    const validateToken = async () => {
        // Activa el flag de comprobando token
        setAuth(prev => ({ ...prev, isCheckingToken: true }));

        const accessToken = getAccessTokenCookie();
        const refreshToken = getRefreshTokenCookie();

        // Si no hay tokens, cerramos sesion
        if ( (!accessToken || accessToken === 'null') || (!refreshToken || refreshToken === 'null') ){
          Cookies.remove('accessJwtToken');
          Cookies.remove('refreshJwtToken');
          setAuth({ user: null, isAuthenticated: false, isCheckingToken: false, needCheckToken: false});
          return;
        }
        console.log("\nEntra useEffects Auth\n")
        try {
            const response = await checkAccessToken();
            if (response.data.success) {
                setAuth(prev => ({ ...prev, user: response.data.user, 
                    isAuthenticated: response.data.isValid }));
            } else {
              Cookies.remove('accessJwtToken');
              Cookies.remove('refreshJwtToken');
              setAuth({ user: null, isAuthenticated: false, isCheckingToken: false, needCheckToken: false});
            }
        } catch (error) {
            console.error('Error al verificar el token:', error);
            Cookies.remove('accessJwtToken');
            Cookies.remove('refreshJwtToken');
            setAuth({ user: null, isAuthenticated: false, isCheckingToken: false, needCheckToken: false});
        
        } finally {
            setAuth(prev => ({ ...prev, isCheckingToken: false, needCheckToken: false }));
        }
    };

    validateToken();
  }, []);

  // Establece las cookies con los tokens pasados por params.
  const setCookieAccessToken = ( access_token ) => {
    //const accessTokenExpireMinutes = process.env.REACT_APP_ACCESS_TOKEN_EXPIRE_MINUTES;
    //const ExpirationTimeAccessToken = new Date(new Date().getTime() + parseInt(accessTokenExpireMinutes) * 60 * 1000);

    Cookies.set('accessJwtToken', access_token);
    //Cookies.set('accessJwtToken', newToken, { expires: ExpirationTimeAccessToken, secure: true, httpOnly: true, sameSite: 'Strict' });
  };
  const setCookieRefreshToken = ( refresh_token ) => {
    //const refreshTokenExpireMinutes = process.env.REACT_APP_REFRESH_TOKEN_EXPIRE_MINUTES;
    //const ExpirationTimeRefreshToken = new Date(new Date().getTime() + parseInt(refreshTokenExpireMinutes) * 60 * 1000);

    Cookies.set('refreshJwtToken', refresh_token );
    //Cookies.set('accessJwtToken', newToken, { expires: ExpirationTimeRefreshToken, secure: true, httpOnly: true, sameSite: 'Strict' });
  };

  const login = ( accessToken, refreshToken ) => {
    setCookieAccessToken(accessToken);
    setCookieRefreshToken(refreshToken);

    setAuth(prev => ({ ...prev, isAuthenticated: true, needCheckToken: true }));
  };

  return (
    <AuthContext.Provider value={{ ...auth, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
