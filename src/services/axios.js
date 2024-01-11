import axios from 'axios';
import Cookies from 'js-cookie';
import { renewAccessToken } from '../services/AuthService'
import { useAuth } from '../context/AuthContext';


const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL,  // BaseURL común
  headers: { 'Content-Type': 'application/json' },
  //withCredentials: true // importante para las cookies
});


// Request interceptor for API calls
axiosInstance.interceptors.request.use(
  config => {
    // Configuración común de headers
    const access_token = Cookies.get("accessJwtToken");
    if (access_token) {
      config.headers['Authorization'] = `Bearer ${access_token}`;
    }
    return config;

}, error => {
  return Promise.reject(error);
});


// Response interceptor for API calls
axiosInstance.interceptors.response.use(
  response => response, 
  async error => {
    const originalConfig = error.config;

    // Ignora la solicitud de renovación del token para evitar bucle
    if (originalConfig.url === "/auth/api/renew-access-token") {
      return Promise.reject(error);
    }

    // Verifica si el error es debido a un token caducado y si es la primera vez que se reintentará
    if (error.response?.status === 401 && 
      error.response?.data.isExpired === true && 
      !originalConfig._retry) {

        console.log("Da error 401")
        originalConfig._retry = true;

        const refreshToken = Cookies.get('refreshJwtToken');
        const failedAccessToken = originalConfig.headers['Authorization']

        try {
          const newTokenResponse = await renewAccessToken(failedAccessToken, refreshToken);
          const newAccessToken = newTokenResponse.data.newAccessToken;

          // Guardar el nuevo token de acceso y actualizar la cabecera de autorización
          Cookies.set('accessJwtToken', newAccessToken);

          originalConfig.headers['Authorization'] = `Bearer ${newAccessToken}`;

          return axiosInstance(originalConfig);  // Reintenta la solicitud original con el nuevo token

        } catch (_error) {
          // Manejo de errores del proceso de renovación (p.ej. token de refresco caducado)
          console.log("Ha dado error el reintento de solicitud ", _error)

          Cookies.remove('accessJwtToken');
          Cookies.remove('refreshJwtToken');

          // Redireccionar al inicio de sesión
          console.log("Antes de redirecionar")
          window.location.href = '/home/login';
          console.log("Despues de redirecionar")
          
          return Promise.reject(_error);
        }
    }

    return Promise.reject(error);
});

export default axiosInstance;



