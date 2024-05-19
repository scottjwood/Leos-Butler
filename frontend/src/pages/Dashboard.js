import React, { useEffect, useState } from 'react';

const Dashboard = () => {
  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSummary = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/summary');
        const data = await response.json();
        if (response.ok) {
          setSummary(data);
        } else {
          throw new Error(data.error);
        }
      } catch (error) {
        console.error('Error fetching summary:', error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchSummary();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      <h1>Dashboard</h1>
      <div>
        <h2>Artists</h2>
        <p>Total Artists: {summary.artistsCount}</p>
      </div>
      <div>
        <h2>Projects</h2>
        <p>Total Projects: {summary.projectsCount}</p>
      </div>
      <div>
        <h2>Casting Processes</h2>
        <p>Total Casting Processes: {summary.castingProcessesCount}</p>
      </div>
    </div>
  );
};

export default Dashboard;
