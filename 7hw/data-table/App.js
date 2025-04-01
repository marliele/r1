import React from 'react';
import DataSet from './DataSet';

function App() {
  const mockData = [
    { id: 1, name: 'Alice', age: 25},
    { id: 2, name: 'Bob', age: 30 },
    { id: 3, name: 'Charlie', age: 35 },
  ];

  const mockHeaders = [
    { key: 'id', label: 'ID' },
    { key: 'name', label: 'Name' },
    { key: 'age', label: 'Age' }
  ];

  return (
    <div className="App">
      <h1>DataSet</h1>
      <DataSet
        headers={mockHeaders}
        data={mockData}
        rowRenderer={(cell) => cell}
        headerRenderer={(header) => header.label}
      />
    </div>
  );
}

export default App;
