import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

import Navbar from "../components/NavBar/Navbar";
import TableInfoCmd from "../components/InfoCmd/TableInfoCmd";
import SunburstChart from "../components/InfoCmd/SunburstChart";
import CommandLine from "../components/InfoCmd/CommandLine";

import { showCommand } from "../services/CommandService";

import "./infocmd.css";

const InfoCmd = () => {
  const location = useLocation();
  const commandId = location.state?.id;
  const [showChart, setShowChart] = useState(false);


  const [cmdInfo, setCmdInfo] = useState({
    title: "",
    description: "",
    command_line: "",
    execution_time: "",
    commandOutput: { headers: [], values: [] },
    chartOutput: { },
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
          command_line: response.data.command_line,
          execution_time: response.data.execution_time,
          commandOutput: response.data.commandOutput,
          chartOutput: response.data.chartOutput,
        });

      } catch (error) {
        console.error("Error al obtener la información del comando", error);
        // Manejar el error según tus necesidades
      }
    };

    // Llamar a la función para cargar la información
    fetchCommandInfo();
  }, [commandId]);

  const toggleChartView = () => {
    setShowChart(!showChart);
  };


  return (
    <div>
      <div className="container">
        <div className="row margin-top-page-start">
          <div className="title-fl">{cmdInfo.title}</div>
          <div className="col-lg-6 col-sm-12 section-col-infocmd">
            <div className="desc-infocmd">{cmdInfo.description}</div>
          </div>
          <div className="col-lg-6 col-sm-12 section-col-infocmd">
            <div className="variable-label">Command:</div>
            <CommandLine command={cmdInfo.command_line} />
            <div className="variable-label">Execution date:</div>
            <div className="variable-container">{cmdInfo.execution_time}</div>

          </div>
          <button className="btn btn-default" onClick={toggleChartView}>
            {showChart ? "Show Table" : "Show Chart"}
          </button>
        </div>
        {showChart ? (
          /*<SunburstChart data={ddata} />*/
          <SunburstChart data={cmdInfo.chartOutput} />
        ) : (
          <TableInfoCmd
            headers={cmdInfo.commandOutput.headers}
            values={cmdInfo.commandOutput.values}
          />
        )}
      </div>
    </div>
  );
};

export default InfoCmd;
