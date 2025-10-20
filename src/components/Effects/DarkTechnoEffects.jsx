import React, { useEffect, useRef, useState } from 'react';
import { getUISettings } from '../../utils/uiSettings';
import './DarkTechno.css';

const DarkTechnoEffects = () => {
  const dataLinesRef = useRef(null);
  const [glitchActive, setGlitchActive] = useState(false);
  const [effectsEnabled, setEffectsEnabled] = useState(getUISettings().darkTechnoEnabled);
  
  // Listen for toggle events
  useEffect(() => {
    const handleToggle = (e) => setEffectsEnabled(e.detail.enabled);
    window.addEventListener('darkTechnoToggle', handleToggle);
    return () => window.removeEventListener('darkTechnoToggle', handleToggle);
  }, []);
  
  // Create dynamic data lines
  useEffect(() => {
    if (!dataLinesRef.current || !effectsEnabled) {
      if (dataLinesRef.current) dataLinesRef.current.innerHTML = '';
      return;
    }
    
    // Create vertical data lines
    for (let i = 0; i < 10; i++) {
      createDataLine('vertical', i * 2000);
    }
    
    // Create horizontal data lines
    for (let i = 0; i < 8; i++) {
      createDataLine('horizontal', i * 2500);
    }
    
    function createDataLine(direction, delay) {
      const line = document.createElement('div');
      line.className = `data-line ${direction}`;
      
      // Random position
      if (direction === 'vertical') {
        line.style.left = `${Math.random() * 100}%`;
        line.style.animationDelay = `${delay}ms`;
      } else {
        line.style.top = `${Math.random() * 100}%`;
        line.style.animationDelay = `${delay}ms`;
      }
      
      dataLinesRef.current.appendChild(line);
    }
    
    // Cleanup function
    return () => {
      if (dataLinesRef.current) {
        dataLinesRef.current.innerHTML = '';
      }
    };
  }, []);
  
  // Random glitch effect
  useEffect(() => {
    if (!effectsEnabled) return;
    
    const glitchInterval = setInterval(() => {
      // Random chance to trigger glitch
      if (Math.random() < 0.1) { // 10% chance
        setGlitchActive(true);
        
        // Random duration between 100ms and 500ms
        const duration = 100 + Math.random() * 400;
        
        setTimeout(() => {
          setGlitchActive(false);
        }, duration);
      }
    }, 3000); // Check every 3 seconds
    
    return () => clearInterval(glitchInterval);
  }, [effectsEnabled]);
  
  // Don't render anything if effects are disabled
  if (!effectsEnabled) return null;
  
  return (
    <>
      {/* Digital Grid */}
      <div className="digital-grid"></div>
      
      {/* Dark Noir Vignette */}
      <div className="noir-vignette"></div>
      
      {/* Circuit Pattern */}
      <div className="circuit-pattern"></div>
      
      {/* Data Lines */}
      <div className="data-lines" ref={dataLinesRef}></div>
      
      {/* Noir Overlay */}
      <div className="noir-overlay"></div>
      
      {/* Digital Noise */}
      <div className="digital-noise"></div>
      
      {/* Glitch Effect Overlay */}
      {glitchActive && <div className="glitch-overlay"></div>}
    </>
  );
};

export default DarkTechnoEffects;