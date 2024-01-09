import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.js";

import "./home.css";


const Home = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // Redirige si el usuario está autenticado
    if (isAuthenticated) {
      navigate("/menu");
    }
  }, [isAuthenticated]);

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-12 hero-col">
          <div className="tittle-hero">MemorixAnalitic</div>
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Home;
