import React, { useState, useEffect } from 'react'
import {
  Plus,
  Users,
  Briefcase,
  Award,
} from 'lucide-react'
import { useNavigate } from 'react-router-dom'

const Hod = () => {
  const [applications, setApplications] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [filterStatus, setFilterStatus] = useState('all')
  const [isLoading, setIsLoading] = useState(true)

  const navigate = useNavigate()
  const handleJobPost = () => {
    navigate("/hod/newJob")
  }

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const res = await fetch('https://job-portal-backend-ivory.vercel.app/api/application/jobApplied', {
          credentials: 'include',
        })
        const data = await res.json()
        setApplications(data)
        setIsLoading(false)
      } catch (err) {
        console.error('Error fetching applications:', err)
        setIsLoading(false)
      }
    }
    setTimeout(() => {
      fetchApplications()
    }, 1000)
  }, [])

  const filteredApplications = applications.filter(app => {
    const matchesSearch = app.studentName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.jobTitle?.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesSearch
  })

  return (
    <div className="min-h-screen bg-white">
      <div className="relative z-10 p-8 bg-white border-b border-gray-200">
        {/* Header Section */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-4xl font-bold text-black mb-2">
                Placement Command Center
              </h1>
              <p className="text-lg text-gray-600">
                Orchestrating career destinies with precision and excellence
              </p>
            </div>
            <button
              onClick={handleJobPost}
              className="bg-white border border-gray-300 text-black px-6 py-3 rounded-xl font-medium hover:bg-gray-100 transition"
            >
              <div className="flex items-center gap-2">
                <Plus className="w-5 h-5" />
                <span>Create New Opportunity</span>
              </div>
            </button>
          </div>
        </div>

        {/* Applications Section */}
        <div className="border border-gray-200 rounded-3xl p-8 bg-white shadow-sm">
          <div className="flex items-center gap-3 mb-8">
            <Award className="w-8 h-8 text-black" />
            <h2 className="text-2xl font-semibold text-black">Application Portfolio</h2>
            <div className="ml-auto">
              <div className="px-4 py-2 bg-gray-100 border border-gray-300 rounded-xl">
                <span className="text-black font-medium">{filteredApplications.length} Active</span>
              </div>
            </div>
          </div>

          {isLoading ? (
            <div className="text-center py-20">
              <div className="inline-block animate-spin rounded-full h-10 w-10 border-b-2 border-black mb-4"></div>
              <p className="text-gray-600 text-lg">Loading applications...</p>
            </div>
          ) : filteredApplications.length === 0 ? (
            <div className="text-center py-20 rounded-3xl bg-white border border-gray-200">
              <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Users className="w-10 h-10 text-gray-400" />
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-2">No Applications Found</h3>
              <p className="text-gray-500 text-lg mb-8">Start by creating new job opportunities to attract talent</p>
              <button
                onClick={handleJobPost}
                className="bg-black text-white px-6 py-3 rounded-xl font-semibold hover:bg-gray-800 transition"
              >
                Create First Job
              </button>
            </div>
          ) : (
            <div className="grid gap-6">
              {[...filteredApplications].reverse().map((app, index) => (
                <div
                  key={app.id || index}
                  className="relative border border-gray-200 bg-white rounded-2xl p-6 hover:shadow-md transition"
                >
                  <div className="relative z-10 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-14 h-14 rounded-xl flex items-center justify-center font-bold text-white text-lg bg-gray-800">
                        {app.studentName ? app.studentName.charAt(0).toUpperCase() : 'S'}
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold text-black">
                          {app.studentName || 'Unknown Student'}
                        </h3>
                        <div className="flex items-center gap-2 mt-1">
                          <Briefcase className="w-4 h-4 text-gray-600" />
                          <span className="text-gray-700">
                            {app.jobTitle || 'Unknown Position'}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Hod
