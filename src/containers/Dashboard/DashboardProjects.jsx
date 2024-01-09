import React, { useState, useEffect, useCallback } from "react";

import { getListProjects } from "../../services/DashboardService.js";
import ElementProject from "../../components/DashBoard/ElementProject.jsx";
import NewProject from "../../components/DashBoard/NewElementProject.jsx";

import "./dashboardprojects.css";

const DashboardProjects = () => {
  const [projects, setProjects] = useState([]);
  const [newProject, setNewProject] = useState(null);
  const [showNewProjectButton, setShowNewProjectButton] = useState(true);

  const [hasChange, setHasChange] = useState(false);

  const loadProjects = useCallback(async () => {
    try {
      const { data } = await getListProjects();
      setProjects(data.projects);
    } catch (error) {
      console.error("Error al obtener los proyectos", error);
      // Mostrar mensaje de error en UI
    }
  }, []);

  useEffect(() => {
    loadProjects();
  }, [hasChange, loadProjects]);

  const handleProjectChange = useCallback(() => {
    setHasChange((prev) => !prev);
  }, []);

  const setNuevoProyecto = useCallback(() => {
    if (!newProject) {
      const blankProject = {
        name: "",
        tool: "",
        os: "",
        memoryFile: null,
      };
      setNewProject(blankProject); // Aquí estableces el nuevo proyecto
      setShowNewProjectButton(false); // Ocultas el botón para crear un nuevo proyecto
    }
  }, [newProject]);

  const handleNewProjectClose = useCallback(() => {
    // Muestra nuevamente el botón "Create a new project"
    setShowNewProjectButton(true);
    // Limpia el estado del nuevo proyecto
    setNewProject(null);
  }, []);

  return (
    <div className="content-section-dashboard">
      <div className="title-section-content">Projects</div>

      <div className="grid-section-project">
        {projects.map((project) => (
          <ElementProject
            key={project.id}
            project={project}
            onProjectChange={handleProjectChange}
          />
        ))}
        {showNewProjectButton && (
          <button className="section-new-project" onClick={setNuevoProyecto}>
            <div className="content-new-project">
              <div className="icon-new-project">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="100%"
                  height="100%"
                  fill="var(--title-color)"
                  className="bi bi-plus-square"
                  viewBox="0 0 16 16"
                >
                  <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2z" />
                  <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4" />
                </svg>
              </div>
              <div className="title-new-project">Create a new project</div>
            </div>
          </button>
        )}
        {newProject && (
          <NewProject
            setNewProject={handleNewProjectClose}
            onProjectChange={handleProjectChange}
          />
        )}
      </div>
    </div>
  );
};

export default DashboardProjects;
