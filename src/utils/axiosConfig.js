import axios from 'axios';
import Cookies from "js-cookie";

const instance = axios.create({
  baseURL: 'http://127.0.0.1:5000/',  // BaseURL común
});

instance.interceptors.request.use((config) => {
  // Configuración común de headers
    const jwtToken = Cookies.get("jwtToken");

    config.headers['Authorization'] = `Bearer ${jwtToken}`;  // Reemplaza con tu lógica para obtener el token

    return config;
});

export default instance;