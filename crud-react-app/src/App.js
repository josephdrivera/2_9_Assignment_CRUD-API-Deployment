import React, { useState, useEffect } from 'react';

import './App.css';

function App() {
  const [students, setStudents] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const API_BASE = process.env.NODE_ENV === 'development' ? `http://localhost:8000` : process.env.REACT_APP_API_BASE_URL;

  useEffect(() => {
    let ignore = false;

    if (!ignore) {
      getStudents();
    }
    return () => { ignore = true; }
  }, []);

  const getStudents = async () => {
    setLoading(true);
    try {
      await fetch(`${API_BASE}/students`)
        .then(res => res.json())
        .then(data => {
          setStudents(data);
        })
    } catch (error) {
      setError(error.message || 'Something went wrong!');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1>CRUD React App: Student</h1>
        <ul>
          <li>ALL Student</li>
        </ul>

      </header>
    </div>
  );
}

export default App;
