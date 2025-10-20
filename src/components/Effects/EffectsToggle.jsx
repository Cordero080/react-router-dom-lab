import React, { useState, useEffect } from 'react';
import { getUISettings, toggleDarkTechnoEffects } from '../../utils/uiSettings';
import './EffectsToggle.css';
import './StandardTheme.css';

const EffectsToggle = () => {
  const [enabled, setEnabled] = useState(getUISettings().darkTechnoEnabled);
  
  // Apply appropriate body class on initial load and when toggled
  useEffect(() => {
    if (enabled) {
      document.body.classList.remove('standard-mode');
    } else {
      document.body.classList.add('standard-mode');
    }
  }, [enabled]);
  
  const handleToggle = () => {
    const newSettings = toggleDarkTechnoEffects();
    setEnabled(newSettings.darkTechnoEnabled);
    
    // Dispatch a custom event to notify other components
    window.dispatchEvent(new CustomEvent('darkTechnoToggle', { 
      detail: { enabled: newSettings.darkTechnoEnabled } 
    }));
  };
  
  // SVG icons as components for better styling control
  const CyberIcon = () => (
    <svg className="toggle-icon-svg" viewBox="0 0 24 24" width="14" height="14" stroke="currentColor" fill="none">
      <path 
        strokeLinecap="round" 
        strokeLinejoin="round" 
        strokeWidth="2" 
        d="M13 10V3L4 14h7v7l9-11h-7z" 
      />
    </svg>
  );
  
  const StandardIcon = () => (
    <svg className="toggle-icon-svg" viewBox="0 0 24 24" width="14" height="14" stroke="currentColor" fill="none">
      <circle cx="12" cy="12" r="5" strokeWidth="2" />
      <path 
        strokeLinecap="round" 
        strokeLinejoin="round" 
        strokeWidth="2" 
        d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" 
      />
    </svg>
  );
  
  return (
    <div className="effects-toggle">
      <button 
        onClick={handleToggle}
        className={`toggle-button ${enabled ? 'enabled' : 'disabled'}`}
        title={enabled ? 'Disable cyberpunk effects' : 'Enable cyberpunk effects'}
      >
        <span className="toggle-icon">
          {enabled ? <CyberIcon /> : <StandardIcon />}
        </span>
        <span className="toggle-text">{enabled ? 'CYBER' : 'NORMAL'}</span>
      </button>
    </div>
  );
};

export default EffectsToggle;