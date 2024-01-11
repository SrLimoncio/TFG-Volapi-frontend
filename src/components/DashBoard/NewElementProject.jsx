import React, { useState } from "react";
import toast from "react-hot-toast";

import { createProject, uploadChunk } from "../../services/DashboardService.js";
import { CancelIcon, AddIcon } from "../../components/General/Icons.js";
import ButtonIconText from "../General/Buttons/ButtonIconText.jsx";

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
  const allowedExtensions = [".mem", ".dmp", ".raw"];
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
        setNewProjectData((prevData) => ({ ...prevData, memoryFile: file }));
      } else {
        console.error("Invalid or oversized file, please select another valid file");
        toast.error("Invalid or oversized file, please select another valid file",
          {duration: 4000,}
        );
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

        toast.error("The project has been created successfully.",
          {duration: 4000,}
        );

        // Actualizar la lista de proyectos después de crear uno nuevo
        onProjectChange();
      } else {
        console.success("Error al crear projecto");
      }
    } catch (error) {
      console.error("Error al crear projecto:", error);
      toast.error("The project has been created successfully.",
          {duration: 4000,}
        );

      //Cambiar: Borrar projecto
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
        <ButtonIconText
          classType={"btn-confirm"}
          svgIcon={<CancelIcon />}
          text={isUploading ? "Creating..." : "Create"}
          eventOnClick={handleCreateProject}
          isDisabled={isUploading}
        />
        <ButtonIconText
          classType={"btn-danger"}
          svgIcon={<CancelIcon />}
          text={"Cancel"}
          eventOnClick={() => setNewProject(null)}
          isDisabled={isUploading}
        />
      </div>
    </div>
  );
};

export default NewProject;
