import React, { useEffect, useState } from 'react';

const ArtistReport = () => {
  const [report, setReport] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchReport = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/reports/artists', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        });
        const data = await response.json();
        if (response.ok) {
          setReport(data);
        } else {
          throw new Error(data.error);
        }
      } catch (error) {
        console.error('Error fetching artist report:', error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchReport();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;
  if (!report) return <div>No report data</div>;

  return (
    <div>
      <h1>Artist Report</h1>
      <table>
        <thead>
          <tr>
            <th>Artist</th>
            <th>Total Projects</th>
            <th>Total Cost</th>
          </tr>
        </thead>
        <tbody>
          {report.map((row) => (
            <tr key={row.artist}>
              <td>{row.artist}</td>
              <td>{row.totalProjects}</td>
              <td>{row.totalCost}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ArtistReport;
