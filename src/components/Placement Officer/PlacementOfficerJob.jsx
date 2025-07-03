import React, { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
const PlacementOfficer = () => {


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
  const [isMounted, setIsMounted] = useState(false);
  const navigate = useNavigate()
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
      role:role,
      skillsRequired: formData.skillsRequired
        .split(',')
        .map((skill) => skill.trim())
        .filter((skill) => skill !== ''),
    };

    try {
      const response = await fetch('https://job-portal-backend-ivory.vercel.app/api/job/create/job', {
        method: 'POST',
         credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) return;
      await response.json();
      navigate("/placement")
 toast.success('Job posted successfully!');
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
    } catch (error) {}
  };

  const inputClass =
    "mt-1 block w-full border border-[#87785F] bg-[#FFF6E8] text-[#87785F] rounded-lg px-4 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-[#87785F] focus:border-[#87785F] transition";

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F7E7CE] via-[#FFF6E8] to-[#F7E7CE] flex justify-center items-start py-12 px-4 overflow-hidden">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-32 -right-32 w-72 h-72 bg-[#87785F]/20 rounded-full filter blur-3xl opacity-30 animate-pulse"></div>
        <div className="absolute -bottom-32 -left-28 w-80 h-80 bg-[#F7E7CE]/30 rounded-full filter blur-3xl opacity-30 animate-pulse delay-2000"></div>
      </div>

      <div
        className={`relative w-full max-w-2xl bg-[#FFF6E8]/90 backdrop-blur-sm border border-[#87785F] rounded-3xl p-10 shadow-lg transform transition-opacity duration-700 ${
          isMounted ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <h2 className="text-3xl font-bold text-[#87785F] mb-8 border-b border-[#87785F]/50 pb-4 flex items-center gap-2">
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
              <label className="block text-sm font-semibold text-[#87785F] mb-1">
                {label}
              </label>
              <input
                type={type}
                name={name}
                value={formData[name]}
                onChange={handleChange}
                className={inputClass}
              />
            </div>
          ))}

          <div className="relative group">
            <label className="block text-sm font-semibold text-[#87785F] mb-1">
              Job Description
            </label>
            <textarea
              name="jobDescription"
              value={formData.jobDescription}
              onChange={handleChange}
              rows="4"
              required
              className={inputClass}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { label: 'Job Type', name: 'jobType', options: ['onsite', 'remote', 'hybrid'] },
              {
                label: 'Employment Type',
                name: 'employmentType',
                options: ['full-time', 'internship', 'part-time', 'contract', 'freelance'],
              },
              {
                label: 'Experience Level',
                name: 'experienceLevel',
                options: ['fresher', '0-1 years', '1-3 years', '3-5 years', '5+ years'],
                placeholder: 'Select experience',
              },
            ].map(({ label, name, options, placeholder }) => (
              <div className="relative group" key={name}>
                <label className="block text-sm font-semibold text-[#87785F] mb-1">
                  {label}
                </label>
                <select
                  name={name}
                  value={formData[name]}
                  onChange={handleChange}
                  className={inputClass}
                >
                  {placeholder && <option value="">{placeholder}</option>}
                  {options.map((opt) => (
                    <option key={opt} value={opt}>
                      {opt.charAt(0).toUpperCase() + opt.slice(1)}
                    </option>
                  ))}
                </select>
              </div>
            ))}

            <div className="relative group">
              <label className="block text-sm font-semibold text-[#87785F] mb-1">
                Skills Required
              </label>
              <input
                type="text"
                name="skillsRequired"
                value={formData.skillsRequired}
                onChange={handleChange}
                placeholder="e.g., React, Node.js, MongoDB"
                className={inputClass}
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-[#87785F] text-white py-3 px-6 rounded-lg font-semibold text-lg hover:bg-[#6e654f] transition transform hover:scale-[1.02] duration-300 shadow-md hover:shadow-lg"
          >
            Post Job
          </button>
        </form>
      </div>
    </div>
  );
};

export default PlacementOfficer;
