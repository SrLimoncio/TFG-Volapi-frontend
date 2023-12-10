import React from "react";
import { useLocation } from "react-router-dom";

import Navbar from "../components/NavBar/Navbar";
import ProjectsSection from "../containers/Dashboard/ProjectsSection";

import "./dashboard.css";

const Profile = () => {
  return (
    <div>
      <Navbar />
      <div className="container dashboard-container">
        <div className="menu-section-dashboard">
          <div className="group-items-dashboard">
            <li className="list-group-item item-dashboard-menu">Profile</li>
            <li className="list-group-item item-dashboard-menu">Projects</li>
            <li className="list-group-item item-dashboard-menu">Log out</li>
          </div>
        </div>
        <div className="profile-content-section">
          <div className="title_section_content">Projects</div>
          <ProjectsSection/>
        </div>
      </div>
    </div>
  );
};

export default Profile;
