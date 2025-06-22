import React, { useEffect, useState } from 'react';
import {
  Building2,
  MapPin,
  Clock,
  DollarSign,
  Calendar,
  Users,
  Briefcase,
  Star,
  TrendingUp,
  CheckCircle,
  AlertCircle,
  XCircle,
  ExternalLink,
  Target
} from 'lucide-react';
import getSimilarityScore from '../../util/getSimilarityScore';

const StudentJobBoard = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showATSModal, setShowATSModal] = useState(false);
  const [atsLoading, setATSLoading] = useState(false);
  const [atsScore, setATSScore] = useState(0);
  const [currentJob, setCurrentJob] = useState(null);

  const user = JSON.parse(sessionStorage.getItem("user"));
  let studentSkills = (sessionStorage.getItem("studentSkills") || (user?.skills ? user.skills.join(',') : '')) 
  console.log(user, "user")
  console.log(studentSkills, "studnet skilss are: ")
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/job/getAllJob', {
          credentials: 'include',
        });
        const data = await response.json();
        console.log(data)
        setJobs(data);
      } catch (error) {
        console.error('Failed to fetch jobs:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  const getATSScoreColor = (score) => {
    if (score >= 70) return 'text-green-600';
    if (score >= 50) return 'text-yellow-600';
    if (score >= 25) return 'text-orange-600';
    return 'text-red-600';
  };

  const getATSScoreIcon = (score) => {
    if (score >= 70) return <CheckCircle className="h-6 w-6 text-green-600" />;
    if (score >= 50) return <AlertCircle className="h-6 w-6 text-yellow-600" />;
    if (score >= 25) return <AlertCircle className="h-6 w-6 text-orange-600" />;
    return <XCircle className="h-6 w-6 text-red-600" />;
  };

  const getATSMessage = (score) => {
    if (score >= 70) return {
      title: "Excellent Match!",
      message: "Your skills align perfectly with this job. You're ready to apply!"
    };
    if (score >= 50) return {
      title: "Good Match",
      message: "You have most required skills. Consider highlighting relevant experience in your application."
    };
    if (score >= 25) return {
      title: "Moderate Match",
      message: "You meet some requirements. Focus on transferable skills and show willingness to learn."
    };
    return {
      title: "Skills Gap Identified",
      message: "Consider developing the required skills before applying, or emphasize your learning ability."
    };
  };

  const handleApplyClick = async (job) => {
    setCurrentJob(job);
    setShowATSModal(true);
    setATSLoading(true);

    try {
      const applyToJob = await fetch("http://localhost:5000/api/application/apply", {
        method: "POST",
        body: JSON.stringify({ jobId: job._id, studentId: user?.id }),
        headers: {
          "Content-type": "application/json"
        },
        credentials: 'include',
      });
      await applyToJob.json();

      // const studentSkills = sessionStorage.getItem('studentSkills') || '';
      studentSkills = studentSkills.replace(/,/g, " "); 
      console.log("student: ", studentSkills)
      const jobText = `${(job.skillsRequired || []).join(', ')}`;
      let score = await getSimilarityScore(studentSkills, jobText);
      console.log("the score of ats is: ", score)
      if (score !== null && score != undefined) {
        let atsScore = Math.max(0, Math.min(100, (score * 100).toFixed(2)));
        console.log(atsScore, "ats score is: ")
        setATSScore(atsScore);
      } else {
        setATSScore(0);
      }
    } catch (error) {
      console.error('Error applying to job:', error);
      setATSScore(0);
    } finally {
      setATSLoading(false);
    }
  };

  const handleProceedToApplication = () => {
    console.log("application link is: ", currentJob?.applicationLink)
    if (currentJob?.applicationLink) {
      window.open(currentJob.applicationLink, '_blank');
    }
    setShowATSModal(false);
    setCurrentJob(null);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#C8D9E6]">
        <div className="text-center p-8 bg-[#FFFFFF] rounded-2xl shadow-xl border border-[#F5EFEB]">
          <div className="animate-spin h-12 w-12 border-b-4 border-[#C8D9E6] rounded-full mx-auto mb-6"></div>
          <h3 className="text-xl font-semibold text-[#444] mb-2">Loading Opportunities</h3>
          <p className="text-[#666]">Discovering the perfect roles for you...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F5EFEB] via-[#FFFFFF] to-[#C8D9E6]">
      <div className="bg-[#FFFFFF] border-b border-[#C8D9E6] shadow-sm">
        <div className="max-w-7xl mx-auto px-8 py-12 text-center">
          <h1 className="text-4xl font-bold text-[#222] mb-4">Career Opportunities</h1>
          <p className="text-lg text-[#444] max-w-2xl mx-auto">
            Discover exciting positions tailored to your skills and aspirations. Each opportunity is carefully curated to match your career goals.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-8 py-12">
        {jobs.length === 0 ? (
          <div className="text-center py-16">
            <Briefcase className="h-16 w-16 text-[#999] mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-[#555] mb-2">No Opportunities Available</h3>
            <p className="text-[#777]">Check back soon for new exciting positions!</p>
          </div>
        ) : (
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {jobs.map((job) => (
              <div key={job._id} className="group bg-[#FFFFFF] rounded-2xl border border-[#C8D9E6] shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1 overflow-hidden">
                <div className="bg-[#3B82F6] p-6 text-[#222]">
                  <div className="flex items-start justify-between mb-3">
                    <Briefcase className="h-8 w-8 text-[#F5EFEB]" />
                    <span className="text-xs font-medium bg-[#FFFFFF]/20 px-2 py-1 rounded-full">{job.employmentType}</span>
                  </div>
                  <h2 className="text-xl font-bold mb-2 line-clamp-2">{job.jobTitle}</h2>
                  <div className="flex items-center text-[#333]">
                    <Building2 className="h-4 w-4 mr-2" />
                    <span className="font-medium">{job.companyName}</span>
                  </div>
                </div>

                <div className="p-6 space-y-4">
                  <p className="text-[#444] text-sm leading-relaxed line-clamp-3">{job.jobDescription}</p>
                  <div className="grid grid-cols-2 gap-4 text-sm text-[#555]">
                    <div className="flex items-center">
                      <MapPin className="h-4 w-4 mr-2 text-[#999]" />
                      <span>{job.companyLocation}</span>
                    </div>
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-2 text-[#999]" />
                      <span>{job.duration} months</span>
                    </div>
                    <div className="flex items-center">
                      <DollarSign className="h-4 w-4 mr-2 text-[#999]" />
                      <span className="font-semibold">₹{job.salary}</span>
                    </div>
                    <div className="flex items-center">
                      <Users className="h-4 w-4 mr-2 text-[#999]" />
                      <span>{job.experienceLevel}</span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center text-[#333]">
                      <Star className="h-4 w-4 mr-2 text-yellow-500" />
                      <span className="font-medium text-sm">Required Skills</span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {job.skillsRequired?.slice(0, 4).map((skill, index) => (
                        <span key={index} className="px-3 py-1 bg-[#F5EFEB] text-[#333] rounded-full text-xs font-medium border border-[#C8D9E6]">
                          {skill}
                        </span>
                      ))}
                      {job.skillsRequired?.length > 4 && (
                        <span className="px-3 py-1 bg-[#C8D9E6] text-[#444] rounded-full text-xs font-medium">
                          +{job.skillsRequired.length - 4} more
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-xs text-[#666] pt-4 border-t border-[#EEE]">
                    <div className="flex items-center">
                      <Calendar className="h-3 w-3 mr-1" />
                      Posted: {new Date(job.createdAt).toLocaleDateString()}
                    </div>
                    <div className="flex items-center">
                      <Calendar className="h-3 w-3 mr-1" />
                      Deadline: {new Date(job.deadline).toLocaleDateString()}
                    </div>
                  </div>

                  <button
                    onClick={() => handleApplyClick(job)}
                    className="w-full mt-6 bg-[#3B82F6] ] text-[#222] font-semibold py-3 px-6 rounded-xl transition-all duration-200 transform hover:scale-105"
                  >
                    <span>Apply Now</span>
                    <TrendingUp className="h-4 w-4 ml-2" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {showATSModal && (
        <div className="fixed inset-0 bg-[#3B82F6] bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-[#FFFFFF] rounded-2xl shadow-2xl max-w-md w-full mx-4 overflow-hidden">
            {atsLoading ? (
              <div className="p-8 text-center">
                <div className="animate-spin h-12 w-12 border-b-4 border-[#C8D9E6] rounded-full mx-auto mb-6"></div>
                <h3 className="text-xl font-semibold text-[#444] mb-2">Analyzing Your Profile</h3>
                <p className="text-[#777] ">Calculating your ATS compatibility score...</p>
              </div>
            ) : (
              <>
                <div className="bg-[#ffb832]  p-6 text-[#222]">
                  <div className="flex items-center justify-center mb-4">
                    <Target className="h-8 w-8 mr-3" />
                    <h3 className="text-xl font-bold">ATS Compatibility Score</h3>
                  </div>
                </div>

                <div className="p-6">
                  <div className="text-center mb-6">
                    <div className="flex items-center justify-center mb-4">
                      {getATSScoreIcon(atsScore)}
                      <span className={`text-4xl font-bold ml-3 ${getATSScoreColor(atsScore)}`}>{atsScore}%</span>
                    </div>
                    <h4 className="text-lg font-semibold text-[#333] mb-2">{getATSMessage(atsScore).title}</h4>
                    <p className="text-[#555] text-sm">{getATSMessage(atsScore).message}</p>
                  </div>

                  <div className="mb-6">
                    <div className="w-full bg-[#F5EFEB] rounded-full h-3">
                      <div
                        className={`h-3 rounded-full transition-all duration-500 ${
                          atsScore >= 70 ? 'bg-green-500' :
                          atsScore >= 50 ? 'bg-yellow-500' :
                          atsScore >= 25 ? 'bg-orange-500' : 'bg-red-500'
                        }`}
                        style={{ width: `${atsScore}%` }}
                      ></div>
                    </div>
                    <div className="flex justify-between text-xs text-[#888] mt-2">
                      <span>0%</span><span>25%</span><span>50%</span><span>75%</span><span>100%</span>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <button onClick={() => setShowATSModal(false)} className="flex-1 bg-[#F5EFEB] hover:bg-[#e8ddd8] text-[#333] font-medium py-3 px-4 rounded-xl transition-colors">
                      Close
                    </button>
                    <button onClick={handleProceedToApplication} className="flex-1 bg-[#FEB833] text-[#222] font-semibold py-3 px-4 rounded-xl transition-colors flex items-center justify-center">
                      <span>Proceed</span>
                      <ExternalLink className="h-4 w-4 ml-2" />
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default StudentJobBoard;
