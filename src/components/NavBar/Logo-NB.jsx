import React from "react";
// Logo.tsx (Componente para mostrar el logo)

const Logo = () => {
  return (
      <a className="navbar-brand" href="#">
        <img
          src="src\assets\logoVolapi.png"
          alt=""
          width={30}
          height={30}
          className="d-inline-block align-top"
        />
        <h3 className="d-inline-block">Volapi</h3>
      </a>
  )
} 

export default Logo;
