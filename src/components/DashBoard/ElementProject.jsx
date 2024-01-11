import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";

import {
  updateProject,
  activateProject,
  deleteProject,
} from "../../services/DashboardService.js";
import {
  PencilIcon,
  TrashIcon,
  SaveEditionIcon,
  CancelIcon,
  CheckCircleIcon
} from "../../components/General/Icons.js";
import ButtonIconText from "../General/Buttons/ButtonIconText.jsx";

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
        await updateProject(project.id, datos.name);

        setModoEdicion(false);
        onProjectChange();

        toast.success("The editing of the project was successful.", {
          duration: 4000,
        });
      } catch (error) {
        console.error("Error al actualizar datos:", error);
        toast.error(
          "An error occurred during project editing. Please try again.",
          {
            duration: 4000,
          }
        );
      }
    }
  };

  const handleActive = async () => {
    try {
      await activateProject(project.id);

      toast.success("The project has been activated successfully.", {
        duration: 4000,
      });

      onProjectChange();
    } catch (error) {
      console.error("Error al activar el proyecto:", error);

      toast.error(
        "There was an error activating the project. Please try again.",
        {
          duration: 4000,
        }
      );
    }
  };

  const handleDelete = async () => {
    if (!project.is_active) {
      try {
        await deleteProject(project.id);

        toast.success("The deletion of the project was successful.", {
          duration: 4000,
        });

        onProjectChange();
      } catch (error) {
        console.error("Error al eliminar el proyecto:", error);

        toast.error(
          "An error occurred while attempting to delete the project. Please try again.",
          {
            duration: 4000,
          }
        );
      }
    } else {
      toast.error(
        "Deleting an active project is not possible. Please try another project.",
        {
          duration: 4000,
        }
      );
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
            Memory File
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
            <ButtonIconText
              classType={"btn-confirm"}
              svgIcon={<SaveEditionIcon />}
              text={"Save"}
              eventOnClick={handleSaveEdit}
            />
            <ButtonIconText
              classType={"btn-danger"}
              svgIcon={<CancelIcon />}
              text={"Cancel"}
              eventOnClick={() => {
                setModoEdicion(false);
                setDatos(datosOriginales);
              }}
            />
          </>
        ) : (
          <>
            {!project.is_active && ( // Verificar si el proyecto no está activo
              <ButtonIconText
                classType={"btn-default"}
                svgIcon={<CheckCircleIcon />}
                text={"Active"}
                eventOnClick={handleActive}
              />
            )}
            <ButtonIconText
              classType={"btn-warning"}
              svgIcon={<PencilIcon />}
              text={"Edit"}
              eventOnClick={() => setModoEdicion(true)}
            />
            <ButtonIconText
              classType={"btn-danger"}
              svgIcon={<TrashIcon />}
              text={"Delete"}
              eventOnClick={handleDelete}
            />
          </>
        )}
      </div>
    </div>
  );
};

export default ElementProject;
