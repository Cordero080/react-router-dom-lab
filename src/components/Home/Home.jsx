import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Home.css';
import '../Effects/AdvancedEffects.css';
import ScrambleButton from '../ScrambleButton/ScrambleButton';
import { StorageIcon, DeliveryIcon, SecurityIcon } from '../Icons/Icons.jsx';
import '../Icons/Icons.css';

export default function Home() {
  const navigate = useNavigate();

  // Navigation handlers
  const goToMailboxes = () => navigate('/mailboxes');
  const goToNewMailbox = () => navigate('/new-mailbox');
  
  return (
    <main className="hologram">
      <h1 className="typewriter">QUANTUM POST OFFICE</h1>
      <div className="hero-content">
        <p className="hero-text terminal-text">Welcome to the future of mail delivery</p>
        <div className="hero-buttons">
          <ScrambleButton variant="primary" onClick={goToMailboxes}>View Mailboxes</ScrambleButton>
          <ScrambleButton variant="secondary" onClick={goToNewMailbox}>Register New Box</ScrambleButton>
        </div>
      </div>
      <div className="hero-decoration"></div>
      
      {/* Feature info section with custom SVG icons */}
      <div className="feature-section">
        <div className="feature-card card-3d">
          <div className="feature-icon">
            <StorageIcon />
          </div>
          <h3>Secure Storage</h3>
          <p>Quantum-encrypted storage units for all your interdimensional mail</p>
        </div>
        <div className="feature-card card-3d">
          <div className="feature-icon">
            <DeliveryIcon />
          </div>
          <h3>Instant Delivery</h3>
          <p>Temporal field technology ensures your mail arrives before it's sent</p>
        </div>
        <div className="feature-card card-3d">
          <div className="feature-icon">
            <SecurityIcon />
          </div>
          <h3>Advanced Security</h3>
          <p>Biometric scanners and neural authentication protect your communications</p>
        </div>
      </div>
    </main>
  );
}