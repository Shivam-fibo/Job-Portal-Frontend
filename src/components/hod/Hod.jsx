import React, { useState, useEffect } from 'react'
import {
  Plus,
  Users,
  Briefcase,
  Award,
} from 'lucide-react'
import { useNavigate } from 'react-router-dom'

const hodColors = {
  darkBrown: '#311C5A',
  beige: '#F7E7CE',
  paleCream: '#F7F9FB',
}

const Hod = () => {
  const [applications, setApplications] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [filterStatus, setFilterStatus] = useState('all')
  const [isLoading, setIsLoading] = useState(true)

  const navigate = useNavigate()
  const handleJobPost = () => {
    console.log("Navigating to post job pagasdfe")
    navigate("/hod/newJob")
  }

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const res = await fetch('http://localhost:5000/api/application/jobApplied')
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
    <div
      className="min-h-screen"
      style={{
        background: `linear-gradient(to bottom right, ${hodColors.beige}, ${hodColors.paleCream})`,
      }}
    >
      {/* Optional light background blobs (can keep or customize) */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute -top-40 -right-40 w-80 h-80 rounded-full filter blur-3xl opacity-20"
          style={{ backgroundColor: hodColors.darkBrown }}
        ></div>
        <div
          className="absolute -bottom-40 -left-40 w-80 h-80 rounded-full filter blur-3xl opacity-20"
          style={{ backgroundColor: hodColors.beige }}
        ></div>
        <div
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full filter blur-3xl opacity-10"
          style={{ backgroundColor: hodColors.paleCream }}
        ></div>
      </div>

      <div className="relative z-10 p-8 bg-[#311C5A]">
        {/* Header Section */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-5xl font-black text-white mb-2">
                Placement Command Center
              </h1>
              <p className="text-xl text-gray-100 font-light">
                Orchestrating career destinies with precision and excellence
              </p>
            </div>
            <button
              onClick={handleJobPost}
              className="group relative overflow-hidden bg-gradient-to-r bg-gray-300 text-black px-8 py-4 rounded-2xl font-bold text-lg transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
            >
              <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative flex items-center gap-3">
                <Plus className="w-6 h-6" />
                <span onClick={handleJobPost}>Create New Opportunity</span>
              </div>
            </button>
          </div>

          {/* Stats Dashboard */}
        </div>

        {/* Applications Section */}
        <div
          className="border border-gray-200 rounded-3xl p-8 shadow-sm"
          style={{ backgroundColor: hodColors.paleCream }}
        >
          <div className="flex items-center gap-3 mb-8">
            <Award className="w-8 h-8 text-purple-600" />
            <h2 className="text-3xl font-bold text-gray-900">Application Portfolio</h2>
            <div className="ml-auto flex gap-2">
              <div className="px-4 py-2 bg-green-100 border border-green-300 rounded-xl">
                <span className="text-green-600 font-medium">{filteredApplications.length} Active</span>
              </div>
            </div>
          </div>

          {isLoading ? (
            <div className="text-center py-20">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500 mb-4"></div>
              <p className="text-gray-600 text-lg">Loading applications...</p>
            </div>
          ) : filteredApplications.length === 0 ? (
            <div
              className="text-center py-20 rounded-3xl"
              style={{ backgroundColor: hodColors.beige }}
            >
              <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Users className="w-12 h-12 text-gray-400" />
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-2">No Applications Found</h3>
              <p className="text-gray-500 text-lg mb-8">Start by creating new job opportunities to attract talent</p>
              <button
                onClick={handleJobPost}
                className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300 hover:scale-105"
              >
                Create First Job
              </button>
            </div>
          ) : (
            <div className="grid gap-6">
{[...filteredApplications].reverse().map((app, index) => (
                <div
                  key={app.id || index}
                  className="group relative border border-gray-200 bg-gray-300 rounded-2xl p-6 hover:shadow-lg transition-all duration-500 hover:scale-[1.02]"
                  
                >
                  {/* Decorative Elements (lighter) */}
                  <div className="absolute top-0 right-0 w-32 h-32 bg-gray-300 rounded-bl-full opacity-20 group-hover:opacity-40 transition-opacity duration-300"></div>
                  <div className="absolute -bottom-4 -left-4 w-24 h-24 bg-blue-100 rounded-full opacity-20 group-hover:opacity-40 transition-opacity duration-300"></div>

                  <div className="relative z-10 flex items-center justify-between ">
                    <div className="flex items-center gap-4">
                      <div
                        className="w-16 h-16 rounded-2xl flex items-center justify-center font-bold text-white text-xl shadow-md bg-[#311C5A]"
                       
                      >
                        {app.studentName ? app.studentName.charAt(0).toUpperCase() : 'S'}
                      </div>
                      <div >
                        <h3 className="text-2xl font-bold text-gray-900 mb-1 group-hover:text-purple-600 transition-colors duration-300">
                          {app.studentName || 'Unknown Student'}
                        </h3>
                        <div className="flex items-center gap-2">
                          <Briefcase className="w-4 h-4 text-cyan-500" />
                          <span className="text-cyan-600 font-semibold text-lg">
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
