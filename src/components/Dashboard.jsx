import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [studentSkills, setStudentSkills] = useState(localStorage.getItem('studentSkills') || '');
  const [resumeFile, setResumeFile] = useState(null);

  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    if (user?.role === 'student' && !localStorage.getItem('studentSkills')) {
      setShowForm(true);
    }
  }, [user]);

  const handleSkillsChange = (e) => {
    setStudentSkills(e.target.value);
  };

  const handleResumeUpload = (e) => {
    setResumeFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!studentSkills || !resumeFile) {
      alert('Please enter skills and upload resume.');
      return;
    }

    const formData = new FormData();
    if (!user?.id) {
  alert('User not loaded yet. Please wait.');
  return;
}

    formData.append('skills', studentSkills);
    formData.append('resume', resumeFile);
    formData.append('userId', user?.id); 

    try {
      const response = await fetch('http://localhost:5000/api/student/profile', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) throw new Error('Failed to submit profile data');

      localStorage.setItem('studentSkills', studentSkills);
      setShowForm(false);
      alert('Profile submitted successfully');
    } catch (error) {
      console.error(error);
      alert('Something went wrong. Please try again.');
    }
  };

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

      {user?.role === 'student' && showForm ? (
        <form onSubmit={handleSubmit} className="w-full max-w-md bg-white p-6 shadow rounded space-y-4">
          <h2 className="text-lg font-semibold">Complete Your Profile</h2>
          <div>
            <label className="block mb-1 font-medium">Skills (comma-separated)</label>
            <input
              type="text"
              value={studentSkills}
              onChange={handleSkillsChange}
              className="w-full px-3 py-2 border rounded"
              placeholder="e.g., React, Node.js"
              required
            />
          </div>
          <div>
            <label className="block mb-1 font-medium">Upload Resume (PDF)</label>
            <input
              type="file"
              accept="application/pdf"
              onChange={handleResumeUpload}
              className="w-full"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
          >
            Submit Profile
          </button>
        </form>
      ) : (
        <>
          <button
            onClick={handleRoleNavigation}
            className="px-6 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg shadow-md transition"
          >
            Go to {user?.role} Page
          </button>
        </>
      )}
    </div>
  );
};

export default Dashboard;
