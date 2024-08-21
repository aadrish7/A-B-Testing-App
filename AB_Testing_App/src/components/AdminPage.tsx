import React, { useState, useEffect } from 'react';
import "./CSS_AdminPage.css"
import AdminAnalytics from './AdminAnalytics';

type ABTestVersion = 'A' | 'B' | null;

const AdminPage: React.FC = () => {
  const [selectedVersion, setSelectedVersion] = useState<ABTestVersion>(null);

  useEffect(() => {
    const fetchAdminVersion = async () => {
      try {
        const response = await fetch('http://localhost:3001/api/admin/getAdminVersion');
        const data = await response.json();
        setSelectedVersion(data.adminSelectedVersion);
      } catch (error) {
        console.error('Error fetching admin version:', error);
      }
    };

    fetchAdminVersion();
  }, []);

  const setAdminVersion = async (version: ABTestVersion) => {
    if (selectedVersion === version) {
      console.log(`Version ${version} is already selected, no API call needed.`);
      return;
    }

    try {
      const response = await fetch('http://localhost:3001/api/admin/setAdminVersion', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ version }),
      });
      console.log('Response:', response);

      if (!response.ok) {
        throw new Error('Failed to set admin version');
      }

      const data = await response.json();
      console.log('Admin version set successfully:', data);
      setSelectedVersion(version); 
    } catch (error) {
      console.error('Error setting admin version:', error);
    }
  };

  return (
    <>
    <div className="admin-container">
      <h1>Admin Page</h1>
      <button
        onClick={() => setAdminVersion('A')}
        disabled={selectedVersion === 'A'}
      >
        {selectedVersion === 'A' ? 'Version A Selected' : 'Set Version A'}
      </button>
      <button
        onClick={() => setAdminVersion('B')}
        disabled={selectedVersion === 'B'}
      >
        {selectedVersion === 'B' ? 'Version B Selected' : 'Set Version B'}
      </button>
      <button
        onClick={() => setAdminVersion(null)}
        disabled={selectedVersion === null}
      >
        {selectedVersion === null ? 'Version Null Selected' : 'Set Version Null'}
      </button>
    </div>
    <AdminAnalytics />
    </>
  );
};

export default AdminPage;
