import React, { useState, useEffect } from "react";

import { saveEditProject } from "../../services/DashboardService.js";

import "./elementproyect.css";

const ElementProject = ({ project }) => {
  const [datos, setDatos] = useState({
    name: project?.name || "",
    tool: project?.forensic_tool || "",
    os: project?.memory_os || "",
    memory_path: project?.memory_path || "",
    sha256: project?.sha256 || "",
    sha1: project?.sha1 || "",
    md5: project?.md5 || "",
  });

  const [modoEdicion, setModoEdicion] = useState(false);

  const handleChange = (e) => {
    setDatos({
      ...datos,
      [e.target.id]: e.target.value,
    });
  };

  const handleSaveEdit = async () => {
    // Realiza una verificación adicional antes de guardar
    if (project.id) {
      try {
        // Lógica para actualizar el proyecto en la base de datos
        const response = await saveEditProject(datos.name);

        setModoEdicion(false);

      } catch (error) {
        console.error("Error al actualizar datos:", error);
        // Puedes manejar el error de alguna manera (mostrar un mensaje, etc.)
      }
    }
  };

  return (
    <div className="container-project">
      <div className="line-container">
        <div className="field-element-project">
          <label htmlFor="nameProject" className="form-label">
            Name Project
          </label>
          <input
            type="text"
            className="form-control"
            id="nameProject"
            value={datos.name}
            onChange={handleChange}
            disabled={!modoEdicion}
          ></input>
        </div>
        <div className="field-element-project">
          <label htmlFor="toolProject" className="form-label">
            Forensic Tool
          </label>
          <select
            className="form-select"
            id="toolProject"
            value={datos.forensic_tool}
            onChange={handleChange}
            disabled
          >
            <option value="1">Volatility 2</option>
            <option value="2">Volatility 3</option>
          </select>
        </div>
        <div className="field-element-project">
          <label htmlFor="osProject" className="form-label">
            OS
          </label>
          <select
            className="form-select"
            id="osProject"
            value={datos.memory_os}
            onChange={handleChange}
            disabled
          >
            <option value="1">Windows</option>
            <option value="2">Linux</option>
          </select>
        </div>
      </div>
      <div className="line-container field-element-project">
        <label htmlFor="memory_pathProject" className="form-label">
          Memory Route:
        </label>
        <input
          type="text"
          className="form-control"
          id="memory_pathProject"
          value={datos.memory_path}
          onChange={handleChange}
          disabled
        ></input>
      </div>
      {!modoEdicion && (
        <>
          <div className="column-container">
            <div className="line-container field-element-project">
              <div className="label-field-project">sha256:</div>
              <div className="field-project-element">{datos.sha256}</div>
            </div>
            <div className="line-container field-element-project">
              <div className="label-field-project">sha1:</div>
              <div className="field-project-element">{datos.sha1}</div>
            </div>
            <div className="line-container field-element-project">
              <div className="label-field-project">md5:</div>
              <div className="field-project-element">{datos.md5}</div>
            </div>
          </div>
        </>
      )}
      <div className="line-btn-container">
        {modoEdicion ? (
          <button
            type="button"
            className="btn btn-default"
            onClick={handleSaveEdit}
          >
            Save
          </button>
        ) : (
          <>
            <button className="btn btn-default">Active</button>
            <button
              type="button"
              className="btn btn-edit"
              onClick={setModoEdicion(true)}
            >
              Edit
            </button>
            <button className="btn btn-delete">Delete</button>
          </>
        )}
      </div>
    </div>
  );
};

export default ElementProject;
