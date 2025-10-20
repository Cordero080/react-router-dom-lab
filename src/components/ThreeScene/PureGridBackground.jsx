import React, { useRef, useEffect, useState } from 'react';
import './CyberBackground.css'; // Reuse the existing CSS
import { getUISettings } from '../../utils/uiSettings';

export default function PureGridBackground() {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const linesRef = useRef([]);
  const animationFrameRef = useRef(null);
  
  // State to track if pure grid is enabled
  const [pureGridEnabled, setPureGridEnabled] = useState(getUISettings().pureGridEnabled || false);

  // Set up the grid effect
  useEffect(() => {
    // Listen for changes to pureGrid toggle
    const handleGridToggle = (e) => {
      setPureGridEnabled(e.detail.enabled);
    };
    
    window.addEventListener('pureGridToggle', handleGridToggle);
    
    // Initial setup for grid
    if (pureGridEnabled && containerRef.current) {
      if (!canvasRef.current) {
        const canvas = document.createElement('canvas');
        canvas.className = 'pure-grid-canvas';
        containerRef.current.appendChild(canvas);
        canvasRef.current = canvas;
        
        // Set canvas size
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        
        // Initialize the pure CSS grid effect
        initGridEffect();
      }
      
      containerRef.current.style.display = 'block';
    } else if (!pureGridEnabled && containerRef.current) {
      containerRef.current.style.display = 'none';
      
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
        animationFrameRef.current = null;
      }
    }
    
    return () => {
      window.removeEventListener('pureGridToggle', handleGridToggle);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [pureGridEnabled]);

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      if (pureGridEnabled && canvasRef.current) {
        canvasRef.current.width = window.innerWidth;
        canvasRef.current.height = window.innerHeight;
        initGridEffect(); // Reinitialize the grid effect
      }
    };
    
    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [pureGridEnabled]);

  // Initialize the grid effect
  const initGridEffect = () => {
    if (!canvasRef.current) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;
    
    // Clear canvas
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, width, height);
    
    // Create grid lines
    const lines = [];
    const spacing = 30;
    const perspective = height / 2;
    
    // Horizontal grid lines
    for (let z = spacing; z < 1000; z += spacing) {
      const scale = perspective / (perspective + z);
      const lineWidth = Math.max(0.5, 2 * scale);
      
      lines.push({
        y: height / 2 + scale * perspective,
        width: width,
        height: lineWidth,
        color: `rgba(0, ${255 * Math.min(1, 2 / (z / spacing))}, ${255 * Math.min(1, 4 / (z / spacing))}, ${1 - z / 1000})`,
        z: z
      });
      
      if (height / 2 - scale * perspective > 0) {
        lines.push({
          y: height / 2 - scale * perspective,
          width: width,
          height: lineWidth,
          color: `rgba(0, ${255 * Math.min(1, 2 / (z / spacing))}, ${255 * Math.min(1, 4 / (z / spacing))}, ${1 - z / 1000})`,
          z: z
        });
      }
    }
    
    // Vertical grid lines
    for (let x = -width / 2; x < width / 2; x += spacing) {
      for (let z = spacing; z < 1000; z += spacing) {
        const scale = perspective / (perspective + z);
        const projectedX = width / 2 + x * scale;
        const lineWidth = Math.max(0.5, 1 * scale);
        
        if (projectedX > 0 && projectedX < width) {
          lines.push({
            x: projectedX,
            height: height,
            width: lineWidth,
            color: `rgba(0, ${255 * Math.min(1, 2 / (z / spacing))}, ${255 * Math.min(1, 4 / (z / spacing))}, ${1 - z / 1000})`,
            z: z
          });
        }
      }
    }
    
    linesRef.current = lines;
    
    // Start animation
    animateGridEffect();
  };

  // Animate the grid effect
  const animateGridEffect = () => {
    if (!canvasRef.current || !linesRef.current.length) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;
    const perspective = height / 2;
    const speed = 5;
    
    // Clear canvas
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, width, height);
    
    // Draw and update each line
    linesRef.current.forEach((line, i) => {
      line.z -= speed;
      
      // Reset line if it's too close
      if (line.z <= 0) {
        line.z += 1000;
      }
      
      const scale = perspective / (perspective + line.z);
      
      if (line.x !== undefined) {
        // Vertical line
        const projectedX = width / 2 + (line.x - width / 2) / scale;
        ctx.fillStyle = line.color;
        ctx.fillRect(projectedX, 0, line.width * scale, height);
      } else if (line.y !== undefined) {
        // Horizontal line
        const projectedY = height / 2 + (line.y - height / 2) / scale;
        ctx.fillStyle = line.color;
        ctx.fillRect(0, projectedY, width, line.height * scale);
      }
    });
    
    // Continue animation
    if (pureGridEnabled) {
      animationFrameRef.current = requestAnimationFrame(animateGridEffect);
    }
  };
  
  return (
    <div 
      ref={containerRef} 
      className="cyber-background pure-grid"
      style={{ 
        display: pureGridEnabled ? 'block' : 'none',
        zIndex: -3 // Ensure it's behind other elements
      }}
    />
  );
}