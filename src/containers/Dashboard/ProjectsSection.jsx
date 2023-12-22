import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";

import { getListProjects } from "../../services/DashboardService.js";
import ElementProject from "../../components/DashBoard/ElementProject.jsx";
import NewProject from "../../components/DashBoard/NewElementProject.jsx";

import "./projectssection.css";

const ProjectsSection = () => {
  const [projects, setProjects] = useState([]);
  const [newProject, setNewProject] = useState(null);
  const [showNewProjectButton, setShowNewProjectButton] = useState(true);

  const [hasChange, setHasChange] = useState(false);

  const loadProjects = async () => {
    try {
      const response = await getListProjects();
      const projects = response.data.projects;
      setProjects(projects);
    } catch (error) {
      console.error("Error al obtener los proyectos", error);
    }
  };

  useEffect(() => {
    loadProjects();
  }, [hasChange]);

  const handleProjectChange = () => {
    setHasChange((prev) => !prev);
  };

  const setNuevoProyecto = () => {
    if (!newProject) {
      const blankProject = {
        name: "",
        tool: "",
        os: "",
        memory_path: "",
        sha256: "",
        sha1: "",
        md5: "",
      };

      // Establece el nuevo proyecto en el estado
      setNewProject(blankProject);
      // Oculta el botón "Create a new project"
      setShowNewProjectButton(false);
    }
  };

  const handleNewProjectClose = () => {
    // Muestra nuevamente el botón "Create a new project"
    setShowNewProjectButton(true);
    // Limpia el estado del nuevo proyecto
    setNewProject(null);
  };

  return (
    <div className="grid-project-section">
      {projects.map((project) => (
        <ElementProject key={project.id} project={project} onProjectChange={handleProjectChange} />
      ))}
      {showNewProjectButton && (
        <div className="new-project-content" onClick={setNuevoProyecto}>
          <button className="content-new-project">
            <div className="icon-new-project">+</div>
            <div className="title-new-project">Create a new project</div>
          </button>
        </div>
      )}
      {newProject && (
        <NewProject key="new" setNewProject={handleNewProjectClose} onProjectChange={handleProjectChange}/>
      )}
    </div>
  );
};

export default ProjectsSection;
