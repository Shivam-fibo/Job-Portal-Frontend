import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import toast from 'react-hot-toast';

const StudentLandingPage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [jobs, setJobs] = useState([]);
  const [checkedJobs, setCheckedJobs] = useState({});
  const [hasProfile, setHasProfile] = useState(false);
  const [loading, setLoading] = useState(true);
  const [studentProfile, setStudentProfile] = useState(null);

  useEffect(() => {
    const checkStudentProfile = async () => {
      if (!user?.id) return;
      
      try {
        const response = await fetch(
          `http://localhost:5000/api/student/profile/${user.id}`
        );
        const data = await response.json();
        setHasProfile(data.exists);
        if (data.exists) {
          setStudentProfile(data.profile);
        }
      } catch (error) {
        console.error('Failed to check profile:', error);
        setHasProfile(false);
      } finally {
        setLoading(false);
      }
    };

    checkStudentProfile();
  }, [user?.id]);

  // Redirect if profile is not created
  useEffect(() => {
    if (!loading && !hasProfile) {
      
      navigate('/student/profile');
    }
  }, [loading, hasProfile, navigate]);

  useEffect(() => {
    const fetchAllClickedJobs = async () => {
      if (!user?.id) return;
      
      try {
        const response = await fetch(
          `http://localhost:5000/api/application/status/${user.id}`
        );
        const data = await response.json();
        setJobs(data.jobs || []);
      } catch (error) {
        console.error('Failed to fetch clicked jobs:', error);
      }
    };

    if (hasProfile) {
      fetchAllClickedJobs();
    }
  }, [user?.id, hasProfile]);

  const handleJobOpening = () => {
    if (!hasProfile) {
      navigate('/student/profile');
      return;
    }
    navigate('/jobs/opening');
  };

  const handleProfileAction = () => {
    navigate('/student/profile');
  };

  const handleCheckboxChange = async (jobId, checked) => {
    setCheckedJobs((prev) => ({ ...prev, [jobId]: checked }));

    try {
      const res = await fetch(
        'http://localhost:5000/api/application/update-status',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            jobId,
            studentId: user?.id,
            status: 'applied',
          }),
        }
      );
      const result = await res.json();
      console.log('Status updated:', result);
    } catch (err) {
      console.error('Failed to update status:', err);
    }
  };

  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-indigo-50 via-white to-pink-50 py-10 px-6">
      {loading ? (
        <div className="w-full text-center py-16">
          <p className="text-gray-500 text-lg">Loading...</p>
        </div>
      ) : (
        <div className="w-full mb-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <h1 className="text-4xl font-extrabold text-gray-800 mb-4 md:mb-0">
              🚀 Clicked Jobs
            </h1>
            <div className="space-x-4">
              <button
                onClick={handleProfileAction}
                className="inline-flex items-center gap-2 bg-gradient-to-r from-green-600 to-teal-600 hover:from-green-700 hover:to-teal-700 text-white font-semibold px-5 py-2 rounded-xl shadow-lg transition transform hover:scale-105 duration-200"
              >
                {hasProfile ? 'Update Profile' : 'Create Profile'}
              </button>
              <button
                onClick={handleJobOpening}
                disabled={!hasProfile}
                className={`inline-flex items-center gap-2 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-semibold px-5 py-2 rounded-xl shadow-lg transition transform hover:scale-105 duration-200 ${
                  !hasProfile ? 'opacity-50 cursor-not-allowed' : ''
                }`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 4v16m8-8H4"
                  />
                </svg>
                View Job Openings
              </button>
            </div>
            <div className="mt-2 h-1 w-32 bg-indigo-600 rounded-full shadow-sm animate-pulse"></div>
          </div>

          {/* Job Cards List */}
          <div className="w-full space-y-6">
            {jobs.map((job) => (
              <div
                key={job._id}
                className="w-full flex flex-col md:flex-row justify-between bg-white border-l-4 border-indigo-400 rounded-xl shadow-md hover:shadow-xl transition transform hover:-translate-y-1 duration-200 overflow-hidden"
              >
                <div className="flex-1 p-6">
                  <h2 className="text-2xl font-semibold text-gray-900 mb-1">
                    {job.jobTitle}
                  </h2>
                  <p className="text-sm text-gray-600 mb-2">
                    {job.companyName} — {job.companyLocation}
                  </p>
                  <div className="flex flex-wrap gap-3">
                    <span className="inline-block bg-indigo-100 text-indigo-800 text-xs font-medium px-2 py-1 rounded-full">
                      {job.jobType.charAt(0).toUpperCase() + job.jobType.slice(1)}
                    </span>
                    <span className="inline-block bg-purple-100 text-purple-800 text-xs font-medium px-2 py-1 rounded-full">
                      {job.experienceLevel}
                    </span>
                  </div>
                </div>
                <div className="flex items-center px-6 pb-6 md:pb-0 md:px-4">
                  <label className="flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={!!checkedJobs[job._id]}
                      onChange={(e) =>
                        handleCheckboxChange(job._id, e.target.checked)
                      }
                      className="w-6 h-6 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500 transition"
                    />
                    <span className="ml-2 text-gray-700 font-medium">Applied</span>
                  </label>
                </div>
              </div>
            ))}

            {jobs.length === 0 && (
              <div className="w-full text-center py-16">
                <p className="text-gray-500 text-lg"
                
                >
                  You haven't clicked any jobs yet. Click "View Job Openings" to
                  explore opportunities!
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default StudentLandingPage;
