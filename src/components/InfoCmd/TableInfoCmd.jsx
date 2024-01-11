import React, { useState, useEffect } from "react";

import ButtonIcon from "../General/Buttons/ButtonIcon.jsx";
import { RowNextIcon, RowPrevIcon } from "../General/Icons.js";

import "./tableinfocmd.css";

const TableInfoCmd = ({ headers = [], values = [] }) => {
  const [tableHeaders, setTableHeaders] = useState(headers);
  const [tableData, setTableData] = useState(values);

  const [datosFiltrados, setDatosFiltrados] = useState([]);

  const [busqueda, setBusqueda] = useState("");

  const [paginaActual, setPaginaActual] = useState(1);
  const [datosPorPagina] = useState(10);

  useEffect(() => {
    setTableHeaders(headers);
    setTableData(values);
  }, [headers, values]);

  useEffect(() => {
    const resultadosFiltrados = tableData.filter((row) =>
      Object.values(row).some((value) =>
        value.toString().toLowerCase().includes(busqueda.toLowerCase())
      )
    );
    setDatosFiltrados(resultadosFiltrados);
    setPaginaActual(1); // Vuelve a la primera página cuando los filtros cambian
  }, [busqueda, tableData]);

  const totalPaginas = Math.ceil(datosFiltrados.length / datosPorPagina);

  // Funciones para subir y bajar la página
  const subirPagina = () => {
    setPaginaActual((prev) => (prev < totalPaginas ? prev + 1 : prev));
  };

  const bajarPagina = () => {
    setPaginaActual((prev) => (prev > 1 ? prev - 1 : prev));
  };

  const indiceFinal = paginaActual * datosPorPagina;
  const indiceInicial = indiceFinal - datosPorPagina;
  const datosActuales = datosFiltrados.slice(indiceInicial, indiceFinal);

  return (
    <div className="row section-table margin-top-1">
      <div className="input-filter-container">
        <div className="input-group">
          <span className="input-group-text" id="basic-addon3">
            Search
          </span>
          <input
            className="form-control"
            type="text"
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
            aria-describedby="basic-addon3"
          />
        </div>
      </div>
      <div className="table-container">
        <table className="table table-dark table-hover">
          <thead>
            <tr>
              {tableHeaders.map((header, index) => (
                <th key={index} scope="col">
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {datosActuales.map((row, rowIndex) => (
              <tr key={rowIndex}>
                {Object.values(row).map((value, colIndex) => (
                  <td key={colIndex}>{value}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="paginacion-container">
        <div>
        Displaying {indiceInicial + 1} to{" "}
          {Math.min(indiceFinal, datosFiltrados.length)} of{" "}
          {datosFiltrados.length}
        </div>
        <div className="input-group">
          <ButtonIcon
            classType={"btn-default"}
            svgIcon={<RowPrevIcon />}
            eventOnClick={bajarPagina}
            isDisabled={paginaActual === 1}
          />
          <div className="input-pag">
            <span>
              {paginaActual} of {totalPaginas}
            </span>
          </div>
          <ButtonIcon
            classType={"btn-default"}
            svgIcon={<RowNextIcon />}
            eventOnClick={subirPagina}
            isDisabled={paginaActual === totalPaginas}
          />
        </div>
      </div>
    </div>
  );
};

export default TableInfoCmd;
