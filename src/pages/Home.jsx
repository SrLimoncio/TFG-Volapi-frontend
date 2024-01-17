import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.js";

import ItemAdvantage from "../components/Home/ItemAdvantage.jsx";
import {
  EarthIcon,
  AnaliticIcon,
  PieChartIcon,
  LockIcon
} from "../components/General/Icons.js";

import "./home.css";

const Home = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const actionCallHero = `Desbloquea los secretos ocultos en la memoria digital. Análisis
  forense rápido, detallado y accesible.`;
  const advantagesData = [
    {
      titulo: "Enhanced Accessibility",
      texto: `Our web application allows you to work from anywhere. 
      You can easily upload and access memory images from any device, 
      eliminating the need for local installations or physical storage.`,
    },
    {
      titulo: "Efficient Analysis",
      texto: `Our platform provides advanced forensic analysis tools, 
      allowing for a thorough and speedy examination of critical data. 
      Save time and effort with more efficient analysis processes.`,
    },
    {
      titulo: "Intuitive Data Visualisation",
      texto: `We utilize integrated graphics to interpret forensic data 
      more clearly and quickly. Our graphs simplify the analysis of 
      complex data sets.`,
    },
    {
      titulo: "Project Security and Privacy",
      texto: `Our platform ensures that only users with access to your 
      account can view your forensic projects, maintaining confidentiality 
      and full control. This guarantees high security and privacy in your investigations.`,
    },
  ];

  useEffect(() => {
    // Redirige si el usuario está autenticado
    if (isAuthenticated) {
      navigate("/menu");
    }
  }, [isAuthenticated]);

  return (
    <div className="">
      <div className="container-fluid hero-container">
        <div className="col-12 hero-action-call">
          <div className="title-action-call-hero">
            Explore Deeply with Volatility
          </div>
          <div className="text-action-call-hero">{actionCallHero}</div>
        </div>

        <div className="col-12 hero-form-section">
          <Outlet />
        </div>
      </div>
      <div className="container-fluid container-lg">
        <div className="row advantages-row">
          <h2 className="advantages-title">Reasons to use MemorixAnalitic</h2>
          <div className="row advantages-section">
            <ItemAdvantage
              svgIcon={<EarthIcon />}
              title={advantagesData[0].titulo}
              text={advantagesData[0].texto}
            />
            <ItemAdvantage
              svgIcon={<AnaliticIcon />}
              title={advantagesData[1].titulo}
              text={advantagesData[1].texto}
            />
            <ItemAdvantage
              svgIcon={<PieChartIcon />}
              title={advantagesData[2].titulo}
              text={advantagesData[2].texto}
            />
            <ItemAdvantage
              svgIcon={<LockIcon />}
              title={advantagesData[3].titulo}
              text={advantagesData[3].texto}
            />
          </div>
        </div>
      </div>
      
    </div>
  );
};

export default Home;
