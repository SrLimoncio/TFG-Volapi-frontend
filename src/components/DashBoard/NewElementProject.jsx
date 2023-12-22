import React, { useState, useEffect } from "react";

import { createProject } from "../../services/DashboardService.js";

import "./elementproyect.css";

const NewProject = ({ setNewProject, onProjectChange }) => {
  const [newProjectData, setNewProjectData] = useState({
    name: "",
    tool: 1,
    os: 1,
    memory_path: "",
  });

  const handleChange = (e) => {
    const { id, value } = e.target;

    setNewProjectData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const handleCreateProject = async () => {
    try {
      console.log("name: " + newProjectData.name )
      console.log("tool: " + newProjectData.tool )
      console.log("os: " + newProjectData.os )
      console.log("memory_path: " + newProjectData.memory_path )

      // Validación básica para asegurarse de que los campos requeridos estén llenos
      if (!newProjectData.name || !newProjectData.tool || !newProjectData.os || !newProjectData.memory_path) {
        // Puedes mostrar un mensaje al usuario o realizar otra acción aquí
        return;
      }

      await createProject(
        newProjectData.name,
        newProjectData.tool,
        newProjectData.os,
        newProjectData.memory_path
      );

      // Actualizar la lista de proyectos después de crear uno nuevo
      onProjectChange();

      setNewProject(null); // Reinicia el nuevo proyecto
    } catch (error) {
      console.error("Error al crear projecto:", error);
      // Puedes manejar el error de alguna manera (mostrar un mensaje, etc.)
    }
  };

  return (
    <div className="container-project">
      <div className="line-container">
        <div className="field-element-project">
          <label htmlFor="name" className="form-label">
            Name Project
          </label>
          <input
            type="text"
            className="form-control"
            id="name"
            value={newProjectData.name}
            onChange={handleChange}
          ></input>
        </div>
        <div className="field-element-project">
          <label htmlFor="tool" className="form-label">
            Forensic Tool
          </label>
          <select
            className="form-select"
            id="tool"
            value={newProjectData.tool}
            onChange={handleChange}
          >
            <option value="1">Volatility 2</option>
            <option value="2">Volatility 3</option>
          </select>
        </div>
        <div className="field-element-project">
          <label htmlFor="os" className="form-label">
            OS
          </label>
          <select
            className="form-select"
            id="os"
            value={newProjectData.os}
            onChange={handleChange}
          >
            <option value="1">Windows</option>
            <option value="2">Linux</option>
          </select>
        </div>
      </div>
      <div className="line-container field-element-project">
        <label htmlFor="memory_path" className="form-label">
          Memory Route:
        </label>
        <input
          type="text"
          className="form-control"
          id="memory_path"
          value={newProjectData.memory_path}
          onChange={handleChange}
        ></input>
      </div>

      <div className="line-btn-container">
        <button
          type="button"
          className="btn btn-default"
          onClick={handleCreateProject}
        >
          Create
        </button>
        <button
          type="button"
          className="btn btn-default"
          onClick={() => setNewProject(null)}
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default NewProject;
