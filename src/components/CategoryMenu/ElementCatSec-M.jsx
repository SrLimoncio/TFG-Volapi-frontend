import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import {getInfoCmdMenuUser} from "../../services/MenuService";
import {menuExecuteCommand} from "../../services/CommandService";

import "./elementcatsec-m.css";

const ElementCatSecundary = (props) => {
  const [stateCommand, setStateCommand] = useState(props.state);
  const navigate = useNavigate();

  const showCommand = () => {
    navigate(`/command/${props.id}`, {
      state: {
        id: props.id,
        // Otros datos que quieras pasar
      },
    });
  };

  const executeCommand = async () => {
    try{
      const response = await menuExecuteCommand(props.id);
  
      if (response.data.success) {
        setStateCommand(response.data.state);
      }

    }catch (error) {
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
      <div className="container-top-elesec">
        <div className="title-elesec">{props.title}</div>
        <div className="container2-top-elesec">
          <div className="status-elesec">{stateCommand}</div>
          {stateCommand === "active" ? (
            <button className="btn btn-default" onClick={showCommand}>
              SHOW
            </button>
          ) : (
            <button className="btn btn-default" onClick={executeCommand}>
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
