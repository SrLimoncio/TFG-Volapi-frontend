import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

import Navbar from "../components/NavBar/Navbar";
import TableInfoCmd from "../components/InfoCmd/TableInfoCmd";

import { showCommand } from "../services/CommandService";

import "./infocmd.css";

const InfoCmd = () => {
  const location = useLocation();
  const commandId = location.state && location.state.id;

  const [cmdInfo, setCmdInfo] = useState({
    title: "",
    description: "",
    command: "",
    commandOutput: {},
  });


  useEffect(() => {
    const fetchCommandInfo = async () => {
      try {
        // Realizar la consulta al backend
        const response = await showCommand(commandId);

        // Actualizar el estado con los datos obtenidos
        setCmdInfo({
          title: response.data.title,
          description: response.data.description,
          command: response.data.command,
          commandOutput: response.data.commandOutput,
        });

      } catch (error) {
        console.error("Error al obtener la información del comando", error);
        // Manejar el error según tus necesidades
      }
    };

    // Llamar a la función para cargar la información
    fetchCommandInfo();
  }, [commandId]);

  return (
    <div>
      <Navbar />
      <div className="container height-page-block">
        <div className="row margin-top-page-start">
          <div className="title-fl">{cmdInfo.title}</div>
          <div className="col-lg-6 col-sm-12 section-col-infocmd">
            <div className="desc-infocmd">{cmdInfo.description}</div>
          </div>
          <div className="col-lg-6 col-sm-12 section-col-infocmd">
            <div className="label-cmd-infocmd">Comando:</div>
            <pre className="language-bash">
              <code className="">{cmdInfo.command}</code>
            </pre>
          </div>
        </div>
        <TableInfoCmd 
          headers = {cmdInfo.commandOutput.headers}
          values = {cmdInfo.commandOutput.values}
        />
      </div>
    </div>
  );
};

export default InfoCmd;
