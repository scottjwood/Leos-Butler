import React, { useEffect, useState } from 'react';

const CastingProcessReport = () => {
  const [report, setReport] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchReport = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/reports/casting-processes', {
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
        console.error('Error fetching casting process report:', error);
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
      <h1>Casting Process Report</h1>
      <table>
        <thead>
          <tr>
            <th>Process Step</th>
            <th>Project</th>
            <th>Total Cost</th>
            <th>Total Time</th>
            <th>Material Used</th>
          </tr>
        </thead>
        <tbody>
          {report.map((row) => (
            <tr key={row.step}>
              <td>{row.step}</td>
              <td>{row.project}</td>
              <td>{row.totalCost}</td>
              <td>{row.totalTime}</td>
              <td>{row.materialUsed}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CastingProcessReport;
