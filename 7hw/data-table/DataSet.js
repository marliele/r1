import React, { useState } from 'react';
import './DataSet.css';

const DataSet = ({
  headers = [],
  data = [],
  rowRenderer = (rowData) => rowData,
  headerRenderer = (headerData) => headerData,
}) => {
  const [selectedRows, setSelectedRows] = useState([]);

  const handleRowClick = (index, event) => {
    const isCtrlPressed = event.ctrlKey;

    if (isCtrlPressed) {
      if (selectedRows.includes(index)) {
        setSelectedRows(selectedRows.filter((row) => row !== index));
      } else {
        setSelectedRows([...selectedRows, index]);
      }
    } else {
      if (selectedRows.includes(index)) {
        setSelectedRows([]);
      } else {
        setSelectedRows([index]);
      }
    }
  };

  const getHeaders = () => {
    if (headers.length > 0) {
      return headers.map(header => headerRenderer(header));
    } else if (data.length > 0) {
      return Object.keys(data[0]).map(key => key);
    }
    return [];
  };

  return (
    <div>
      <div className="tableHeader">
        {getHeaders().map((header, index) => (
          <div key={index} className="headerCell">
            {header}
          </div>
        ))}
      </div>

      <div className="tableBody">
        {data.map((row, rowIndex) => (
          <div
            key={rowIndex}
            className="row"
            style={{
              backgroundColor: selectedRows.includes(rowIndex) ? '#e0f7fa' : 'transparent',
            }}
            
          > <div className="selectArea" onClick={(event) => handleRowClick(rowIndex, event)}>{rowIndex + 1}</div>
            {Object.values(row).map((cell, cellIndex) => (
              <div key={cellIndex} className="cell">
                {rowRenderer(cell)}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default DataSet;