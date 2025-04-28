import React, { useState } from 'react';
import './DataSet.css';

const DataSet = ({ data = [], headers = [], onDelete, onEdit }) => {
  const defaultHeaders = headers.length > 0 
    ? headers 
    : Object.keys(data[0] || {}).map((key) => ({ key, label: key }));

  const [selectedRows, setSelectedRows] = useState([]);
  const [editingRow, setEditingRow] = useState(null);
  const [editedValues, setEditedValues] = useState({});

  const handleRowClick = (event, rowIndex) => {
    const isCtrlPressed = event.ctrlKey;

    if (isCtrlPressed) {
      setSelectedRows((prevSelected) =>
        prevSelected.includes(rowIndex)
          ? prevSelected.filter((index) => index !== rowIndex)
          : [...prevSelected, rowIndex]
      );
    } else {
      setSelectedRows(prevSelected => (prevSelected.includes(rowIndex) ? [] : [rowIndex]));
    }
  };

  const handleDelete = () => {
    const selectedIds = selectedRows.map((index) => data[index].id);
    onDelete(selectedIds);
    setSelectedRows([]);
  };

  const startEdit = (rowIndex) => {
    const itemToEdit = data[rowIndex];
    setEditingRow(rowIndex);
    setEditedValues(itemToEdit);
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditedValues((prev) => ({ ...prev, [name]: value }));
  };

  const saveEdit = async () => {
    const itemToEdit = data[editingRow];
    await onEdit(itemToEdit.id, editedValues);
    setEditingRow(null);
    setEditedValues({});
  };

  return (
    <div>
      <button onClick={handleDelete} disabled={selectedRows.length === 0}>
        Delete Selected
      </button>
      <table>
        <thead>
          <tr>
            <th className="left-cell-head"></th>
            {defaultHeaders.map((header, index) => (
              <th key={index} className="thead">{header.label}</th>
            ))}
            <th className="thead">Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, rowIndex) => (
            <tr
              key={rowIndex}
              className={selectedRows.includes(rowIndex) ? 'selected-row' : ''}
            >
              <td
                className={`left-cell ${selectedRows.includes(rowIndex) ? 'selected' : ''}`}
                onClick={(event) => handleRowClick(event, rowIndex)}
              >
                {rowIndex + 1}
              </td>
              {defaultHeaders.map((header, colIndex) => (
                <td key={colIndex}>
                  {editingRow === rowIndex ? (
                    <input
                      type={header.key === 'postId' ? 'number' : 'text'}
                      name={header.key}
                      value={editedValues[header.key]}
                      onChange={handleEditChange}
                    />
                  ) : (
                    item[header.key]
                  )}
                </td>
              ))}
              <td>
                {editingRow === rowIndex ? (
                  <button onClick={saveEdit}>Save</button>
                ) : (
                  <button onClick={() => startEdit(rowIndex)}>Edit</button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DataSet;