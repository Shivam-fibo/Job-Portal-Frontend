// src/pages/Dashboard.jsx
import React, { useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user?.role === 'student' && !localStorage.getItem('studentSkills')) {
      navigate('/student/profile');
    }
  }, [user, navigate]);

  const handleRoleNavigation = () => {
    switch (user?.role) {
      case 'student':
        navigate('/student');
        break;
      case 'hod':
        navigate('/hod');
        break;
      case 'placement_officer':
        navigate('/placement');
        break;
      default:
        break;
    }
  };

  return (
    <div className='flex flex-col justify-center items-center min-h-screen space-y-6 p-4'>
      <h1 className='text-2xl font-bold'>Role is: {user?.role}</h1>
      <button
        onClick={handleRoleNavigation}
        className="px-6 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg shadow-md transition"
      >
        Go to {user?.role} Page
      </button>
    </div>
  );
};

export default Dashboard;
