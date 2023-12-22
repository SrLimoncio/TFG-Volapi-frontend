import React, { useState } from "react";
import { useAuth } from '../context/AuthContext';

import Navbar from "../components/NavBar/Navbar";
import ProjectsSection from "../containers/Dashboard/ProjectsSection";
import ProfileSection from "../containers/Dashboard/ProfileSection";

import "./dashboard.css";

const Profile = () => {
  const [selectedSection, setSelectedSection] = useState("Projects");
  const { logout } = useAuth();

  {
    /* Metodo para cambiar la sección seleccionada */
  }
  const handleItemClick = (section) => {
    setSelectedSection(section);
  };

  const handleLogout = () => {
    // Llama a la función de logout al hacer clic en el botón
    logout();
  }

  return (
    <div>
      <Navbar />
      <div className="container-xl container-fluid dashboard-container">
        <div className="menu-section-dashboard">
          <div className="list-group group-items-dashboard">
            <a
              className={`list-group-item item-dashboard-menu ${
                selectedSection === "Profile"
                  ? "item-dashboard-menu-isactive"
                  : ""
              }`}
              onClick={() => handleItemClick("Profile")}
            >
              Profile
            </a>
            <a
              className={`list-group-item item-dashboard-menu ${
                selectedSection === "Projects"
                  ? "item-dashboard-menu-isactive"
                  : ""
              }`}
              onClick={() => handleItemClick("Projects")}
            >
              Projects
            </a>
            <a
              className="list-group-item item-dashboard-menu"
              onClick={handleLogout}
            >
              Log out
            </a>
          </div>
        </div>
        <div className="profile-content-section">
          <div className="title_section_content">Projects</div>
          {/* Renderiza el componente correspondiente según la sección seleccionada */}
          {selectedSection === "Profile" && <ProfileSection />}
          {selectedSection === "Projects" && <ProjectsSection />}
        </div>
      </div>
    </div>
  );
};

export default Profile;
