import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { getListProjects } from "../../services/DashboardService.js";
import ElementProject from "../../components/DashBoard/ElementProject.jsx";
import NewProject from "../../components/DashBoard/NewElementProject.jsx";

import "./dashboardprofile.css";

const DashboardProfile = () => {

  useEffect(() => {
    
  }, []);

  return (
    <div className="">
      <div className="title_section_content">Profile</div>
    </div>
  );
};

export default DashboardProfile;
