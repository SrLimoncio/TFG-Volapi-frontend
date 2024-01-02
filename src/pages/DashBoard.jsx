import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";

import Navbar from "../components/NavBar/Navbar";
import ProjectsSection from "../containers/Dashboard/ProjectsSection";
import ProfileSection from "../containers/Dashboard/ProfileSection";

import "./dashboard.css";

const Profile = () => {
  const [selectedSection, setSelectedSection] = useState("Projects");
  const { logout } = useAuth();

  /* Metodo para cambiar la sección seleccionada */
  const handleItemClick = (section) => {
    setSelectedSection(section);
  };

  const handleLogout = () => {
    // Llama a la función de logout al hacer clic en el botón
    logout();
  };

  return (
    <div>
      <Navbar />
      <div className="container-xl container-fluid container-dashboard">
        <div className="menu-section-dashboard">
          <div className="group-items-dashboard">
            <a
              className={`item-menu-dashboard ${
                selectedSection === "Profile"
                  ? "item-active-menu-dashboard"
                  : ""
              }`}
              onClick={() => handleItemClick("Profile")}
            >
              <div className="line-item-icon-text">
                <div className="icon-item">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="100%"
                    height="100%"
                    fill="currentColor"
                    className="bi bi-person-fill"
                    viewBox="0 0 16 16"
                  >
                    <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6" />
                  </svg>
                </div>

                <div className="title-item">Profile</div>
              </div>
            </a>
            <a
              className={`item-menu-dashboard ${
                selectedSection === "Projects"
                  ? "item-active-menu-dashboard"
                  : ""
              }`}
              onClick={() => handleItemClick("Projects")}
            >
              <div className="line-item-icon-text">
                <div className="icon-item">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="100%"
                    height="100%"
                    fill="currentColor"
                    className="bi bi-archive-fill"
                    viewBox="0 0 16 16"
                  >
                    <path d="M12.643 15C13.979 15 15 13.845 15 12.5V5H1v7.5C1 13.845 2.021 15 3.357 15zM5.5 7h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1 0-1M.8 1a.8.8 0 0 0-.8.8V3a.8.8 0 0 0 .8.8h14.4A.8.8 0 0 0 16 3V1.8a.8.8 0 0 0-.8-.8H.8z" />
                  </svg>
                </div>

                <div className="title-item">Projects</div>
              </div>
            </a>
            <a className="item-menu-dashboard" onClick={handleLogout}>
              <div className="line-item-icon-text">
                <div className="icon-item">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="100%"
                    height="100%"
                    fill="currentColor"
                    className="bi bi-box-arrow-right"
                    viewBox="0 0 16 16"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 12.5a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v2a.5.5 0 0 0 1 0v-2A1.5 1.5 0 0 0 9.5 2h-8A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-2a.5.5 0 0 0-1 0z"
                    />
                    <path
                      fillRule="evenodd"
                      d="M15.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708.708L14.293 7.5H5.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3z"
                    />
                  </svg>
                </div>

                <div className="title-item">Log out</div>
              </div>
            </a>
          </div>
        </div>
        <div className="content-section-dashboard">
          <div className="title_section_content">
            {selectedSection === "Profile" ? "Profile" : "Projects"}
          </div>
          {/* Renderiza el componente correspondiente según la sección seleccionada */}
          {selectedSection === "Profile" && <ProfileSection />}
          {selectedSection === "Projects" && <ProjectsSection />}
        </div>
      </div>
    </div>
  );
};

export default Profile;
