import React, { useEffect, useState } from 'react';
import getSimilarityScore from '../../util/getSimilarityScore';

const StudentJobBoard = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/job/getAllJob');
        const data = await response.json();
        setJobs(data);
      } catch (error) {
        console.error('Failed to fetch jobs:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  const handleApplyClick = async (job) => {
    const studentSkills = localStorage.getItem('studentSkills') || '';
    const jobText = `${(job.skillsRequired || []).join(', ')}`;
    let score = await getSimilarityScore(studentSkills, jobText);

    if (score !== null) {
      let atsScore = (score * 1000).toFixed(2)
      if(atsScore > 100)
          atsScore = 100;
      else if(atsScore < 100){
          atsScore = 0;
      }
      else if (atsScore == NaN){
        atsScore = 0;
      }
      alert(`📊 ATS Match Score: ${atsScore}%`);
      window.open(job.applicationLink, '_blank');
    } else {
      alert('Failed to compute similarity score.');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin h-10 w-10 border-b-2 border-blue-600 rounded-full mx-auto mb-4"></div>
          <p className="text-gray-600">Loading jobs...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-blue-50 p-8">
      <h1 className="text-3xl font-bold text-blue-700 mb-6 text-center">Available Job Listings</h1>

      {jobs.length === 0 ? (
        <p className="text-center text-gray-500">No jobs available at the moment.</p>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {jobs.map((job) => (
            <div
              key={job._id}
              className="bg-white shadow-md rounded-xl p-6 border border-blue-100 hover:shadow-lg transition"
            >
              <h2 className="text-xl font-semibold text-blue-800 mb-2">{job.jobTitle}</h2>
              <p className="text-gray-700 mb-2"><strong>Description:</strong> {job.jobDescription}</p>
              <p className="text-gray-700 mb-2"><strong>Company:</strong> {job.companyName}</p>
              <p className="text-gray-700 mb-2"><strong>Location:</strong> {job.companyLocation}</p>
              <p className="text-gray-700 mb-2"><strong>Employment Type:</strong> {job.employmentType}</p>
              <p className="text-gray-700 mb-2"><strong>Job Type:</strong> {job.jobType}</p>
              <p className="text-gray-700 mb-2"><strong>Experience Level:</strong> {job.experienceLevel}</p>
              <p className="text-gray-700 mb-2"><strong>Duration:</strong> {job.duration} months</p>
              <p className="text-gray-700 mb-2"><strong>Salary:</strong> ₹{job.salary}</p>
              <p className="text-gray-700 mb-2">
                <strong>Skills Required:</strong> {job.skillsRequired && job.skillsRequired.length > 0 ? job.skillsRequired.join(', ') : 'Not specified'}
              </p>
              <p className="text-gray-500 text-sm mb-2">
                Posted on: {new Date(job.createdAt).toLocaleDateString()}
              </p>
              <p className="text-gray-500 text-sm mb-4">
                Application Deadline: {new Date(job.deadline).toLocaleDateString()}
              </p>

              <button
                onClick={() => handleApplyClick(job)}
                className="inline-block px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
              >
                Apply Now
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default StudentJobBoard;
