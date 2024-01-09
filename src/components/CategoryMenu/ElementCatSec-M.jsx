import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import {
  menuExecuteCommand,
  menuDeleteResultCommand,
} from "../../services/CommandService";
import Modal from "../Modals/Modal";

import "./elementcatsec-m.css";

const ElementCatSecundary = (props) => {
  // Define el estado del comando, si esta ejecutado o sin ejecutar.
  const [stateCommand, setStateCommand] = useState(props.state);
  // Define si la ventana modal de las opciones de ejecucion esta abierta.
  const [isModalOpen, setIsModalOpen] = useState(false);
  // Define la lista de opciones permitidas para el comando.
  const [options, setOptions] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    if (!props.options) {
      return;
    }

    let optionsArray = [];
    try {
      optionsArray = JSON.parse(props.options);
    } catch (error) {
      console.error("Error al parsear JSON", error);
      return;
    }
    console.log("optionsArray", optionsArray);

    const newOptions = optionsArray.reduce((acc, option) => {
      if (option.type === "normal") {
        acc[option.id] = {
          name: option.name,
          type: option.type,
          description: option.description,
          checked: false,
        };
      } else if (option.type === "with_arguments") {
        acc[option.id] = {
          name: option.name,
          type: option.type,
          description: option.description,
          checked: false,
          inputValue: "",
        };
      }
      return acc;
    }, {});

    setOptions(newOptions);
  }, [props.options]);

  const handleOptionChange = (optionName, isChecked) => {
    setOptions((prevOptions) => ({
      ...prevOptions,
      [optionName]: {
        ...prevOptions[optionName],
        checked: isChecked,
      },
    }));
  };

  const handleInputChange = (optionName, value) => {
    setOptions((prevOptions) => ({
      ...prevOptions,
      [optionName]: { ...prevOptions[optionName], inputValue: value },
    }));
  };

  const showCommand = () => {
    navigate(`/command/${props.id}`, {
      state: {
        id: props.id,
        // Otros datos que quieras pasar
      },
    });
  };

  const executeCommand = async () => {
    try {
      const response = await menuExecuteCommand(props.id, options);

      if (response.data.success) {
        setStateCommand(response.data.state);
      }

      setIsModalOpen(false);
    } catch (error) {
      // Si es un error de respuesta del servidor
      if (error.response) {
        console.error(error.response.data.message);
        if (error.response.status === 401) {
          const error_login = error.response.data.message;
          if (error_login) {
          } else {
          }
        }
      } else {
        console.error(error.message);
      }
    }
  };

  const deleteResultCommand = async () => {
    try {
      const response = await menuDeleteResultCommand(props.id);

      if (response.data.success) {
        setStateCommand(response.data.state);
      }
    } catch (error) {
      // Si es un error de respuesta del servidor
      if (error.response) {
        console.error(error.response.data.message);
      } else {
        console.error(error.message);
      }
    }
  };

  return (
    <div
      className={`element-sec ${
        stateCommand === "active" ? "active-element-sec" : ""
      }`}
    >
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onExecute={executeCommand}
        options={options}
        onOptionChange={handleOptionChange}
        onInputChange={handleInputChange}
      />
      <div className="container-top-elesec">
        <div className="title-elesec">{props.title}</div>
        <div className="container2-top-elesec">
          {stateCommand === "active" ? (
            <>
              <button className="btn btn-default" onClick={showCommand}>
                <div className="line-item-icon-text">
                  <div className="icon-item">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="100%"
                      height="100%"
                      fill="currentColor"
                      className="bi bi-eye-fill"
                      viewBox="0 0 16 16"
                    >
                      <path d="M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0" />
                      <path d="M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8m8 3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7" />
                    </svg>
                  </div>
                  <div className="title-item">Show</div>
                </div>
              </button>
              <button className="btn btn-danger" onClick={deleteResultCommand}>
                <div className="line-item-icon-text">
                  <div className="icon-item">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="100%"
                      height="100%"
                      fill="currentColor"
                      className="bi bi-trash-fill"
                      viewBox="0 0 16 16"
                    >
                      <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5M8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5m3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0" />
                    </svg>
                  </div>
                </div>
              </button>
            </>
          ) : (
            <button
              className="btn btn-default"
              onClick={() => setIsModalOpen(true)}
            >
              <div className="line-item-icon-text">
                <div className="icon-item">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="100%"
                    height="100%"
                    fill="currentColor"
                    className="bi bi-play-fill"
                    viewBox="0 0 16 16"
                  >
                    <path d="m11.596 8.697-6.363 3.692c-.54.313-1.233-.066-1.233-.697V4.308c0-.63.692-1.01 1.233-.696l6.363 3.692a.802.802 0 0 1 0 1.393z" />
                  </svg>
                </div>
                <div className="title-item">Run</div>
              </div>
            </button>
          )}
        </div>
      </div>

      <div className="description-elesec">{props.description}</div>
    </div>
  );
};

export default ElementCatSecundary;
