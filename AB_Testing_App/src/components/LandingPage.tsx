import React from 'react';
import reactLogo from '/react.svg';
import viteLogo from '/vite.svg';
import '../styles/CSS_LandingPage.css';
import { nanoid } from 'nanoid';
import { useEffect, useState } from 'react';

type ABTestVersion = "A" | "B";

function generateNanoId(size: number = 21): string {
  return nanoid(size);
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

const LogoSection: React.FC= () => {
    const [version, setVersion] = useState<ABTestVersion | null>(null);
    useEffect(() => {
      const fetchVersion = async () => {
        let userId = localStorage.getItem('userId');
        if (!userId) {
          userId = generateNanoId();
          console.log("Generated new userId:", userId);
          localStorage.setItem('userId', userId);
        }
        console.log("User ID Founded, it is ", userId);
        try {
          const response = await fetch(`http://localhost:3001/api/user/getversion?userId=${userId}`);
          
          const data = await response.json();
          if (response.ok) {
            console.log("API Response is ", data.version);
            setVersion(data.version); 
          } else {
            console.error('Failed to fetch version:', data.error);
          }
        } catch (error) {
          console.error('Error fetching version:', error);
        }
      };
      fetchVersion();
    }, []);
  
    if (version === null) {
      return <div>Loading...</div>;
    }
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
