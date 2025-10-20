import React, { useState, useEffect } from 'react';
import { getUISettings, updateUISetting } from '../../utils/uiSettings';
import './CyberGridToggle.css';

export default function CyberGridToggle() {
  const [enabled, setEnabled] = useState(getUISettings().pureGridEnabled || false);

  useEffect(() => {
    // Keep local state in sync with global settings
    const handleToggle = (e) => setEnabled(e.detail.enabled);
    window.addEventListener('pureGridToggle', handleToggle);
    return () => window.removeEventListener('pureGridToggle', handleToggle);
  }, []);

  const handleToggleClick = () => {
    const newState = !enabled;
    setEnabled(newState);
    updateUISetting('pureGridEnabled', newState);
    
    // Dispatch event so other components can react
    window.dispatchEvent(
      new CustomEvent('pureGridToggle', { detail: { enabled: newState } })
    );
  };

  return (
    <div className="cyber-grid-toggle">
      <button 
        onClick={handleToggleClick}
        className={`toggle-button ${enabled ? 'active' : 'inactive'}`}
      >
        <span className="toggle-label">PURE GRID</span>
        <span className="toggle-state">{enabled ? "ON" : "OFF"}</span>
      </button>
    </div>
  );
}