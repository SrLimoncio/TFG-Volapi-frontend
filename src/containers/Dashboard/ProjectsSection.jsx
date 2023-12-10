import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

import { getListProjects } from "../../services/DashboardService.js";
import ElementProject from "../../components/DashBoard/ElementProject.jsx";

import "./projectssection.css";

const ProjectsSection = () => {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const fetchProyectos = async () => {
      try {
        const jwtToken = Cookies.get("jwtToken");

        const headers = {
          Authorization: `Bearer ${jwtToken}`,
        };

        const response = await getListProjects(headers);

        const projects = response.data.projects;

        setProjects(projects);

      } catch (error) {
        console.error("Error al obtener los proyectos", error);
      }
    };

    fetchProyectos();
  }, []); // Se ejecuta solo al montar el componente

  const newProject = () => {
    setProjects((prevProjects) => [
      ...prevProjects,
      { name: "", tool: "", os: "", memory_path: "", sha256: "", sha1: "", md5: "" },
    ]);
  };

  return (
    <div className="grid-project-section">
      {projects.map((project) => (
        <ElementProject key={project.id} project={project} />
      ))}
      <div className="new-project-content" onClick={newProject}>
        <button className="content-new-project">
          <div className="icon-new-project">+</div>
          <div className="title-new-project">Create a new project</div>
        </button>
      </div>
    </div>
  );
};

export default ProjectsSection;
