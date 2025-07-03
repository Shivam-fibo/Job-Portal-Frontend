import React, { useEffect, useState } from 'react';
import { User, Award, Upload, ArrowRight, BookOpen, Star, Zap, ShieldAlert } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const StudentProfileForm = () => {
  const { user: authUser } = useAuth();
  const navigate = useNavigate();
  const [studentName, setStudentName] = useState('');
  const [studentSkills, setStudentSkills] = useState('');
  const [resumeFile, setResumeFile] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Check if user is a student
  if (authUser?.role !== 'student') {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-blue-50 p-6 text-center">
        <ShieldAlert className="h-16 w-16 text-red-600 mb-4" />
        <h1 className="text-2xl font-bold text-red-700 mb-2">Access Denied</h1>
        <p className="text-lg text-gray-700">This page is for students only.</p>
        <button
          onClick={() => navigate('/dashboard')}
          className="mt-6 bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-2.5 rounded-lg shadow transition-all"
        >
          Return to Dashboard
        </button>
      </div>
    );
  }

  // Student color configuration (blue theme)
  const colors = {
    primary: 'bg-gradient-to-b from-blue-600 to-blue-700',
    secondary: 'bg-blue-100',
    accent: 'bg-blue-600',
    text: 'text-blue-700',
    border: 'border-blue-400',
    button: 'bg-blue-600 hover:bg-blue-700 text-white',
    card: 'bg-white'
  };

  const handleNameChange = (e) => setStudentName(e.target.value);
  const handleSkillsChange = (e) => setStudentSkills(e.target.value);
  const handleResumeUpload = (e) => setResumeFile(e.target.files[0]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (!studentName || !studentSkills || !resumeFile) {
      toast.error("Please complete all fields and upload your resume");
      setIsSubmitting(false);
      return;
    }

    if (resumeFile.type !== 'application/pdf') {
      toast.error('Please upload a PDF file only.');
      setIsSubmitting(false);
      return;
    }

    const formData = new FormData();
    formData.append('name', studentName);
    formData.append('skills', studentSkills);
    formData.append('userId', authUser.id);
    formData.append('resume', resumeFile);

    try {
      const res = await fetch('http://localhost:5000/api/student/profile', {
        method: 'POST',
        credentials: 'include',
        body: formData,
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || 'Failed to submit profile');
      }

      const data = await res.json();
      sessionStorage.setItem('studentSkills', studentSkills);
      toast.success('Profile created successfully!');
      navigate('/student');
    } catch (error) {
      console.error('Submit error:', error);
      toast.error(error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={`min-h-screen ${colors.secondary} p-4 relative overflow-hidden`}>
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-20 h-20 bg-blue-200 rounded-full opacity-20 animate-pulse"></div>
        <div className="absolute top-40 right-20 w-16 h-16 bg-blue-200 rounded-full opacity-20 animate-bounce"></div>
        <div className="absolute bottom-20 left-20 w-24 h-24 bg-blue-200 rounded-full opacity-20 animate-pulse"></div>
        <div className="absolute bottom-40 right-10 w-12 h-12 bg-blue-200 rounded-full opacity-20 animate-bounce"></div>
      </div>

      <div className="relative z-10 max-w-2xl mx-auto">
        {/* Header section */}
        <div className="text-center mb-12 animate-fade-in">
          <div className={`inline-flex items-center justify-center w-20 h-20 ${colors.accent} rounded-2xl mb-6 shadow-lg`}>
            <BookOpen className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            Complete Your Profile
          </h1>
          <p className="text-gray-600 text-lg">
            Showcase your skills and stand out from the crowd
          </p>
          <div className="flex justify-center mt-4 space-x-2">
            <Star className="w-5 h-5 text-yellow-400 fill-current" />
            <Star className="w-5 h-5 text-yellow-400 fill-current" />
            <Star className="w-5 h-5 text-yellow-400 fill-current" />
          </div>
        </div>

        {/* Form section */}
        <form
          onSubmit={handleSubmit}
          className={`${colors.card} rounded-3xl shadow-xl border ${colors.border} p-8`}
        >
          <div className="space-y-8">
            {/* Name field */}
            <div>
              <label className="flex items-center text-lg font-semibold text-gray-700 mb-3">
                <div className={`w-8 h-8 ${colors.accent} rounded-lg flex items-center justify-center mr-3 shadow-md`}>
                  <User className="w-4 h-4 text-white" />
                </div>
                Full Name
              </label>
              <input
                type="text"
                value={studentName}
                onChange={handleNameChange}
                className="w-full px-6 py-4 bg-white border-2 border-blue-100 rounded-2xl text-gray-800 text-lg placeholder-gray-400 focus:outline-none focus:border-blue-300 focus:ring-2 focus:ring-blue-200"
                placeholder="Enter your full name"
                required
              />
            </div>

            {/* Skills field */}
            <div>
              <label className="flex items-center text-lg font-semibold text-gray-700 mb-3">
                <div className={`w-8 h-8 ${colors.accent} rounded-lg flex items-center justify-center mr-3 shadow-md`}>
                  <Award className="w-4 h-4 text-white" />
                </div>
                Skills (comma-separated)
              </label>
              <textarea
                value={studentSkills}
                onChange={handleSkillsChange}
                className="w-full px-6 py-4 bg-white border-2 border-blue-100 rounded-2xl text-gray-800 text-lg placeholder-gray-400 focus:outline-none focus:border-blue-300 focus:ring-2 focus:ring-blue-200 resize-none"
                placeholder="React, JavaScript, Python, Machine Learning..."
                rows="4"
                required
              />
              <p className="text-sm text-gray-500 mt-2">
                💡 Add skills that make you unique and marketable
              </p>
            </div>

            {/* Resume upload */}
            <div>
              <label className="flex items-center text-lg font-semibold text-gray-700 mb-3">
                <div className={`w-8 h-8 ${colors.accent} rounded-lg flex items-center justify-center mr-3 shadow-md`}>
                  <Upload className="w-4 h-4 text-white" />
                </div>
                Upload Resume (PDF)
              </label>
              <div className="relative">
                <input
                  type="file"
                  accept=".pdf"
                  onChange={handleResumeUpload}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                  required
                />
                <div className={`w-full px-6 py-8 bg-white border-2 border-dashed ${colors.border} rounded-2xl text-center hover:bg-blue-50 transition-all duration-300 shadow`}>
                  <Upload className="w-12 h-12 text-blue-300 mx-auto mb-4" />
                  <p className="text-lg text-gray-700 font-medium">
                    {resumeFile ? (
                      <span className="text-green-600">✅ {resumeFile.name}</span>
                    ) : (
                      <span className="text-blue-400">Click to upload</span>
                    )}
                  </p>
                  <p className="text-sm text-gray-500 mt-2">PDF files only, max 10MB</p>
                </div>
              </div>
            </div>

            {/* Submit button */}
            <div className="pt-6">
              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full ${colors.button} font-bold py-5 px-8 rounded-2xl transition duration-300 flex items-center justify-center space-x-3 text-lg shadow-md disabled:opacity-50`}
              >
                {isSubmitting ? (
                  <>
                    <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Submitting...</span>
                  </>
                ) : (
                  <>
                    <Zap className="w-6 h-6" />
                    <span>Submit Profile</span>
                    <ArrowRight className="w-6 h-6" />
                  </>
                )}
              </button>
            </div>
          </div>
        </form>

        {/* Footer */}
        <div className="text-center mt-8 text-gray-600">
          <p className="flex items-center justify-center space-x-2">
            <span>✨ Your journey to success starts here</span>
            <Star className="w-4 h-4 text-yellow-400 fill-current" />
          </p>
        </div>
      </div>
    </div>
  );
};

export default StudentProfileForm;