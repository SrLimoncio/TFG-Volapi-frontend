import React, { useState, useEffect } from "react";

import { createProject, uploadChunk } from "../../services/DashboardService.js";

import "./elementproyect.css";

const CHUNK_SIZE = 5 * 1024 * 1024; // Tamaño del trozo, 5MB por chunk

const NewProject = ({ setNewProject, onProjectChange }) => {
  const [newProjectData, setNewProjectData] = useState({
    name: "",
    tool: 1,
    os: 1,
    memoryFile: null,
  });

  const [isUploading, setIsUploading] = useState(false);

  // Lista de extensiones permitidas
  const allowedExtensions = [".mem", ".dmp", ".raw", ".jpeg"];
  const fileSizeLimit = 10 * 1024 * 1024 * 1024; // 10 GB

  const handleChange = (e) => {
    //console.log(files[0])
    const { id, files } = e.target;

    if (id === "memory_file") {
      // Aquí puedes añadir validaciones para el archivo
      const file = files[0];
      const fileExtension = file.name.match(/\.[0-9a-z]+$/i);

      if (
        file &&
        file.size <= fileSizeLimit &&
        allowedExtensions.includes(fileExtension[0].toLowerCase())
      ) {
        console.log(file.name);
        setNewProjectData((prevData) => ({ ...prevData, memoryFile: file }));
      } else {
        console.error("Archivo no válido o demasiado grande.");
        e.target.value = "";
      }
    } else {
      setNewProjectData((prevData) => ({ ...prevData, [id]: e.target.value }));
    }
  };

  const uploadFileChunks = async (file, projectId) => {
    const totalChunks = Math.ceil(file.size / CHUNK_SIZE);

    for (let i = 0; i < totalChunks; i++) {
      const chunk = file.slice(i * CHUNK_SIZE, (i + 1) * CHUNK_SIZE);
      await uploadChunk(projectId, chunk, i + 1, totalChunks, file.name);
    }
  };

  const handleCreateProject = async () => {
    // Validación básica para asegurarse de que los campos requeridos estén llenos
    if (
      !newProjectData.name ||
      !newProjectData.tool ||
      !newProjectData.os ||
      !newProjectData.memoryFile
    ) {
      // Manejo de error por datos incompletos
      return;
    }

    setIsUploading(true);

    try {
      const response_cp = await createProject(
        newProjectData.name,
        newProjectData.tool,
        newProjectData.os
      );

      if (response_cp.data.success) {
        const projectId = response_cp.data.projectId;

        await uploadFileChunks(newProjectData.memoryFile, projectId);

        setNewProject(null);
        // Actualizar la lista de proyectos después de crear uno nuevo
        onProjectChange();
      } else {
        console.error("Error al crear projecto");
      }
    } catch (error) {
      console.error("Error al crear projecto:", error);
      // Puedes manejar el error de alguna manera (mostrar un mensaje, etc.)
    } finally {
      setIsUploading(false);
      //setNewProject(null); // Reinicia el nuevo proyecto
    }
  };

  return (
    <div className="element-project">
      <div className="line-item-project">
        <div className="field-element-project">
          <label htmlFor="name" className="label-field-project">
            Name Project
          </label>
          <input
            type="text"
            className="form-control input-field-project"
            id="name"
            value={newProjectData.name}
            onChange={handleChange}
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
            value={newProjectData.tool}
            onChange={handleChange}
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
            value={newProjectData.os}
            onChange={handleChange}
          >
            <option value="1">Windows</option>
            <option value="2">Linux</option>
          </select>
        </div>
      </div>
      <div className="line-item-project">
        <div className="field-element-project">
          <label htmlFor="memory_file" className="label-field-project">
            Memory file:
          </label>
          <input
            type="file"
            className="form-control input-field-project"
            id="memory_file"
            onChange={handleChange}
          ></input>
        </div>
      </div>

      <div className="line-btn-container">
        <button
          type="button"
          className="btn btn-confirm"
          onClick={handleCreateProject}
          disabled={isUploading}
        >
          <div className="line-item-icon-text">
            <div className="icon-item">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="100%"
                height="100%"
                fill="currentColor"
                className="bi bi-plus-circle"
                viewBox="0 0 16 16"
              >
                <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
                <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4" />
              </svg>
            </div>
            <div className="title-item">
              {isUploading ? "Creating..." : "Create"}
            </div>
          </div>
        </button>
        <button
          type="button"
          className="btn btn-danger"
          onClick={() => setNewProject(null)}
          disabled={isUploading}
        >
          <div className="line-item-icon-text">
            <div className="icon-item">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="100%"
                height="100%"
                fill="currentColor"
                className="bi bi-x-circle"
                viewBox="0 0 16 16"
              >
                <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
                <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708" />
              </svg>
            </div>
            <div className="title-item">Cancel</div>
          </div>
        </button>
      </div>
    </div>
  );
};

export default NewProject;