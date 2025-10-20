import React from 'react';

// Custom SVG icons for feature cards
export const StorageIcon = () => (
  <svg 
    className="feature-svg-icon"
    width="24" 
    height="24" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor"
    strokeWidth="1.5" 
    strokeLinecap="round" 
    strokeLinejoin="round"
  >
    <path d="M22 12H2M22 19H2M22 5H2M19 2v20M5 2v20" />
    <circle cx="12" cy="12" r="2" />
    <circle cx="12" cy="5" r="1" />
    <circle cx="12" cy="19" r="1" />
  </svg>
);

export const DeliveryIcon = () => (
  <svg 
    className="feature-svg-icon"
    width="24" 
    height="24" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor"
    strokeWidth="1.5" 
    strokeLinecap="round" 
    strokeLinejoin="round"
  >
    <path d="M2 12h5M2 12l3-3M2 12l3 3M13 2l-2 20M13 2l4 2M13 22l4-2" />
    <path d="M19 7l-3 2 3 2 3-2z" />
    <path d="M22 9v8" strokeDasharray="2" />
  </svg>
);

export const SecurityIcon = () => (
  <svg 
    className="feature-svg-icon"
    width="24" 
    height="24" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor"
    strokeWidth="1.5" 
    strokeLinecap="round" 
    strokeLinejoin="round"
  >
    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
    <path d="M7 11V7a5 5 0 0110 0v4" />
    <circle cx="12" cy="16" r="1" />
    <path d="M12 17v2" />
  </svg>
);