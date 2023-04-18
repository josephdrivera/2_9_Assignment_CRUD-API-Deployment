import { BrowserRouter, Route, Routes } from 'react-router-dom';


import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import Student from './pages/Student';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/" element={<Home />} />
        <Route path="/student/:id" element={<Student />} />

      </Routes>
    </BrowserRouter>

  );
}

export default App;
