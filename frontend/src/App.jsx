
 import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import GeneralHome from './GeneralHome';
import StudentRegister from './pages/student/StudentRegister';
import StudentLogin from './pages/student/StudentLogin';
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
        <Route path="/" element={<GeneralHome />} />
          
          {/* Student Routes */}
        <Route path="/StudentRegister" element={<StudentRegister />} />
        <Route path="/StudentLogin" element={<StudentLogin />} />
      </Routes>
    </Router>
  );
}

export default App;
