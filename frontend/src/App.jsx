import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/staff/Login';
import Signup from './pages/staff/Signup';
import Dashboard from './pages/staff/Dashboard';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/staff/login" element={<Login />} />
        <Route path="/staff/signup" element={<Signup />} />
        <Route path="/staff/dashboard" element={<Dashboard />}/>
      </Routes>
    </Router>
  );
}

export default App;
