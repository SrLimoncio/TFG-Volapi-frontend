import React, { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthProvider, useAuth } from "../context/AuthContext.js";

import HeroFormLogin from "../containers/HeroSection/HeroFormLogin";
import HeroFormRegister from "../containers/HeroSection/HeroFormRegister";

import "./launchpage.css";

const LaunchPage = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // Redirige si el usuario está autenticado
    if (isAuthenticated) {
      navigate("/menu");
    }
  }, [isAuthenticated, navigate]);


  const [showRegister, setShowRegister] = useState(false);

  const toggleForm = () => {
    setShowRegister(!showRegister);
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-12 hero-col">
          <div className="tittle-hero">VOLAPI</div>
          {showRegister ? (
            <HeroFormRegister redirectToLogin={() => setShowRegister(false)} />
          ) : (
            <HeroFormLogin />
          )}
          <div className="">
            {showRegister ? (
              <p>
                Already registered?{" "}
                <span className="text_link" onClick={toggleForm}>
                  Login here
                </span>
              </p>
            ) : (
              <p>
                Not yet registered?{" "}
                <span className="text_link" onClick={toggleForm}>
                  Register here
                </span>
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LaunchPage;
