import { useState, useEffect } from 'react';
import { BrowserRouter as Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import Student from './pages/Student';
import SingUp from './pages/SignUp';
import Login from './pages/LogIn';

function App() {
  const [currentUser, setCurrentUser] = useState(false);

  useEffect(() => {
    const user = false;
    if (user) {
      setCurrentUser(user);
    }
  }, []);
  return (
    <div>
      <h1>App</h1>
      <div>
        {currentUser === false
          ? <button>Login</button>
          : <button>Logout</button>
        }

      </div>
      <section>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SingUp />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/" element={<Home />} />
          <Route path="/student/:id" element={<Student />} />
        </Routes>
      </section>
    </div>

  );
}

export default App;
