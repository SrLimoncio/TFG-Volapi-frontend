import React, { useState, useEffect } from "react";

import "./tableinfocmd.css";

const TableInfoCmd = ({ headers = [], values = [] }) => {
  const [tableHeaders, setTableHeaders] = useState(headers);
  const [tableData, setTableData] = useState(values);

  useEffect(() => {

    // Actualizar el estado cuando las propiedades cambien
    setTableHeaders(headers);
    setTableData(values);

  }, [headers, values]);

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
