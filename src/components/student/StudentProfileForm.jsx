// src/components/StudentProfileForm.jsx
import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const StudentProfileForm = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [studentSkills, setStudentSkills] = useState('');
  const [resumeFile, setResumeFile] = useState(null);

  const handleSkillsChange = (e) => {
    setStudentSkills(e.target.value);
  };

  const handleResumeUpload = (e) => {
    setResumeFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user?.id) {
      alert('User not loaded yet. Please wait.');
      return;
    }

    if (!studentSkills || !resumeFile) {
      alert('Please enter skills and upload resume.');
      return;
    }

    if (resumeFile.type !== 'application/pdf') {
      alert('Please upload a PDF file only.');
      return;
    }

    const formData = new FormData();
    formData.append('skills', studentSkills);
    formData.append('userId', user.id);
    formData.append('resume', resumeFile);

    try {
      const response = await fetch('http://localhost:5000/api/student/profile', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to submit profile data');
      }

      const result = await response.json();
      localStorage.setItem('studentSkills', studentSkills);
      alert('Profile submitted successfully');
      navigate('/student');
    } catch (error) {
      console.error('Submit error:', error);
      alert(`Error: ${error.message}`);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center min-h-screen p-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-white p-6 shadow rounded space-y-4"
      >
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
    </div>
  );
};

export default StudentProfileForm;
