import React, { useRef, useEffect, useState } from 'react';
import * as THREE from 'three';
import './CyberBackground.css';
import { getUISettings } from '../../utils/uiSettings';

export default function CyberBackground() {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const sceneRef = useRef(null);
  const cameraRef = useRef(null);
  const rendererRef = useRef(null);
  const gridRef = useRef(null);
  const linesRef = useRef([]);
  const animationFrameRef = useRef(null);
  
  // State to track which mode is enabled
  const [cyberGridEnabled, setCyberGridEnabled] = useState(getUISettings().cyberGridEnabled || false);
  const [threeJsEnabled, setThreeJsEnabled] = useState(getUISettings().threeJsEnabled || false);

  // Set up the grid effect inspired by the Codepen
  useEffect(() => {
    // Listen for changes to cyberGrid toggle
    const handleGridToggle = (e) => {
      setCyberGridEnabled(e.detail.enabled);
    };
    
    window.addEventListener('cyberGridToggle', handleGridToggle);
    
    // Initial setup for grid
    if (cyberGridEnabled && containerRef.current) {
      if (!canvasRef.current) {
        const canvas = document.createElement('canvas');
        canvas.className = 'cyber-grid-canvas';
        containerRef.current.appendChild(canvas);
        canvasRef.current = canvas;
        
        // Set canvas size
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        
        // Initialize the pure CSS grid effect
        initGridEffect();
      }
      
      containerRef.current.style.display = 'block';
    }
    
    return () => {
      window.removeEventListener('cyberGridToggle', handleGridToggle);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [cyberGridEnabled]);

  // Set up the Three.js scene
  useEffect(() => {
    // Listen for changes to Three.js toggle
    const handleThreeJsToggle = (e) => {
      setThreeJsEnabled(e.detail.enabled);
    };
    
    window.addEventListener('threeJsToggle', handleThreeJsToggle);
    
    // Only initialize Three.js scene if it's enabled
    if (threeJsEnabled && containerRef.current && !cyberGridEnabled) {
      // Initialize the Three.js scene
      initThreeJsScene();
    }
    
    return () => {
      window.removeEventListener('threeJsToggle', handleThreeJsToggle);
      cleanupThreeJsScene();
    };
  }, [threeJsEnabled, cyberGridEnabled]);

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      if (cyberGridEnabled && canvasRef.current) {
        canvasRef.current.width = window.innerWidth;
        canvasRef.current.height = window.innerHeight;
        initGridEffect(); // Reinitialize the grid effect
      } else if (threeJsEnabled && cameraRef.current && rendererRef.current) {
        cameraRef.current.aspect = window.innerWidth / window.innerHeight;
        cameraRef.current.updateProjectionMatrix();
        rendererRef.current.setSize(window.innerWidth, window.innerHeight);
      }
    };
    
    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [cyberGridEnabled, threeJsEnabled]);

  // Initialize the grid effect inspired by the Codepen
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
    if (cyberGridEnabled) {
      animationFrameRef.current = requestAnimationFrame(animateGridEffect);
    }
  };

  // Initialize Three.js scene
  const initThreeJsScene = () => {
    // Create scene
    sceneRef.current = new THREE.Scene();
    
    // Create camera
    cameraRef.current = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    cameraRef.current.position.set(0, 1, 5);
    
    // Create renderer
    rendererRef.current = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    rendererRef.current.setSize(window.innerWidth, window.innerHeight);
    rendererRef.current.setClearColor(0x000000, 0);
    
    // Add renderer to DOM
    containerRef.current.appendChild(rendererRef.current.domElement);
    
    // Create grid
    const size = 30;
    const divisions = 30;
    const colorCenterLine = new THREE.Color(0x00ffff);
    const colorGrid = new THREE.Color(0xff00ff);
    
    gridRef.current = new THREE.GridHelper(size, divisions, colorCenterLine, colorGrid);
    gridRef.current.position.y = -0.5;
    sceneRef.current.add(gridRef.current);
    
    // Add ambient light
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    sceneRef.current.add(ambientLight);
    
    // Add directional light
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(5, 5, 5);
    sceneRef.current.add(directionalLight);
    
    // Add fog
    sceneRef.current.fog = new THREE.FogExp2(0x000000, 0.05);
    
    // Start animation
    animateThreeJsScene();
  };

  // Animate Three.js scene
  const animateThreeJsScene = () => {
    if (!threeJsEnabled || !rendererRef.current || !sceneRef.current || !cameraRef.current) return;
    
    // Animate grid movement
    if (gridRef.current) {
      gridRef.current.position.z += 0.05;
      
      // Reset grid position when it's too far
      if (gridRef.current.position.z > 1) {
        gridRef.current.position.z = -1;
      }
    }
    
    // Render scene
    rendererRef.current.render(sceneRef.current, cameraRef.current);
    
    // Continue animation
    animationFrameRef.current = requestAnimationFrame(animateThreeJsScene);
  };

  // Cleanup Three.js scene
  const cleanupThreeJsScene = () => {
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
      animationFrameRef.current = null;
    }
    
    if (rendererRef.current && containerRef.current) {
      try {
        containerRef.current.removeChild(rendererRef.current.domElement);
      } catch (e) {
        // Element might not be a child
      }
    }
    
    // Dispose resources
    if (gridRef.current) {
      gridRef.current.geometry.dispose();
      if (gridRef.current.material) {
        if (Array.isArray(gridRef.current.material)) {
          gridRef.current.material.forEach(material => material.dispose());
        } else {
          gridRef.current.material.dispose();
        }
      }
    }
    
    if (sceneRef.current) {
      while (sceneRef.current.children.length > 0) {
        const object = sceneRef.current.children[0];
        sceneRef.current.remove(object);
      }
    }
    
    if (rendererRef.current) {
      rendererRef.current.dispose();
    }
  };
  
  return (
    <div 
      ref={containerRef} 
      className="cyber-background"
      style={{ 
        display: (threeJsEnabled || cyberGridEnabled) ? 'block' : 'none',
        zIndex: cyberGridEnabled ? -1 : -2 // Ensure grid is above Three.js but behind content
      }}
    />
  );
}