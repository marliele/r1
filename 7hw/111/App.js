import React from 'react';
import Component from './Component';
import "./App.css";

function App() {
  return (
    <div className="app">
      <h1>Component</h1>
      <Component title="title">
        <p>Test content.</p>
        <ul>
          <li>p. 1</li>
          <li>p. 2</li>
          <li>p. 3</li>
        </ul>
      </Component>
    </div>
  );
}

export default App;