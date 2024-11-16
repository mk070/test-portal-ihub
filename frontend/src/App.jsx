import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import GeneralHome from './GeneralHome';
import StudentRegister from './pages/student/StudentRegister';
import StudentLogin from './pages/student/StudentLogin';

const App = () => {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <Routes>
          {/* General Routes */}
          <Route path="/" element={<GeneralHome />} />
          
          {/* Student Routes */}
          <Route path="/StudentRegister" element={<StudentRegister />} />
          <Route path="/StudentLogin" element={<StudentLogin />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;