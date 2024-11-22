import React, { useState, useEffect } from "react";

const TeacherPositions = () => {
  const [positions, setPositions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPositions = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/teacher-positions');
        if (!response.ok) {
          throw new Error('Failed to fetch positions');
        }
        const data = await response.json();
        setPositions(data);
        setLoading(false);
      } catch (err) {
        setError(err.message); 
        setLoading(false);
      }
    };
    fetchPositions();
  }, []);

  return (
    <div className="teacher-positions-container">
      <h1>Teacher Positions</h1>

      {error && <p className="error">{error}</p>}

      {loading ? (
        <p className="loading">Loading...</p>
      ) : (
        <ul>
          {positions.map((position) => (
            <li key={position._id}>{position.name}</li> 
          ))}
        </ul>
      )}
    </div>
  );
};
export default TeacherPositions;