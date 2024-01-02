import React from "react";

import Logo from "./Logo-NB";
import ButtonFlex from "./ButtonFlex-NB";
import NavLinks from "./LinksList-NB";

import './navbar.css'

// Navbar.tsx (Componente principal del navbar)
const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container">
        <Logo />
        <ButtonFlex />
        <NavLinks />
      </div>
    </nav>
  )
}

export default Navbar;