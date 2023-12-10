import React from "react";
import {Link} from 'react-router-dom';
import DropdownMenu from './DropdownMenu-NB';

const NavLinks = () => {
  return (
    <div className="collapse navbar-collapse justify-content-end" id="navbarNavDropdown">
      <ul className="navbar-nav">
        <li className="nav-item">
          <Link to="/" className="nav-link" aria-current="page">Inicio</Link>
        </li>
        <li className="nav-item">
          <Link to="/menu" className="nav-link">Menu</Link>
        </li>
        <DropdownMenu/>
        <li className="nav-item">
          <Link to="/dashboard" className="nav-link">Dashboard</Link>
        </li>
      </ul>
    </div>
  )
}

export default NavLinks;