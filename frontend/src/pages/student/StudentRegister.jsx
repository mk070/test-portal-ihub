import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const StudentRegister = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    collegename: '',
    dept: '',
    regno: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    
    try {
      const response = await axios.post('http://localhost:5000/api/register', formData);
      
      if (response.status === 200) {
        alert('Registration successful! Please log in.');
        navigate('/StudentLogin');
      }
    } catch (error) {
      if (error.code === 'ERR_NETWORK') {
        alert('Cannot connect to server. Please make sure the server is running.');
      } else {
        console.error('Registration error:', error);
        alert(error.response?.data?.message || 'Registration failed. Please try again.');
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-6">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-md w-full">
        <h1 className="text-2xl font-semibold text-gray-800 text-center mb-6">Student Register</h1>
        <form onSubmit={handleRegister} className="space-y-4">
          <div className="flex flex-col">
            <label htmlFor="name" className="mb-1 text-sm font-medium text-gray-600">
              Name:
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="px-3 py-2 border rounded-md shadow-sm border-gray-300 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="college1" className="mb-1 text-sm font-medium text-gray-600">
              College:
            </label>
            <input
              type="text"
              id="college"
              name="college"
              value={formData.college}
              onChange={handleChange}
              required
              className="px-3 py-2 border rounded-md shadow-sm border-gray-300 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="dept" className="mb-1 text-sm font-medium text-gray-600">
              Department:
            </label>
            <input
              type="text"
              id="dept"
              name="dept"
              value={formData.dept}
              onChange={handleChange}
              required
              className="px-3 py-2 border rounded-md shadow-sm border-gray-300 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="reg" className="mb-1 text-sm font-medium text-gray-600">
              Register No:
            </label>
            <input
              type="number"
              id="reg"
              name="reg"
              value={formData.reg}
              onChange={handleChange}
              required
              className="px-3 py-2 border rounded-md shadow-sm border-gray-300 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
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
            Register
          </button>
          <div className="mt-4 text-sm text-gray-600">
            Already Registered? <Link to="/StudentLogin" className="text-blue-600 hover:text-blue-700">Login..</Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default StudentRegister;