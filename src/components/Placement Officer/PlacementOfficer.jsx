import React, { useState } from 'react';
import {  showSuccessNotification,
  showErrorNotification,
  showWarningNotification
} from '../../util/notifications.js'

const PlacementOfficer = () => {
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
        showWarningNotification("Some fields are missing!");
      }

      await response.json();
     showSuccessNotification("Job posted successfully!");
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
      showErrorNotification("Failed to fetch data.");
     
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex justify-center items-start py-12 px-4">
      <div className="w-full max-w-2xl bg-white p-8 rounded-xl shadow-md">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">Post a Job Opening</h2>

        <form onSubmit={handleSubmit} className="space-y-4">

          {[
            { label: 'Job Title', name: 'jobTitle', type: 'text' },
            { label: 'Company Name', name: 'companyName', type: 'text' },
            { label: 'Company Location', name: 'companyLocation', type: 'text' },
            { label: 'Salary / Stipend', name: 'salary', type: 'text' },
            { label: 'Duration (for internships)', name: 'duration', type: 'text' },
            { label: 'Application Link', name: 'applicationLink', type: 'text' },
            { label: 'Deadline', name: 'deadline', type: 'date' },
          ].map(({ label, name, type }) => (
            <div key={name}>
              <label className="block text-sm font-medium text-gray-700">{label}</label>
              <input
                type={type}
                name={name}
                value={formData[name]}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-lg px-4 py-2 shadow-sm focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          ))}

          <div>
            <label className="block text-sm font-medium text-gray-700">Job Description</label>
            <textarea
              name="jobDescription"
              value={formData.jobDescription}
              onChange={handleChange}
              required
              rows="4"
              className="mt-1 block w-full border border-gray-300 rounded-lg px-4 py-2 shadow-sm focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Job Type</label>
            <select
              name="jobType"
              value={formData.jobType}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-lg px-4 py-2 shadow-sm"
            >
              <option value="onsite">Onsite</option>
              <option value="remote">Remote</option>
              <option value="hybrid">Hybrid</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Employment Type</label>
            <select
              name="employmentType"
              value={formData.employmentType}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-lg px-4 py-2 shadow-sm"
            >
              <option value="full-time">Full-time</option>
              <option value="internship">Internship</option>
              <option value="part-time">Part-time</option>
              <option value="contract">Contract</option>
              <option value="freelance">Freelance</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Experience Level</label>
            <select
              name="experienceLevel"
              value={formData.experienceLevel}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-lg px-4 py-2 shadow-sm"
            >
              <option value="">Select experience</option>
              <option value="fresher">Fresher</option>
              <option value="0-1 years">0-1 years</option>
              <option value="1-3 years">1-3 years</option>
              <option value="3-5 years">3-5 years</option>
              <option value="5+ years">5+ years</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Skills Required (comma separated)</label>
            <input
              type="text"
              name="skillsRequired"
              value={formData.skillsRequired}
              onChange={handleChange}
              placeholder="e.g., React, Node.js, MongoDB"
              className="mt-1 block w-full border border-gray-300 rounded-lg px-4 py-2 shadow-sm focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition"
          >
            Submit Job
          </button>
        </form>
      </div>
    </div>
  );
};

export default PlacementOfficer;
