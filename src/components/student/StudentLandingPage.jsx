import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import toast from 'react-hot-toast';
import { Briefcase, User, Plus, Loader2, CheckCircle, Building2 } from 'lucide-react';

const StudentLandingPage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [jobs, setJobs] = useState([]);
  const [checkedJobs, setCheckedJobs] = useState({});
  const [hasProfile, setHasProfile] = useState(false);
  const [loading, setLoading] = useState(true);
  const [studentProfile, setStudentProfile] = useState(null);

  // Student color configuration (blue theme)
  const colors = {
    topColor: "bg-gradient-to-b from-blue-600 to-blue-700",
    middleColor: "bg-white",
    bottomColor: "bg-blue-50",
    cardColor: "bg-white",
    textColor: "text-blue-700",
    buttonPrimary: "bg-blue-600 hover:bg-blue-700 text-white",
    buttonSecondary: "bg-white text-blue-700 border border-blue-300 hover:bg-blue-50",
    borderColor: "border-blue-400"
  };

  const checkStudentProfile = async () => {
    if (!user?.id) return;
    
    try {
      const response = await fetch(
        `https://job-portal-backend-ivory.vercel.app/api/student/profile/${user.id}`, {
          credentials: 'include',
        });
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

  useEffect(() => {
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
          `https://job-portal-backend-ivory.vercel.app/api/application/status/${user.id}`, {
            credentials: 'include',
          });
        const data = await response.json();
        setJobs(data.jobs || []);
        
        // Initialize checked jobs state
        const checkedState = {};
        data.jobs?.forEach(job => {
          if (job.status === 'applied') {
            checkedState[job._id] = true;
          }
        });
        setCheckedJobs(checkedState);
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
        'https://job-portal-backend-ivory.vercel.app/api/application/update-status',
        {
          method: 'POST',
          credentials: 'include',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            jobId,
            studentId: user?.id,
            status: checked ? 'applied' : 'clicked',
          }),
        }
      );
      const result = await res.json();
      if (res.ok) {
        toast.success(checked ? 'Application submitted!' : 'Application removed');
      } else {
        throw new Error(result.message || 'Failed to update status');
      }
    } catch (err) {
      console.error('Failed to update status:', err);
      toast.error(err.message || 'Failed to update application status');
      // Revert checkbox state on error
      setCheckedJobs((prev) => ({ ...prev, [jobId]: !checked }));
    }
  };

  return (
    <div className={`min-h-screen ${colors.bottomColor} py-8 px-4 sm:px-6`}>
      {loading ? (
        <div className="flex flex-col items-center justify-center h-[60vh]">
          <Loader2 className="h-12 w-12 animate-spin text-blue-600 mb-4" />
          <p className="text-gray-600">Loading your dashboard...</p>
        </div>
      ) : (
        <div className="max-w-6xl mx-auto">
          {/* Header Section */}
          <div className="mb-8">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
              <div>
                <h1 className="text-3xl font-bold text-gray-800 mb-2 flex items-center gap-3">
                  <Briefcase className="h-8 w-8 text-blue-600" />
                  My Job Applications
                </h1>
                <p className="text-gray-600">
                  {jobs.length > 0 
                    ? `You have ${jobs.length} saved ${jobs.length === 1 ? 'opportunity' : 'opportunities'}`
                    : 'Start exploring job opportunities'}
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
                <button
                  onClick={handleProfileAction}
                  className={`flex items-center gap-2 ${colors.buttonPrimary} font-medium px-5 py-2.5 rounded-lg shadow transition-all`}
                >
                  <User className="h-5 w-5" />
                  {hasProfile ? 'Update Profile' : 'Create Profile'}
                </button>
                
                <button
                  onClick={handleJobOpening}
                  disabled={!hasProfile}
                  className={`flex items-center gap-2 ${colors.buttonSecondary} font-medium px-5 py-2.5 rounded-lg shadow transition-all ${
                    !hasProfile ? 'opacity-70 cursor-not-allowed' : 'hover:shadow-md'
                  }`}
                >
                  <Plus className="h-5 w-5" />
                  View Job Openings
                </button>
              </div>
            </div>
            
            <div className={`h-1 w-full ${colors.middleColor} rounded-full`}>
              <div className={`h-full ${colors.topColor} rounded-full w-24 animate-pulse`}></div>
            </div>
          </div>

          {/* Job Cards List */}
          <div className="space-y-4">
            {jobs.length > 0 ? (
              jobs.map((job) => (
                <div
                  key={job._id}
                  className={`w-full flex flex-col md:flex-row justify-between ${colors.cardColor} border-l-4 ${colors.borderColor} rounded-lg shadow-sm hover:shadow-md transition-all overflow-hidden`}
                >
                  <div className="flex-1 p-5">
                    <div className="flex items-start gap-4">
                      <div className={`p-3 rounded-lg ${colors.bottomColor}`}>
                        <Building2 className="h-6 w-6 text-blue-600" />
                      </div>
                      <div>
                        <h2 className="text-xl font-semibold text-gray-800 mb-1">
                          {job.jobTitle}
                        </h2>
                        <p className="text-gray-600 mb-3">
                          {job.companyName} • {job.companyLocation}
                        </p>
                        <div className="flex flex-wrap gap-2">
                          <span className={`px-3 py-1 ${colors.bottomColor} text-blue-800 text-sm font-medium rounded-full`}>
                            {job.jobType}
                          </span>
                          <span className="px-3 py-1 bg-purple-100 text-purple-800 text-sm font-medium rounded-full">
                            {job.experienceLevel}
                          </span>
                          {job.salary && (
                            <span className="px-3 py-1 bg-green-100 text-green-800 text-sm font-medium rounded-full">
                              {job.salary}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-center p-5 md:p-0 md:pr-5">
                    <label className="flex items-center cursor-pointer group">
                      <div className={`relative w-10 h-5 rounded-full ${checkedJobs[job._id] ? 'bg-blue-600' : 'bg-gray-300'} transition-colors`}>
                        <input
                          type="checkbox"
                          checked={!!checkedJobs[job._id]}
                          onChange={(e) => handleCheckboxChange(job._id, e.target.checked)}
                          className="absolute opacity-0 w-0 h-0"
                        />
                        <span className={`absolute top-0.5 left-0.5 w-4 h-4 bg-white rounded-full transition-transform ${
                          checkedJobs[job._id] ? 'transform translate-x-5' : ''
                        }`}></span>
                      </div>
                      <span className="ml-3 text-gray-700 font-medium flex items-center gap-1">
                        {checkedJobs[job._id] ? (
                          <>
                            <CheckCircle className="h-4 w-4 text-blue-600" />
                            Applied
                          </>
                        ) : (
                          'Mark as Applied'
                        )}
                      </span>
                    </label>
                  </div>
                </div>
              ))
            ) : (
              <div className={`flex flex-col items-center justify-center py-16 ${colors.middleColor} rounded-xl shadow-sm`}>
                <Briefcase className="h-16 w-16 text-gray-300 mb-4" />
                <h3 className="text-xl font-medium text-gray-600 mb-2">No saved jobs yet</h3>
                <p className="text-gray-500 text-center max-w-md px-4">
                  You haven't saved any job openings yet. Click "View Job Openings" to explore opportunities!
                </p>
                <button
                  onClick={handleJobOpening}
                  className={`mt-6 ${colors.buttonPrimary} font-medium px-6 py-2.5 rounded-lg shadow transition-all flex items-center gap-2`}
                >
                  <Plus className="h-5 w-5" />
                  Browse Jobs
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default StudentLandingPage;