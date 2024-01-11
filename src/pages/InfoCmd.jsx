import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

import TableInfoCmd from "../components/InfoCmd/TableInfoCmd";
import SunburstChart from "../components/InfoCmd/SunburstChart";
import TimeLineChart from "../components/InfoCmd/TimeLineChart";
import CommandLine from "../components/InfoCmd/CommandLine";
import {
  TableIcon,
  PieChartIcon,
  LineChartIcon,
} from "../components/General/Icons";
import ButtonIconText from "../components/General/Buttons/ButtonIconText";

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
    chartType: "",
    chartOutput: {},
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
          chartType: response.data.chartType,
          chartOutput: response.data.chartOutput,
        });
      } catch (error) {
        console.error("Error al obtener la información del comando", error);
        // Manejar el error según tus necesidades
      }
    };

    // Llamar a la función para cargar la información
    fetchCommandInfo();
    console.log(cmdInfo);
  }, [commandId]);

  const showTableView = () => {
    setShowChart(false);
  };
  const showChartView = () => {
    setShowChart(true);
  };

  const renderChart = () => {
    switch (cmdInfo.chartType) {
      case 1:
        return <SunburstChart data={cmdInfo.chartOutput} />;
      case 2:
        return <TimeLineChart data={cmdInfo.chartOutput} />;
      default:
        return (
          <TableInfoCmd
            headers={cmdInfo.commandOutput.headers}
            values={cmdInfo.commandOutput.values}
          />
        );
    }
  };

  return (
    <div className="container-lg container-fluid">
      <div className="">
        <div className="row margin-top-page-start">
          <div className="col-lg-6 col-sm-12 section-col-infocmd">
            <div className="title-fl">{cmdInfo.title}</div>
            <div className="desc-infocmd">{cmdInfo.description}</div>
          </div>
          <div className="col-lg-6 col-sm-12 section-col-infocmd">
            <div className="row-info-cmd">
              <div className="column-info-cmd">
                <div className="variable-label">Command:</div>
                <CommandLine command={cmdInfo.command_line} />
              </div>
            </div>
            <div className="row-info-cmd">
              <div className="column-info-cmd">
                <div className="variable-label">Execution date:</div>
                <div className="execution-date-container">
                  {cmdInfo.execution_time}
                </div>
              </div>
              <div>
                {showChart ? (
                  <ButtonIconText
                    classType={"btn-default"}
                    svgIcon={<TableIcon />}
                    text={"Show Table"}
                    eventOnClick={showTableView}
                    isDisabled={!cmdInfo.chartType}
                  />
                ) : (
                  <ButtonIconText
                    classType={"btn-default"}
                    svgIcon={
                      cmdInfo.chartType === 2 ? <LineChartIcon /> : <PieChartIcon />
                    }
                    text={"Show Chart"}
                    eventOnClick={showChartView}
                    isDisabled={!cmdInfo.chartType}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
        {showChart ? (
          renderChart()
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
