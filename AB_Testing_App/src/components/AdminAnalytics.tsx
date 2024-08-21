import React, { useEffect, useState } from 'react';

interface AnalyticsData {
  versionACount: number;
  versionAClickedCount: number;
  versionBCount: number;
  versionBClickedCount: number;
}

const Analytics: React.FC = () => {
  const [analytics, setAnalytics] = useState<AnalyticsData | null>(null);

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const response = await fetch('http://localhost:3001/api/analytics/data');
        console.log("Response is ", response)
        if (!response.ok) {
          throw new Error('Failed to fetch analytics');
        }
        const data: AnalyticsData = await response.json();
        console.log("Data is ", data)
        setAnalytics(data);
      } catch (error) {
        console.error('Error fetching analytics:', error);
      }
    };
    fetchAnalytics();
  }, []);


  return (
    <div>
      <h1>Analytics</h1>
      {analytics && (
        <div>
          <h2>Version A</h2>
          <p>Total Users: {analytics.versionACount}</p>
          <p>Users Who Clicked: {analytics.versionAClickedCount}</p>

          <h2>Version B</h2>
          <p>Total Users: {analytics.versionBCount}</p>
          <p>Users Who Clicked: {analytics.versionBClickedCount}</p>
        </div>
      )}
    </div>
  );
};

export default Analytics;
