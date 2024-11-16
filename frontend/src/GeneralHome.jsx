import React from 'react';
import { Link } from 'react-router-dom';

const GeneralHome = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center items-center px-6">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-md w-full text-center">
        <h1 className="text-3xl font-semibold text-gray-800 mb-4">Welcome to Our Portal</h1>
        <p className="text-gray-600 mb-6">
          Select your role to access the services tailored for you.
        </p>
        <div className="flex justify-center gap-4 flex-wrap">
          <Link
            to="/StudentLogin"
            className="px-6 py-2 text-white bg-blue-600 hover:bg-blue-700 rounded-md text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            I am a Student
          </Link>
        </div>
       
      </div>
    </div>
  );
};

export default GeneralHome;