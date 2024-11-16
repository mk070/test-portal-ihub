import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import axios from 'axios';

const StudentLogin = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/login', formData, {
        headers: { 'Content-Type': 'application/json' }
      });

      if (response.status === 200) {
        navigate('/student-dashboard'); // Redirect to the student dashboard on successful login
      }
    } catch (error) {
      console.error('Error:', error);
      alert(error.response?.data?.message || 'An error occurred during login.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-6">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-md w-full">
        <h1 className="text-2xl font-semibold text-gray-800 text-center mb-6">Student Login</h1>
        <form onSubmit={handleLogin} className="space-y-4">
          <div className="flex flex-col">
            <label htmlFor="email" className="mb-1 text-sm font-medium text-gray-600">
              Email:
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="px-3 py-2 border rounded-md shadow-sm border-gray-300 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="password" className="mb-1 text-sm font-medium text-gray-600">
              Password:
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="px-3 py-2 border rounded-md shadow-sm border-gray-300 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1"
          >
            Login
          </button>

          <div className="mt-4 text-sm text-gray-600">
            New student? <Link to="/StudentRegister" className="text-blue-600 hover:text-blue-700">Register here</Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default StudentLogin;