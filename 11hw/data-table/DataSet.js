import React from 'react';
import './DataSet.css';

const DataSet = ({
  headers = [],
  data = [],
  rowRenderer = (rowData) => rowData,
  headerRenderer = (headerData) => headerData,
  selectedRows = [],
  onRowSelect,
}) => {
  return (
    <table className="table">
      <thead>
        <tr>
          {headers.map((header, index) => (
            <th key={index} className="headerCell">
              {headerRenderer(header)}
            </th>
          ))}
        </tr>
      </thead>

      <tbody>
        {data.map((row, rowIndex) => (
          <tr
            key={rowIndex}
            className={`row ${selectedRows.includes(rowIndex) ? 'selected' : ''}`}
          >
            {Object.values(row).map((cell, cellIndex) => (
              <td key={cellIndex} className="cell" onClick={cellIndex===0 ? (event) => onRowSelect && onRowSelect(rowIndex, event) : undefined}>
                {rowRenderer(cell)}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default DataSet;