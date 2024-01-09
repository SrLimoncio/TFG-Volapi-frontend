import axios from 'axios';
import Cookies from 'js-cookie';
import { renewAccessToken } from '../services/AuthService'
import { useAuth } from '../context/AuthContext';


const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL,  // BaseURL común
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
    console.log("capta error")
    const originalConfig = error.config;
    console.log("status ", error.response?.status)
    console.log("isExpired ", error.response?.data.isExpired)

    // Ignora la solicitud de renovación del token para evitar bucle
    if (originalConfig.url === "/auth/api/renew-access-token") {
      return Promise.reject(error);
    }

    // Verifica si el error es debido a un token caducado y si es la primera vez que se reintentará
    if (error.response?.status === 401 && 
      error.response?.data.isExpired === true && 
      !originalConfig._retry) {

        //console.log("Da error 401: ", error.response)
        console.log("Da error 401")
        originalConfig._retry = true;

        const refreshToken = Cookies.get('refreshJwtToken');
        const failedAccessToken = originalConfig.headers['Authorization']

        console.log("refreshToken: ", refreshToken)
        console.log("failedAccessToken: ", failedAccessToken)

        try {
          const newTokenResponse = await renewAccessToken(failedAccessToken, refreshToken);
          const newAccessToken = newTokenResponse.data.newAccessToken;
          console.log("newAccessToken: ", newAccessToken)

          // Guardar el nuevo token de acceso y actualizar la cabecera de autorización
          //const accessTokenExpireMinutes = process.env.REACT_APP_ACCESS_TOKEN_EXPIRE_MINUTES;
          //const ExpirationTimeAccessToken = new Date(new Date().getTime() + parseInt(accessTokenExpireMinutes) * 60 * 1000);
          Cookies.set('accessJwtToken', newAccessToken);

          originalConfig.headers['Authorization'] = `Bearer ${newAccessToken}`;

          return axiosInstance(originalConfig);  // Reintenta la solicitud original con el nuevo token

        } catch (_error) {
          // Manejo de errores del proceso de renovación (p.ej. token de refresco caducado)
          console.log("RefreshToken error: ", _error)

          Cookies.delete('accessJwtToken');
          Cookies.delete('refreshJwtToken');

          // Redireccionar al inicio de sesión
          window.location.href = '/home/login';
          
          return Promise.reject(_error);
        }
    }

    return Promise.reject(error);
});

export default axiosInstance;



