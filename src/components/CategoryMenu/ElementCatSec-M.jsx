import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import toast from 'react-hot-toast';

import {
  menuExecuteCommand,
  menuDeleteResultCommand,
} from "../../services/CommandService";
import Modal from "../Modals/Modal";
import ButtonIconText from "../General/Buttons/ButtonIconText.jsx";
import ButtonIcon from "../General/Buttons/ButtonIcon.jsx";

import { ExecuteIcon, TrashIcon } from "../General/Icons.js";

import "./elementcatsec-m.css";

const ElementCatSecundary = (props) => {
  // Define el estado del comando, si esta ejecutado o sin ejecutar.
  const [stateCommand, setStateCommand] = useState(props.state);
  // Define si la ventana modal de las opciones de ejecucion esta abierta.
  const [isModalOpen, setIsModalOpen] = useState(false);
  // Define el estado de cargando de la ejecucion del comando
  const [isCmdLoad, setIsCmdLoad] = useState(false);
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
      setIsModalOpen(false);
      setIsCmdLoad(true);
      const response = await menuExecuteCommand(props.id, options);

      if (response.data.success) {
        setStateCommand(response.data.state);
        setIsCmdLoad(false);
        toast.success('The result of the command has been successfully executed', {
          duration: 4000
        });
      }
    } catch (error) {
      // Si es un error de respuesta del servidor
      if (!error?.response) {
        //Cambiar
        //setMsgErrorLogin("No Server Response");
        navigate("/error500");
      } else if (error.response?.status === 400) {
        //setMsgErrorLogin("Missing Username or Password");
      } else if (error.response?.status === 401) {
        //setMsgErrorLogin("Unauthorized");
      } else {
        //setMsgErrorLogin("Login Failed");
      }
    }
  };

  const deleteResultCommand = async () => {
    try {
      const response = await menuDeleteResultCommand(props.id);

      if (response.data.success) {
        setStateCommand(response.data.state);
        toast.success('The result of the command has been successfully deleted', {
          duration: 4000
        });
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
              <ButtonIconText
                classType={"btn-default"}
                svgIcon={<ExecuteIcon />}
                text={"Show"}
                eventOnClick={showCommand}
              />
              <ButtonIcon
                classType={"btn-danger"}
                svgIcon={<TrashIcon />}
                eventOnClick={deleteResultCommand}
              />
            </>
          ) : (
            <>
              <ButtonIconText
                classType={"btn-default"}
                svgIcon={<ExecuteIcon />}
                text={isCmdLoad ? "Running...": "Run"}
                eventOnClick={() => setIsModalOpen(true)}
                isDisabled={isCmdLoad}
              />
            </>
          )}
        </div>
      </div>

      <div className="description-elesec">{props.description}</div>
    </div>
  );
};

export default ElementCatSecundary;
