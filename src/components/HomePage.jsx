import { useState, useEffect } from 'react';
import { User, Briefcase, School, Search, FileText, BarChart2, CheckCircle, ArrowRight, Upload, MousePointer, Send } from 'lucide-react';
import {useNavigate} from 'react-router-dom'

const JobPortalLanding = () => {
  const [activeTab, setActiveTab] = useState('students');
  const [stats, setStats] = useState({
    jobs: 0,
    companies: 0,
    placements: 0,
    students: 0
  });

  
  useEffect(() => {
    const targetStats = {
      jobs: 7000,
      companies: 350,
      placements: 1200,
      students: 5000
    };
    
    const duration = 2000;
    const startTime = Date.now();
    
    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      setStats({
        jobs: Math.floor(progress * targetStats.jobs),
        companies: Math.floor(progress * targetStats.companies),
        placements: Math.floor(progress * targetStats.placements),
        students: Math.floor(progress * targetStats.students)
      });
      
      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };
    
    animate();
  }, []);

  const navigate = useNavigate()

  const handleSignUpClick = () => {
    navigate('/login');
  }

  const handleGetStarted = () => {
    if (user) {
      navigate('/dashboard');
    } else {
      navigate('/login');
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 ">
      {/* Navigation */}
      <nav className="container mx-auto  px-6 py-4  flex justify-between items-center">
        <div className="flex items-center  space-x-2">
        
          <span className="text-xl font-bold  ">
            <img src="/images/logo.png" alt="logo" height={"100px"} width={"100px"} className='rounded-xl'  />
          </span>
        </div>
        <div className="hidden md:flex space-x-8">
          <a href="#features" className="text-gray-600 hover:text-blue-600 transition">Features</a>
          <a href="#how-it-works" className="text-gray-600 hover:text-blue-600 transition">How It Works</a>
        </div>
        <div className="flex space-x-4">
          <button 
            className="px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-medium rounded-lg hover:shadow-lg transition transform hover:scale-105"
            onClick={handleSignUpClick}
          >
            Log in
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="container mx-auto px-6 py-16 md:py-24">
        <div className="flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 mb-12 md:mb-0">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight mb-6">
              Launch Your Career with <span className="bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">Smart Job Matching</span>
            </h1>
            <p className="text-lg text-gray-600 mb-8">
              Our platform connects students with top employers using advanced ATS scoring and personalized recommendations.
            </p>
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
              <button className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-medium rounded-lg hover:shadow-lg transition transform hover:scale-105 flex items-center justify-center"
                onClick={handleGetStarted}
              >
                Get Started <ArrowRight className="ml-2" size={18}   />
              </button>
              <button className="px-6 py-3 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition flex items-center justify-center">
                Browse Jobs <Search className="ml-2" size={18} />
              </button>
            </div>
          </div>
          <div className="md:w-1/2 flex justify-center">
            <div className="relative w-full max-w-md">
              <div className="absolute -top-6 -left-6 w-64 h-64 bg-purple-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse"></div>
              <div className="absolute -bottom-8 -right-8 w-64 h-64 bg-blue-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse"></div>
              <div className="absolute top-20 left-20 w-64 h-64 bg-pink-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse"></div>
              <div className="relative bg-white p-8 rounded-2xl shadow-xl border border-gray-100">
                <div className="flex space-x-4 mb-6">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center text-white">
                    <User size={24} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800">Student Profile</h3>
                    <p className="text-sm text-gray-500">Create your professional profile</p>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium text-gray-700">ATS Score</span>
                      <span className="text-sm font-bold text-blue-600">87/100</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-gradient-to-r from-blue-500 to-purple-600 h-2 rounded-full" style={{ width: '87%' }}></div>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-3 bg-green-50 rounded-lg border border-green-100">
                      <p className="text-xs text-green-600 mb-1">Matched Jobs</p>
                      <p className="font-bold text-green-700">24</p>
                    </div>
                    <div className="p-3 bg-blue-50 rounded-lg border border-blue-100">
                      <p className="text-xs text-blue-600">Applications</p>
                      <p className="font-bold text-blue-700">8</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <div className='border-t-2 border-gray-200'></div>
      <section className=" py-12">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div className="p-6">
              <div className="text-4xl font-bold text-blue-600 mb-2">{stats.jobs}+</div>
              <p className="text-gray-600">Job Opportunities</p>
            </div>
            <div className="p-6">
              <div className="text-4xl font-bold text-purple-600 mb-2">{stats.companies}+</div>
              <p className="text-gray-600">Partner Companies</p>
            </div>
            <div className="p-6">
              <div className="text-4xl font-bold text-emerald-600 mb-2">{stats.placements}+</div>
              <p className="text-gray-600">Successful Placements</p>
            </div>
            <div className="p-6">
              <div className="text-4xl font-bold text-pink-600 mb-2">{stats.students}+</div>
              <p className="text-gray-600">Active Students</p>
            </div>
          </div>
        </div>
      </section>
            <div className='border-t-2 border-gray-200'></div>


      {/* Features Section */}
      <section id="features" className="container mx-auto px-6 py-16 md:py-24">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Powerful Features for All Users</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Our platform offers specialized tools tailored for each user role to streamline the job placement process.
          </p>
        </div>
        
        <div className="mb-8 flex justify-center">
          <div className="inline-flex rounded-lg bg-gray-100 p-1">
            <button 
              onClick={() => setActiveTab('students')}
              className={`px-6 py-2 rounded-md font-medium ${activeTab === 'students' ? 'bg-white shadow text-blue-600' : 'text-gray-600 hover:text-gray-800'}`}
            >
              <div className="flex items-center">
                <User className="mr-2" size={18} /> Students
              </div>
            </button>
            <button 
              onClick={() => setActiveTab('placement')}
              className={`px-6 py-2 rounded-md font-medium ${activeTab === 'placement' ? 'bg-white shadow text-orange-600' : 'text-gray-600 hover:text-gray-800'}`}
            >
              <div className="flex items-center">
                <Briefcase className="mr-2" size={18} /> Placement Officers
              </div>
            </button>
            <button 
              onClick={() => setActiveTab('hod')}
              className={`px-6 py-2 rounded-md font-medium ${activeTab === 'hod' ? 'bg-white shadow text-emerald-600' : 'text-gray-600 hover:text-gray-800'}`}
            >
              <div className="flex items-center">
                <School className="mr-2" size={18} /> HODs
              </div>
            </button>
          </div>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {activeTab === 'students' && (
            <>
              <FeatureCard 
                icon={<Search size={24} className="text-blue-500" />}
                title="Smart Job Matching"
                description="Get personalized job recommendations based on your skills, preferences, and ATS score."
                gradient="from-blue-100 to-blue-50"
              />
              <FeatureCard 
                icon={<FileText size={24} className="text-purple-500" />}
                title="ATS Score System"
                description="Optimize your resume with our Applicant Tracking System score to pass automated screenings."
                gradient="from-purple-100 to-purple-50"
              />
              <FeatureCard 
                icon={<CheckCircle size={24} className="text-emerald-500" />}
                title="Application Tracking"
                description="Track all your applications in one place with real-time status updates."
                gradient="from-emerald-100 to-emerald-50"
              />
            </>
          )}
          
          {activeTab === 'placement' && (
            <>
              <FeatureCard 
                icon={<Briefcase size={24} className="text-orange-500" />}
                title="Job Posting"
                description="Easily create and manage job postings for partner companies."
                gradient="from-orange-100 to-orange-50"
              />
              <FeatureCard 
                icon={<User size={24} className="text-red-500" />}
                title="Candidate Management"
                description="Review and manage student applications for each position."
                gradient="from-red-100 to-red-50"
              />
              <FeatureCard 
                icon={<BarChart2 size={24} className="text-amber-500" />}
                title="Company Relations"
                description="Maintain partnerships and track engagement with employers."
                gradient="from-amber-100 to-amber-50"
              />
            </>
          )}
          
          {activeTab === 'hod' && (
            <>
              <FeatureCard 
                icon={<BarChart2 size={24} className="text-emerald-500" />}
                title="Department Analytics"
                description="Comprehensive dashboards showing placement statistics and trends."
                gradient="from-emerald-100 to-emerald-50"
              />
              <FeatureCard 
                icon={<School size={24} className="text-teal-500" />}
                title="Student Tracking"
                description="Monitor student progress through the placement process."
                gradient="from-teal-100 to-teal-50"
              />
              <FeatureCard 
                icon={<Briefcase size={24} className="text-cyan-500" />}
                title="Industry Partnerships"
                description="Manage and grow relationships with key industry partners."
                gradient="from-cyan-100 to-cyan-50"
              />
            </>
          )}
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-16 md:py-24 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 relative overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
          <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-r from-blue-400/20 to-purple-400/20 rounded-full blur-2xl animate-pulse"></div>
          <div className="absolute bottom-20 right-10 w-40 h-40 bg-gradient-to-r from-purple-400/20 to-pink-400/20 rounded-full blur-2xl animate-pulse"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-indigo-400/10 to-blue-400/10 rounded-full blur-3xl"></div>
        </div>
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              How It Works
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Simple steps to get started and make the most of our platform.
            </p>
          </div>

          {/* Timeline Container */}
          <div className="relative max-w-6xl mx-auto">
            {/* Central Timeline Line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gradient-to-b from-blue-500 via-purple-500 to-indigo-500 rounded-full shadow-lg"></div>
            
            <div className="space-y-20">
              {/* Step 1 */}
              <div className="relative flex items-center">
                <div className="flex-1 pr-8 text-right">
                  <div className="bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-xl border border-white/50 hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
                    <h3 className="text-2xl font-bold text-gray-800 mb-4 flex items-center justify-end">
                      Create Your Profile
                      <User className="ml-3 text-blue-500" size={28} />
                    </h3>
                    <p className="text-gray-600 text-lg leading-relaxed">
                      Set up your comprehensive professional profile with your skills, education, and career preferences.
                    </p>
                  </div>
                </div>
                
                {/* Step Circle */}
                <div className="relative z-20 flex items-center justify-center">
                  <div className="w-20 h-20 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold text-2xl shadow-2xl transform hover:scale-110 transition-transform duration-300">
                    1
                  </div>
                  <div className="absolute w-24 h-24 rounded-full bg-gradient-to-r from-blue-400/30 to-purple-400/30 animate-ping"></div>
                </div>
                
                <div className="flex-1 pl-8">
                  <div className="w-full h-32 bg-gradient-to-r from-blue-100 to-purple-100 rounded-2xl border-2 border-dashed border-blue-300 flex items-center justify-center opacity-50">
                    <span className="text-blue-400 font-medium">Visual Preview</span>
                  </div>
                </div>
              </div>

              {/* Step 2 */}
              <div className="relative flex items-center">
                <div className="flex-1 pr-8">
                  <div className="w-full h-32 bg-gradient-to-r from-purple-100 to-indigo-100 rounded-2xl border-2 border-dashed border-purple-300 flex items-center justify-center opacity-50">
                    <span className="text-purple-400 font-medium">Resume Upload Interface</span>
                  </div>
                </div>
                
                {/* Step Circle */}
                <div className="relative z-20 flex items-center justify-center">
                  <div className="w-20 h-20 rounded-full bg-gradient-to-r from-purple-500 to-indigo-600 flex items-center justify-center text-white font-bold text-2xl shadow-2xl transform hover:scale-110 transition-transform duration-300">
                    2
                  </div>
                  <div className="absolute w-24 h-24 rounded-full bg-gradient-to-r from-purple-400/30 to-indigo-400/30 animate-ping"></div>
                </div>
                
                <div className="flex-1 pl-8">
                  <div className="bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-xl border border-white/50 hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
                    <h3 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
                      <Upload className="mr-3 text-purple-500" size={28} />
                      Upload Your Resume
                    </h3>
                    <p className="text-gray-600 text-lg leading-relaxed">
                      Add your resume to get your ATS score and personalized recommendations.
                    </p>
                  </div>
                </div>
              </div>

              {/* Step 3 */}
              <div className="relative flex items-center">
                <div className="flex-1 pr-8 text-right">
                  <div className="bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-xl border border-white/50 hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
                    <h3 className="text-2xl font-bold text-gray-800 mb-4 flex items-center justify-end">
                      Browse & Match
                      <MousePointer className="ml-3 text-indigo-500" size={28} />
                    </h3>
                    <p className="text-gray-600 text-lg leading-relaxed">
                      Discover jobs that match your profile and ATS score.
                    </p>
                  </div>
                </div>
                
                {/* Step Circle */}
                <div className="relative z-20 flex items-center justify-center">
                  <div className="w-20 h-20 rounded-full bg-gradient-to-r from-indigo-500 to-blue-600 flex items-center justify-center text-white font-bold text-2xl shadow-2xl transform hover:scale-110 transition-transform duration-300">
                    3
                  </div>
                  <div className="absolute w-24 h-24 rounded-full bg-gradient-to-r from-indigo-400/30 to-blue-400/30 animate-ping"></div>
                </div>
                
                <div className="flex-1 pl-8">
                  <div className="w-full h-32 bg-gradient-to-r from-indigo-100 to-blue-100 rounded-2xl border-2 border-dashed border-indigo-300 flex items-center justify-center opacity-50">
                    <span className="text-indigo-400 font-medium">Job Matching Preview</span>
                  </div>
                </div>
              </div>

              {/* Step 4 */}
              <div className="relative flex items-center">
                <div className="flex-1 pr-8">
                  <div className="w-full h-32 bg-gradient-to-r from-emerald-100 to-green-100 rounded-2xl border-2 border-dashed border-emerald-300 flex items-center justify-center opacity-50">
                    <span className="text-emerald-400 font-medium">Application Tracking</span>
                  </div>
                </div>
                
                {/* Step Circle */}
                <div className="relative z-20 flex items-center justify-center">
                  <div className="w-20 h-20 rounded-full bg-gradient-to-r from-emerald-500 to-green-600 flex items-center justify-center text-white font-bold text-2xl shadow-2xl transform hover:scale-110 transition-transform duration-300">
                    4
                  </div>
                  <div className="absolute w-24 h-24 rounded-full bg-gradient-to-r from-emerald-400/30 to-green-400/30 animate-ping"></div>
                </div>
                
                <div className="flex-1 pl-8">
                  <div className="bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-xl border border-white/50 hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
                    <h3 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
                      <Send className="mr-3 text-emerald-500" size={28} />
                      Apply & Track
                    </h3>
                    <p className="text-gray-600 text-lg leading-relaxed">
                      Submit applications and track their progress in real-time.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom CTA */}
          <div className="text-center mt-16">
            <button 
              onClick={handleGetStarted}
              className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold rounded-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 flex items-center mx-auto text-lg"
            >
              Start Your Journey <ArrowRight className="ml-2" size={20} />
            </button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-gradient-to-r from-blue-500 to-purple-600">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Ready to Transform Your Career Journey?</h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Join thousands of students and professionals who found their dream jobs through our platform.
          </p>
          <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            <button className="px-8 py-3 bg-white text-blue-600 font-bold rounded-lg hover:bg-gray-100 transition transform hover:scale-105"
             onClick={handleSignUpClick}
            >
              Log in Free
            </button>
          </div>
        </div>
      </section>


      
    </div>
  );
};

const FeatureCard = ({ icon, title, description, gradient }) => {
  return (
    <div className={`bg-gradient-to-br ${gradient} p-6 rounded-xl border border-gray-200 hover:shadow-md transition`}>
      <div className="w-12 h-12 rounded-lg bg-white shadow-sm flex items-center justify-center mb-4">
        {icon}
      </div>
      <h3 className="text-xl font-semibold text-gray-800 mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
};

export default JobPortalLanding;