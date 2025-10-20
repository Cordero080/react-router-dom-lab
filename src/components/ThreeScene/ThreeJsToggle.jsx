import React, { useState, useEffect } from 'react';
import { getUISettings, toggleThreeJsEffects } from '../../utils/uiSettings';
import './ThreeJsToggle.css';

export default function ThreeJsToggle() {
  const [enabled, setEnabled] = useState(getUISettings().threeJsEnabled);

  useEffect(() => {
    // Keep local state in sync with global settings
    const handleToggle = (e) => setEnabled(e.detail.enabled);
    window.addEventListener('threeJsToggle', handleToggle);
    return () => window.removeEventListener('threeJsToggle', handleToggle);
  }, []);

  const handleToggleClick = () => {
    const newState = !enabled;
    setEnabled(newState);
    toggleThreeJsEffects(newState);
  };

  return (
    <div className="three-js-toggle">
      <button 
        onClick={handleToggleClick}
        className={`toggle-button ${enabled ? 'active' : 'inactive'}`}
      >
        <span className="toggle-label">3D</span>
        <span className="toggle-state">{enabled ? "ON" : "OFF"}</span>
      </button>
    </div>
  );
}