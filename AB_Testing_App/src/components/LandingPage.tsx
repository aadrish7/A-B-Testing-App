import React from 'react';
import reactLogo from '/react.svg';
import viteLogo from '/vite.svg';
import './CSS_LandingPage.css';
interface LogoSectionProps {
  version: 'A' | 'B';
}


  
const updateFirstClick = async () => {
    try {
    const response = await fetch('http://localhost:3001/api/user/updateFirstClick', {
        method: 'PATCH',
        headers: {
        'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId: localStorage.getItem('userId') }),
    });

    if (!response.ok) {
        throw new Error('Failed to update first click');
    }

    const data = await response.json();
    console.log('First click updated successfully:', data.message);
    } catch (error) {
    console.error('Error updating first click:', error);
    }
};

const LogoSection: React.FC<LogoSectionProps> = ({ version }) => {
  console.log("Version is ", version)
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

      <div className="card" onClick={updateFirstClick}>
        <button>Click Here</button>
      </div>

      <p className="read-the-docs">Click Above to avail the discount!!</p>
    </>
  );
};

export default LogoSection;
