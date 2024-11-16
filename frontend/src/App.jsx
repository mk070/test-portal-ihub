import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import GeneralHome from "./GeneralHome";
import StudentRegister from "./pages/student/StudentRegister";
import StudentLogin from "./pages/student/StudentLogin";
import Login from "./pages/staff/Login";
import Signup from "./pages/staff/Signup";
import Dashboard from "./pages/staff/Dashboard";
import StudentDashboard from "./pages/student/StudentDashboard";
import Navbar from "./pages/student/Navbar";

// Layout component for wrapping routes with Navbar
const LayoutWithNavbar = ({ children }) => (
  <>
    <Navbar />
    {children}
  </>
);

function App() {
  return (
    <Router>
      <Routes>
        {/* Staff Routes */}
        <Route path="/staff/login" element={<Login />} />
        <Route path="/staff/signup" element={<Signup />} />
        <Route path="/staff/dashboard" element={<Dashboard />} />

        {/* General Home */}
        <Route path="/" element={<GeneralHome />} />

        {/* Student Routes */}
        <Route path="/StudentRegister" element={<StudentRegister />} />
        <Route path="/StudentLogin" element={<StudentLogin />} />
        
        {/* Protected Routes with Navbar */}
        <Route
          path="/studentdashboard"
          element={
            <LayoutWithNavbar>
              <StudentDashboard />
            </LayoutWithNavbar>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
