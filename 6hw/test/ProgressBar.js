import React from 'react';
import './ProgressBar.css';

const ProgressBar = ({ title, percentage, onCancel }) => {
  const progressStyle = {
    width: `${percentage}%`,
    background: `linear-gradient(to right, #2ecc71 ${percentage}%, #9b59b6 ${percentage}%)`,
  };

  return (
    <div className="progress-container">
      <div className="progress-bar" style={progressStyle}>
        <span className="progress-text">{percentage === 0 ? '' : `${percentage}%`}</span>
      </div>
      {percentage !== 100 && (
        <button className="cancel-button" onClick={onCancel}>
          <span className="cancel-icon">❌</span>
        </button>
      )}
      {percentage === 0 && <span className="canceled-text">{title}</span>}
    </div>
  );
};

export default ProgressBar;