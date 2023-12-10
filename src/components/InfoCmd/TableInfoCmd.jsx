import React, { useState, useEffect } from "react";

import "./tableinfocmd.css";

const TableInfoCmd = (props) => {
  const [tableHeaders, setTableHeaders] = useState([]);
  const [tableData, setTableData] = useState([]);

  useEffect(() => {

    // Actualizar el estado cuando las propiedades cambien
    setTableHeaders(props.headers || []);
    setTableData(props.values || []);

  }, [props.headers, props.values]);

  return (
    <div className="row section-table margin-top-1">
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
          {tableData.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {Object.values(row).map((value, colIndex) => (
                <td key={colIndex}>{value}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TableInfoCmd;
