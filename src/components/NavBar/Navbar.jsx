import React from "react";
import { Link, NavLink } from "react-router-dom";
import { LogoNavbar } from "../General/Icons";

import "./navbar.css";

// Navbar.tsx (Componente principal del navbar)
const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container">
        <Link to="/home" className="navbar-brand navbar-line-brand">
          <div className="navbar-logo">
            <LogoNavbar />
          </div>
          <h3 className="d-inline-block navbar-webname">MemorixAnalitic</h3>
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNavDropdown"
          aria-controls="navbarNavDropdown"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div
          className="collapse navbar-collapse justify-content-end"
          id="navbarNavDropdown"
        >
          <ul className="navbar-nav">
            <NavLink
              to="/"
              className={({ isActive }) =>
                `nav-link nav-item ${isActive ? "item-active-navbar" : ""}`
              }
            >
              Home
            </NavLink>

            <NavLink
              to="/menu"
              className={({ isActive }) =>
                `nav-link nav-item ${isActive ? "item-active-navbar" : ""}`
              }
            >
              Menu
            </NavLink>

            <NavLink
              to="/dashboard"
              className={({ isActive }) =>
                `nav-link nav-item ${isActive ? "item-active-navbar" : ""}`
              }
            >
              Dashboard
            </NavLink>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
