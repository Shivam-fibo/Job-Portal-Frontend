import React, { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
const HodOfficerJob = () => {
      const user = JSON.parse(sessionStorage.getItem("user") || "{}");
    const role = user?.role
  const [formData, setFormData] = useState({
    jobTitle: '',
    jobDescription: '',
    jobType: 'onsite',
    employmentType: 'full-time',
    experienceLevel: '',
    companyName: '',
    companyLocation: '',
    salary: '',
    duration: '',
    skillsRequired: '',
    applicationLink: '',
    deadline: '',
  });
const navigate = useNavigate()
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      ...formData,
      role,
      skillsRequired: formData.skillsRequired
        .split(',')
        .map((skill) => skill.trim())
        .filter((skill) => skill !== ''),
    };

    try {
      const response = await fetch('http://localhost:5000/api/job/create/job', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        // handle error
      }
      console.log("post scucess")

      await response.json();
      toast.success('Job posted successfully!');
   navigate("/hod")
      setFormData({
        jobTitle: '',
        jobDescription: '',
        jobType: 'onsite',
        employmentType: 'full-time',
        experienceLevel: '',
        companyName: '',
        companyLocation: '',
        salary: '',
        duration: '',
        skillsRequired: '',
        applicationLink: '',
        deadline: '',
      });
    } catch (error) {
      // handle error
    }
  };

  const inputClass =
    "mt-1 block w-full border border-[#C8D9E6] bg-[#F5EFEB] text-[#333] rounded-lg px-4 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-[#C8D9E6] focus:border-[#C8D9E6] transition";

  return (
    <div className="min-h-screen bg-[#311C5A] flex justify-center items-start py-12 px-4 overflow-hidden">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-32 -right-32 w-72 h-72 bg-[#F5EFEB] rounded-full filter blur-3xl opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-32 -left-28 w-80 h-80 bg-[#C8D9E6] rounded-full filter blur-3xl opacity-20 animate-pulse delay-2000"></div>
      </div>

      <div
        className={`relative w-full max-w-2xl bg-[#F5EFEB]/90 backdrop-blur-sm border border-[#C8D9E6] rounded-3xl p-10 shadow-lg transform transition-opacity duration-700 ${
          isMounted ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <h2 className="text-3xl font-bold text-[#333] mb-8 border-b border-[#C8D9E6] pb-4 flex items-center gap-2">
          🚀 Post a Job Opening
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          {[
            { label: 'Job Title', name: 'jobTitle', type: 'text' },
            { label: 'Company Name', name: 'companyName', type: 'text' },
            { label: 'Company Location', name: 'companyLocation', type: 'text' },
            { label: 'Salary / Stipend', name: 'salary', type: 'text' },
            { label: 'Duration (for internships)', name: 'duration', type: 'text' },
            { label: 'Application Link', name: 'applicationLink', type: 'text' },
            { label: 'Deadline', name: 'deadline', type: 'date' },
          ].map(({ label, name, type }) => (
            <div key={name} className="relative group">
              <label className="block text-sm font-semibold text-[#333] mb-1">
                {label}
              </label>
              <input
                type={type}
                name={name}
                value={formData[name]}
                onChange={handleChange}
                className={`${inputClass}`}
              />
            </div>
          ))}

          <div className="relative group">
            <label className="block text-sm font-semibold text-[#333] mb-1">
              Job Description
            </label>
            <textarea
              name="jobDescription"
              value={formData.jobDescription}
              onChange={handleChange}
              rows="4"
              required
              className={`${inputClass}`}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="relative group">
              <label className="block text-sm font-semibold text-[#333] mb-1">
                Job Type
              </label>
              <select
                name="jobType"
                value={formData.jobType}
                onChange={handleChange}
                className={`${inputClass}`}
              >
                <option value="onsite">Onsite</option>
                <option value="remote">Remote</option>
                <option value="hybrid">Hybrid</option>
              </select>
            </div>

            <div className="relative group">
              <label className="block text-sm font-semibold text-[#333] mb-1">
                Employment Type
              </label>
              <select
                name="employmentType"
                value={formData.employmentType}
                onChange={handleChange}
                className={`${inputClass}`}
              >
                <option value="full-time">Full-time</option>
                <option value="internship">Internship</option>
                <option value="part-time">Part-time</option>
                <option value="contract">Contract</option>
                <option value="freelance">Freelance</option>
              </select>
            </div>

            <div className="relative group">
              <label className="block text-sm font-semibold text-[#333] mb-1">
                Experience Level
              </label>
              <select
                name="experienceLevel"
                value={formData.experienceLevel}
                onChange={handleChange}
                className={`${inputClass}`}
              >
                <option value="">Select experience</option>
                <option value="fresher">Fresher</option>
                <option value="0-1 years">0-1 years</option>
                <option value="1-3 years">1-3 years</option>
                <option value="3-5 years">3-5 years</option>
                <option value="5+ years">5+ years</option>
              </select>
            </div>

            <div className="relative group">
              <label className="block text-sm font-semibold text-[#333] mb-1">
                Skills Required
              </label>
              <input
                type="text"
                name="skillsRequired"
                value={formData.skillsRequired}
                onChange={handleChange}
                placeholder="e.g., React, Node.js, MongoDB"
                className={`${inputClass}`}
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-[#311C5A] text-white py-3 px-6 rounded-lg font-semibold text-lg  transition transform hover:scale-[1.02] duration-300 shadow-md hover:shadow-lg"
          >
            Post Job
          </button>
        </form>
      </div>
    </div>
  );
};

export default HodOfficerJob;
