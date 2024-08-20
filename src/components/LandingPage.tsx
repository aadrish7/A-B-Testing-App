import React from 'react';
import reactLogo from '../assets/react.svg';
import viteLogo from '/vite.svg';
import './CSS_LandingPage.css';

interface LogoSectionProps {
  version: 'A' | 'B';
}

const LogoSection: React.FC<LogoSectionProps> = ({ version }) => {
  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank" rel="noopener noreferrer">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank" rel="noopener noreferrer">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>

      {version === 'A' ? (
        <h1>Get 50% Off Your Next Purchase!</h1>
      ) : (
        <h1>Exclusive Offer: Buy One Get One Free!</h1>
      )}

      <div className="card">
        <button>Click Here</button>
      </div>

      <p className="read-the-docs">Click Above to avail the discount!!</p>
    </>
  );
};

export default LogoSection;
