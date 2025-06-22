import React, { useEffect, useState } from 'react';
import { User, Award, Upload, ArrowRight, BookOpen, Star, Zap } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';




const StudentProfileForm = () => {
  const { user: authUser } = useAuth();
  const userId = authUser?.id;
  console.log("user id : ", userId)
  const navigate = useNavigate();
  const [studentName, setStudentName] = useState('');
  const [studentSkills, setStudentSkills] = useState('');
  const [resumeFile, setResumeFile] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleNameChange = (e) => setStudentName(e.target.value);
  const handleSkillsChange = (e) => setStudentSkills(e.target.value);
  const handleResumeUpload = (e) => setResumeFile(e.target.files[0]);
const handleSubmit = async (e) => {
  e.preventDefault();
  setIsSubmitting(true);

  if ( !studentName || !studentSkills || !resumeFile) {

    toast.error("Please complete all fields and upload your resume")
    setIsSubmitting(false);
    return;
  }

  if (resumeFile.type !== 'application/pdf') {
    toast.error('Please upload a PDF file only.')
    setIsSubmitting(false);
    return;
  }

  const formData = new FormData();
  formData.append('name', studentName);
  formData.append('skills', studentSkills);
  formData.append('userId', userId);
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
    console.log('Server response:', data);

    sessionStorage.setItem('studentSkills', studentSkills);
    navigate('/student');
  } catch (error) {
    console.error('Submit error:', error);
    toast.error(`${error.message}`)
  } finally {
    setIsSubmitting(false);
  }
};


//   const users = JSON.parse(sessionStorage.getItem("user") || "{}");
//   console.log("user is ", users)
// const userId = users?.id
// console.log("user id is: ", userId)




  return (
    <div className="min-h-screen bg-[#3A83F6] p-4 relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-20 h-20 bg-[#3B82F6] rounded-full opacity-20 animate-pulse"></div>
        <div className="absolute top-40 right-20 w-16 h-16 bg-[#3B82F6] rounded-full opacity-20 animate-bounce"></div>
        <div className="absolute bottom-20 left-20 w-24 h-24 bg-[#3B82F6] rounded-full opacity-20 animate-pulse"></div>
        <div className="absolute bottom-40 right-10 w-12 h-12 bg-[#3B82F6] rounded-full opacity-20 animate-bounce"></div>
      </div>

      <div className="relative z-10 max-w-2xl mx-auto">
        <div className="text-center mb-12 animate-fade-in">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-[#F5EFEB] rounded-2xl mb-6 shadow-lg">
            <BookOpen className="w-10 h-10 text-[#C8D9E6]" />
          </div>
          <h1 className="text-4xl font-bold text-[#333] mb-4">
            Complete Your Profile
          </h1>
          <p className="text-gray-700 text-lg">
            Showcase your skills and stand out from the crowd
          </p>
          <div className="flex justify-center mt-4 space-x-2">
            <Star className="w-5 h-5 text-yellow-400 fill-current" />
            <Star className="w-5 h-5 text-yellow-400 fill-current" />
            <Star className="w-5 h-5 text-yellow-400 fill-current" />
          </div>
        </div>

        <form
          onSubmit={handleSubmit}
          className="bg-[#FEFBFF] rounded-3xl shadow-xl border border-[#C8D9E6] p-8"
        >
          <div className="space-y-8">
            <div>
              <label className="flex items-center text-lg font-semibold text-gray-700 mb-3">
                <div className="w-8 h-8 bg-[#C8D9E6] rounded-lg flex items-center justify-center mr-3 shadow-md">
                  <User className="w-4 h-4 text-white" />
                </div>
                Full Name
              </label>
              <input
                type="text"
                value={studentName}
                onChange={handleNameChange}
                className="w-full px-6 py-4 bg-white border-2 border-[#C8D9E6] rounded-2xl text-gray-800 text-lg placeholder-gray-500 focus:outline-none focus:border-[#F5EFEB] focus:shadow-lg"
                placeholder="Enter your full name"
                required
              />
            </div>

            <div>
              <label className="flex items-center text-lg font-semibold text-gray-700 mb-3">
                <div className="w-8 h-8 bg-[#C8D9E6] rounded-lg flex items-center justify-center mr-3 shadow-md">
                  <Award className="w-4 h-4 text-white" />
                </div>
                Skills (comma-separated)
              </label>
              <textarea
                value={studentSkills}
                onChange={handleSkillsChange}
                className="w-full px-6 py-4 bg-white border-2 border-[#C8D9E6] rounded-2xl text-gray-800 text-lg placeholder-gray-500 focus:outline-none focus:border-[#F5EFEB] focus:shadow-lg resize-none"
                placeholder="React, JavaScript, Python, Machine Learning..."
                rows="4"
                required
              />
              <p className="text-sm text-gray-500 mt-2 italic">
                💡 Add skills that make you unique and marketable
              </p>
            </div>

            <div>
              <label className="flex items-center text-lg font-semibold text-gray-700 mb-3">
                <div className="w-8 h-8 bg-[#C8D9E6] rounded-lg flex items-center justify-center mr-3 shadow-md">
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
                <div className="w-full px-6 py-8 bg-white border-2 border-dashed border-[#C8D9E6] rounded-2xl text-center hover:bg-[#F5EFEB] transition-all duration-300 shadow">
                  <Upload className="w-12 h-12 text-[#C8D9E6] mx-auto mb-4" />
                  <p className="text-lg text-gray-700 font-medium">
                    {resumeFile ? (
                      <span className="text-green-600">✅ {resumeFile.name}</span>
                    ) : (
                      <span className="text-[#C8D9E6]">Click to upload</span>
                    )}
                  </p>
                  <p className="text-sm text-gray-500 mt-2">PDF files only, max 10MB</p>
                </div>
              </div>
            </div>

            <div className="pt-6">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-[#C8D9E6] hover:bg-[#F5EFEB] text-[#333] font-bold py-5 px-8 rounded-2xl transition duration-300 flex items-center justify-center space-x-3 text-lg shadow-md disabled:opacity-50"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-6 h-6 border-2 border-[#333] border-t-transparent rounded-full animate-spin"></div>
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

        <div className="text-center mt-8 text-gray-700">
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
