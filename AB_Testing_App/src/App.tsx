import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LogoSection from './components/LandingPage';
import { nanoid } from 'nanoid';
import AdminPage from './components/AdminPage';

type ABTestVersion = "A" | "B";

function generateNanoId(size: number = 21): string {
  return nanoid(size);
}

function App() {
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

  return (
    <Router>
      <Routes>
        <Route path="/" element={<LogoSection version={version} />} />
        <Route path="/admin" element={<AdminPage/>} />
      </Routes>
    </Router>
  );
}

export default App;
