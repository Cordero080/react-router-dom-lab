import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';
import './CyberBackground.css';
import { getUISettings } from '../../utils/uiSettings';

export default function CyberBackground() {
  const containerRef = useRef(null);
  const sceneRef = useRef(null);
  const cameraRef = useRef(null);
  const rendererRef = useRef(null);
  const gridRef = useRef(null);
  const animationFrameRef = useRef(null);

  useEffect(() => {
    // Only initialize if Three.js is enabled
    if (!getUISettings().threeJsEnabled) return;

    // Initialize the Three.js scene
    const init = () => {
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
      
      // Handle window resize
      window.addEventListener('resize', handleResize);
    };
    
    // Animation loop
    const animate = () => {
      animationFrameRef.current = requestAnimationFrame(animate);
      
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
    };
    
    // Handle window resize
    const handleResize = () => {
      if (cameraRef.current && rendererRef.current) {
        cameraRef.current.aspect = window.innerWidth / window.innerHeight;
        cameraRef.current.updateProjectionMatrix();
        rendererRef.current.setSize(window.innerWidth, window.innerHeight);
      }
    };
    
    // Initialize and start animation
    init();
    animate();
    
    // Cleanup on component unmount
    return () => {
      window.removeEventListener('resize', handleResize);
      
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      
      if (rendererRef.current && containerRef.current) {
        containerRef.current.removeChild(rendererRef.current.domElement);
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
  }, []);
  
  // Listen for Three.js toggle events
  useEffect(() => {
    const handleToggle = (e) => {
      if (containerRef.current) {
        if (e.detail.enabled) {
          containerRef.current.style.display = 'block';
        } else {
          containerRef.current.style.display = 'none';
        }
      }
    };
    
    window.addEventListener('threeJsToggle', handleToggle);
    
    return () => {
      window.removeEventListener('threeJsToggle', handleToggle);
    };
  }, []);
  
  return (
    <div 
      ref={containerRef} 
      className="cyber-background"
      style={{ display: getUISettings().threeJsEnabled ? 'block' : 'none' }}
    />
  );
}