import React, { useState, useEffect } from "react";

import {
  updateProject,
  activateProject,
  deleteProject,
} from "../../services/DashboardService.js";

import "./elementproyect.css";

const ElementProject = ({ project, onProjectChange }) => {
  const [modoEdicion, setModoEdicion] = useState(false);

  // Utiliza datos para trabajar y mantener actualizado el valor de name
  const [datos, setDatos] = useState({
    name: project?.name || "",
    tool: project?.forensic_tool || "",
    os: project?.memory_os || "",
    memory_path: project?.memory_path || "",
    sha256: project?.sha256 || "",
    sha1: project?.sha1 || "",
    md5: project?.md5 || ""
  });

  // Mantén una copia de los datos originales
  const datosOriginales = {
    name: project?.name || "",
    tool: project?.forensic_tool || "",
    os: project?.memory_os || "",
    memory_path: project?.memory_path || "",
    sha256: project?.sha256 || "",
    sha1: project?.sha1 || "",
    md5: project?.md5 || ""
  };

  useEffect(() => {
    // Solo actualiza datos si no estás en modo de edición
    if (!modoEdicion) {
      setDatos(datosOriginales);
    }
  }, [project, modoEdicion]);

  const handleChange = (e) => {
    const { id, value } = e.target;

    setDatos((prevDatos) => ({
      ...prevDatos,
      [id]: value,
    }));
  };

  const handleSaveEdit = async () => {
    // Realiza una verificación adicional antes de guardar
    if (project.id) {
      try {
        // Lógica para actualizar o crear el proyecto en la base de datos
        const response = await updateProject(project.id, datos.name);

        setModoEdicion(false);
        onProjectChange();
      } catch (error) {
        console.error("Error al actualizar datos:", error);
        // Puedes manejar el error de alguna manera (mostrar un mensaje, etc.)
      }
    }
  };

  const handleActive = async () => {
    try {
      await activateProject(project.id);

      onProjectChange();

    } catch (error) {
      console.error("Error al activar el proyecto:", error);
      // Puedes manejar el error de alguna manera (mostrar un mensaje, etc.)
    }
  };

  const handleDelete = async () => {
    if (!project.is_active) {
      try {
        await deleteProject(project.id);
        // Puedes hacer más cosas después de la eliminación
      } catch (error) {
        console.error("Error al eliminar el proyecto:", error);
        // Puedes manejar el error de alguna manera (mostrar un mensaje, etc.)
      }
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
            value={datos.name}
            onChange={handleChange}
            disabled={!modoEdicion}
          ></input>
        </div>
        <div className="field-element-project">
          <label htmlFor="tool" className="form-label">
            Forensic Tool
          </label>
          <select
            className="form-select"
            id="tool"
            value={datos.forensic_tool}
            onChange={handleChange}
            disabled
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
        <label htmlFor="memory_path" className="form-label">
          Memory Route:
        </label>
        <input
          type="text"
          className="form-control"
          id="memory_path"
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
          <>
            <button
              type="button"
              className="btn btn-default"
              onClick={handleSaveEdit}
            >
              Save
            </button>
            <button
              type="button"
              className="btn btn-default"
              onClick={() => {
                setModoEdicion(false);
                // Restablecer los datos a los originales
                setDatos(datosOriginales);
              }}
            >
              Cancel
            </button>
          </>
        ) : (
          <>
            {!project.is_active && ( // Verificar si el proyecto no está activo
              <button
                type="button"
                className="btn btn-default"
                onClick={handleActive}
              >
                Active
              </button>
            )}

            <button
              type="button"
              className="btn btn-edit"
              onClick={() => setModoEdicion(true)}
            >
              Edit
            </button>

            <button
              type="button"
              className="btn btn-delete"
              onClick={handleDelete}
            >
              Delete
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default ElementProject;
