import React, { useState, useEffect } from "react";
import { NavLink, useLocation, useNavigate, Outlet } from "react-router-dom";

import { useAuth } from "../context/AuthContext";
import { useProject } from "../context/ProjectContext";
import {
  ProfileIcon,
  ProjectsIcon,
  LogOutIcon,
} from "../components/General/Icons";

import "./dashboard.css";

const DashBoard = () => {
  const { logout } = useAuth();
  const { projectLogout } = useProject();
  const navigate = useNavigate();

  const location = useLocation();
  useEffect(() => {
    console.log(location.pathname);
  }, []);

  const handleLogout = () => {
    // Llama a la función de logout al hacer clic en el botón
    logout();
    projectLogout();

    navigate("/home/login", { replace: true });
  };

  return (
    <div>
      <div className="container-xl container-fluid container-dashboard">
        <div className="menu-section-dashboard">
          <div className="group-items-dashboard">
            <NavLink
              to="profile"
              className={({ isActive }) =>
                `item-menu-dashboard ${
                  isActive ? "item-active-menu-dashboard" : ""
                }`
              }
            >
              <div className="line-item-icon-text">
                <div className="icon-item">
                  <ProfileIcon />
                </div>
                <div className="title-item">Profile</div>
              </div>
            </NavLink>
            <NavLink
              to="projects"
              className={({ isActive }) =>
                `item-menu-dashboard ${
                  isActive ? "item-active-menu-dashboard" : ""
                }`
              }
            >
              <div className="line-item-icon-text">
                <div className="icon-item">
                  <ProjectsIcon />
                </div>
                <div className="title-item">Projects</div>
              </div>
            </NavLink>

            <NavLink
              to="/"
              className="item-menu-dashboard"
              onClick={handleLogout}
            >
              <div className="line-item-icon-text">
                <div className="icon-item">
                  <LogOutIcon />
                </div>
                <div className="title-item">Log out</div>
              </div>
            </NavLink>
          </div>
        </div>
        <Outlet />
      </div>
    </div>
  );
};

export default DashBoard;
