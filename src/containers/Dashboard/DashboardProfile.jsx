import React, { useState, useEffect, useCallback } from "react";
import { getProfile } from '../../services/DashboardService';

import './dashboardprofile.css'

const Perfil = () => {
  const [profile, setProfile] = useState([]);


  const loadProfile = useCallback(async () => {
    try {
      const { data } = await getProfile();
      setProfile(data.profile);
    } catch (error) {
      console.error("Error al obtener el perfil", error);
      // Mostrar mensaje de error en UI
    }
  }, []);

  useEffect(() => {
    loadProfile();
  }, []);
  
  return (
    <div className="profile-container">
      <div className="profile-row">
        <div className="profile-col profile-photo">
          <img src="ruta/a/la/foto.jpg" alt="Foto de Perfil" className="img-fluid" />
        </div>
        <div className="profile-col profile-info">
          <div className="profile-field">
            <label>{profile.name}</label>
            <input type="text" placeholder="Nombre y Apellidos" />
          </div>
          <div className="profile-field">
            <label>{profile.email}</label>
            <input type="email" placeholder="Correo" />
          </div>
          <div className="profile-field">
            <label>{profile.username}</label>
            <input type="text" placeholder="Username" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Perfil;