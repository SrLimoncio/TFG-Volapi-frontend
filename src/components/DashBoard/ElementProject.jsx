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
    memory_name: project?.memory_name || "",
    sha256: project?.sha256 || "",
    sha1: project?.sha1 || "",
    md5: project?.md5 || "",
  });

  // Mantén una copia de los datos originales
  const datosOriginales = {
    name: project?.name || "",
    tool: project?.forensic_tool || "",
    os: project?.memory_os || "",
    memory_name: project?.memory_name || "",
    sha256: project?.sha256 || "",
    sha1: project?.sha1 || "",
    md5: project?.md5 || "",
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
        onProjectChange();
      } catch (error) {
        console.error("Error al eliminar el proyecto:", error);
        // Puedes manejar el error de alguna manera (mostrar un mensaje, etc.)
      }
    }
  };

  return (
    <div
      className={`element-project ${
        project.is_active ? "active-element-project" : ""
      }`}
    >
      <div className="line-item-project">
        <div className="field-element-project">
          <label htmlFor="name" className="label-field-project">
            Name Project
          </label>
          <input
            type="text"
            className="form-control input-field-project"
            id="name"
            value={datos.name}
            onChange={handleChange}
            disabled={!modoEdicion}
          ></input>
        </div>
        <div className="field-element-project">
          <label htmlFor="memory_name" className="label-field-project">
            Memory Route
          </label>
          <input
            type="text"
            className="form-control"
            id="memory_name"
            value={datos.memory_name}
            onChange={handleChange}
            disabled
          ></input>
        </div>
      </div>
      <div className="line-item-project">
        <div className="field-element-project">
          <label htmlFor="tool" className="label-field-project">
            Forensic Tool
          </label>
          <select
            className="form-select input-field-project"
            id="tool"
            value={datos.tool}
            onChange={handleChange}
            disabled
          >
            <option value="1">Volatility 2</option>
            <option value="2">Volatility 3</option>
          </select>
        </div>
        <div className="field-element-project">
          <label htmlFor="os" className="label-field-project">
            Operating System
          </label>
          <select
            className="form-select input-field-project"
            id="os"
            value={datos.os}
            onChange={handleChange}
            disabled
          >
            <option value="1">Windows</option>
            <option value="2">Linux</option>
          </select>
        </div>
      </div>
      {!modoEdicion && (
        <>
          <div className="line-item-project">
            <div className="field-element-project">
              <label htmlFor="sha256" className="label-field-project">
                Sha256
              </label>
              <input
                type="text"
                className="form-control input-field-project"
                id="sha256"
                value={datos.sha256}
                disabled
              ></input>
            </div>
          </div>
          <div className="line-item-project">
            <div className="field-element-project">
              <label htmlFor="sha1" className="label-field-project">
                Sha1
              </label>
              <input
                type="text"
                className="form-control input-field-project"
                id="sha1"
                value={datos.sha1}
                disabled
              ></input>
            </div>
          </div>
          <div className="line-item-project">
            <div className="field-element-project">
              <label htmlFor="md5" className="label-field-project">
                Md5
              </label>
              <input
                type="text"
                className="form-control input-field-project"
                id="md5"
                value={datos.md5}
                disabled
              ></input>
            </div>
          </div>
        </>
      )}
      <div className="line-btn-container">
        {modoEdicion ? (
          <>
            <button
              type="button"
              className="btn btn-confirm"
              onClick={handleSaveEdit}
            >
              Save
            </button>
            <button
              type="button"
              className="btn btn-danger"
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
              className="btn btn-warning"
              onClick={() => setModoEdicion(true)}
            >
              <div className="line-item-icon-text">
                <div className="icon-item">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="100%"
                    height="100%"
                    fill="currentColor"
                    class="bi bi-pencil-fill"
                    viewBox="0 0 16 16"
                  >
                    <path d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708l-3-3zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207l6.5-6.5zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.499.499 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11l.178-.178z" />
                  </svg>
                </div>
                <div className="title-item">Edit</div>
              </div>
            </button>

            <button
              type="button"
              className="btn btn-danger"
              onClick={handleDelete}
            >
              <div className="line-item-icon-text">
                <div className="icon-item">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="100%"
                    height="100%"
                    fill="currentColor"
                    class="bi bi-trash-fill"
                    viewBox="0 0 16 16"
                  >
                    <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5M8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5m3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0" />
                  </svg>
                </div>
              </div>
              <div className="title-item">Delete</div>
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default ElementProject;
