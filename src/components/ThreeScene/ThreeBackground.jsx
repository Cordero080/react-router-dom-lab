import React, { useRef, useEffect, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { MeshDistortMaterial, Environment, OrbitControls } from '@react-three/drei';
import * as THREE from 'three';
import './ThreeBackground.css';
import { getUISettings } from '../../utils/uiSettings';

// Floating mailbox component
function FloatingMailbox({ position, color, size, speed, rotationSpeed }) {
  const meshRef = useRef();
  
  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    
    // Gentle floating motion with increased amplitude
    meshRef.current.position.y = position[1] + Math.sin(time * speed) * 0.5;
    
    // Slow rotation with more dramatic movement
    meshRef.current.rotation.x = Math.sin(time * rotationSpeed) * 0.3;
    meshRef.current.rotation.y += 0.005;
    meshRef.current.rotation.z = Math.sin(time * rotationSpeed * 0.8) * 0.2;
  });

  // Add an outline effect with a secondary mesh
  return (
    <group>
      {/* Glow effect */}
      <mesh ref={meshRef} position={position} scale={[1.05, 1.05, 1.05]}>
        <boxGeometry args={[size, size * 1.5, size * 0.8]} />
        <meshBasicMaterial color={color} opacity={0.3} transparent />
      </mesh>
      
      {/* Main mailbox */}
      <mesh ref={meshRef} position={position}>
        <boxGeometry args={[size, size * 1.5, size * 0.8]} />
        <MeshDistortMaterial 
          color={color} 
          speed={2} 
          distort={0.3}
          metalness={0.9}
          roughness={0.1}
          emissive={color}
          emissiveIntensity={0.5}
        />
      </mesh>
    </group>
  );
}

// Mail slot component
function MailSlot({ position, rotation }) {
  return (
    <mesh position={position} rotation={rotation}>
      <planeGeometry args={[0.4, 0.08]} />
      <meshStandardMaterial color="black" />
    </mesh>
  );
}

// Scene setup
function Scene() {
  const { camera } = useThree();
  // Brighter, more neon colors for better visibility
  const mailboxColors = ['#00ffff', '#ff00ff', '#ffff00', '#00ff99', '#ff6600'];
  
  useEffect(() => {
    // Position camera closer to objects
    camera.position.z = 8;
    camera.position.y = 1;
    camera.fov = 60; // Wider field of view
    camera.updateProjectionMatrix();
  }, [camera]);

  return (
    <>
      {/* Increased ambient light for better visibility */}
      <ambientLight intensity={0.7} />
      
      {/* Stronger directional light from front */}
      <directionalLight position={[0, 5, 10]} intensity={1.5} color="white" />
      
      {/* Colored lights for atmosphere */}
      <pointLight position={[10, 10, 10]} intensity={1.5} color="#ff00ff" />
      <pointLight position={[-10, -10, -5]} intensity={1.5} color="#00ffff" />
      <pointLight position={[0, -5, 5]} intensity={1.2} color="#ffff00" />
      
      {/* Fog to add depth */}
      <fog attach="fog" args={['#000', 8, 25]} />
      
      {/* Generate fewer, larger mailboxes that are more visible */}
      {Array.from({ length: 7 }).map((_, i) => (
        <FloatingMailbox
          key={i}
          position={[
            (Math.random() - 0.5) * 8,  // x position (closer together)
            (Math.random() - 0.5) * 6,  // y position
            (Math.random() - 0.3) * 3 - 1  // z position (more in foreground)
          ]}
          color={mailboxColors[i % mailboxColors.length]}
          size={0.8 + Math.random() * 0.6} // Larger size
          speed={0.4 + Math.random() * 0.4}
          rotationSpeed={0.2 + Math.random() * 0.2}
        />
      ))}

      {/* Slower auto-rotation */}
      <OrbitControls 
        enableZoom={false} 
        enablePan={false}
        autoRotate 
        autoRotateSpeed={0.3} 
        maxPolarAngle={Math.PI / 2} 
        minPolarAngle={Math.PI / 3}
      />
      
      {/* City environment for reflections */}
      <Environment preset="night" />
    </>
  );
}

// Main component
export default function ThreeBackground() {
  const [threeJsEnabled, setThreeJsEnabled] = useState(getUISettings().threeJsEnabled);
  
  // Listen for toggle events
  useEffect(() => {
    const handleToggle = (e) => setThreeJsEnabled(e.detail.enabled);
    window.addEventListener('threeJsToggle', handleToggle);
    return () => window.removeEventListener('threeJsToggle', handleToggle);
  }, []);

  // Don't render if disabled
  if (!threeJsEnabled) return null;
  
  return (
    <div className="three-background">
      <Canvas>
        <Scene />
      </Canvas>
    </div>
  );
}
