import React from "react";

const DropdownMenu = () => {
  let categories = ["new York", "Sam Francisco", "hola qie tal", "perro"];

  return (
    <li className="nav-item dropdown">
      <a
        className="nav-link dropdown-toggle"
        href="#"
        id="navbarDropdownMenuLink"
        role="button"
        data-bs-toggle="dropdown"
        aria-expanded="false"
      >
        Categorias
      </a>
      <ul className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
        <li>
          <a className="dropdown-item" href="#">
            Action
          </a>
        </li>
        <li>
          <a className="dropdown-item" href="#">
            Another action
          </a>
        </li>
        <li>
          <a className="dropdown-item" href="#">
            Something else here
          </a>
        </li>
      </ul>
    </li>
  )
}

export default DropdownMenu;
