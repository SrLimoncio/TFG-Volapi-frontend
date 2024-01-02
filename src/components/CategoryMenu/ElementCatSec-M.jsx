import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { menuExecuteCommand } from "../../services/CommandService";
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

  return (
    <div className="element-sec">
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
          <div className="status-elesec">{stateCommand}</div>
          {stateCommand === "active" ? (
            <button className="btn btn-default" onClick={showCommand}>
              SHOW
            </button>
          ) : (
            <button
              className="btn btn-default"
              onClick={() => setIsModalOpen(true)}
            >
              EXECUTE
            </button>
          )}
        </div>
      </div>

      <div className="description-elesec">{props.description}</div>
    </div>
  );
};

export default ElementCatSecundary;
