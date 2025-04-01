import React, { useState } from 'react';
import "./App.css";

const Component = ({ title, children }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleContent = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="accordion">
      <div className="header" onClick={toggleContent}>
        <h3>{title}</h3>
        <button>{isOpen ? 'Скрыть' : 'Показать'}</button>
      </div>
      {isOpen && <div className="content">{children}</div>}
    </div>
  );
};

export default Component;