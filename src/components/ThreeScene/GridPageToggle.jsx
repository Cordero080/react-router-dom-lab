import React from 'react';
import { useNavigate } from 'react-router-dom';
import './GridPageToggle.css';

export default function GridPageToggle() {
  const navigate = useNavigate();

  const handleToggleClick = () => {
    navigate('/grid-page');
  };

  return (
    <div className="grid-page-toggle">
      <button 
        onClick={handleToggleClick}
        className="toggle-button"
      >
        <span className="toggle-label">GRID PAGE</span>
        <span className="toggle-state">GO</span>
      </button>
    </div>
  );
}