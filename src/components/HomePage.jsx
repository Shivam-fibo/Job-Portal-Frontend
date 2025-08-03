import { useState, useEffect } from 'react';
import { User, Building, FileText, BarChart3, ArrowRight } from 'lucide-react';

const TalentPortLanding = () => {
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

  const handleLogin = () => {
    // navigate to login
    console.log('Navigate to login');
  };

  const handleGetStarted = () => {
    // navigate to dashboard or login
    console.log('Get started clicked');
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center">
            <div className="w-8 h-8  mr-3"><img src="./images/logo.png" alt="" /></div>
            <span className="text-xl font-semibold text-gray-900">TalentPort</span>
          </div>
          <button 
            onClick={handleLogin}
            className="px-4 py-2 text-blue-600 border border-blue-600 rounded hover:bg-blue-50"
          >
            Login
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4">
        
        {/* Hero Section */}
        <section className="py-16 text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Find Jobs That Match Your Skills
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Connect students with employers using smart matching and ATS scoring. 
            Simple, effective job placement for colleges.
          </p>
          <button 
            onClick={handleGetStarted}
            className="px-6 py-3 bg-blue-600 text-white rounded hover:bg-blue-700 inline-flex items-center"
          >
            Get Started <ArrowRight className="ml-2" size={20} />
          </button>
        </section>

        {/* Stats */}
       =

        {/* What You Can Do */}
        <section className="py-16">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            What You Can Do
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <User className="text-blue-600" size={24} />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">For Students</h3>
              <p className="text-gray-600">
                Create profiles, upload resumes, get ATS scores, and apply to matched jobs.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Building className="text-green-600" size={24} />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">For Placement Officers</h3>
              <p className="text-gray-600">
                Post jobs, review applications, manage company partnerships and track placements.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <BarChart3 className="text-purple-600" size={24} />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">For HODs</h3>
              <p className="text-gray-600">
                View department analytics, track student progress, and monitor placement trends.
              </p>
            </div>
          </div>
        </section>

        {/* Key Features */}
        <section className="py-16 bg-gray-50 -mx-4 px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
              Key Features
            </h2>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div className="flex">
                <div className="w-8 h-8 bg-blue-600 rounded mr-4 flex-shrink-0 mt-1"></div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">ATS Score System</h3>
                  <p className="text-gray-600">
                    Get your resume scored by our ATS system to improve your chances of passing automated screenings.
                  </p>
                </div>
              </div>
              
              <div className="flex">
                <div className="w-8 h-8 bg-green-600 rounded mr-4 flex-shrink-0 mt-1"></div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Smart Job Matching</h3>
                  <p className="text-gray-600">
                    Jobs are matched to your profile based on skills, education, and preferences.
                  </p>
                </div>
              </div>
              
              <div className="flex">
                <div className="w-8 h-8 bg-purple-600 rounded mr-4 flex-shrink-0 mt-1"></div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Application Tracking</h3>
                  <p className="text-gray-600">
                    Track all your job applications in one place with status updates.
                  </p>
                </div>
              </div>
              
              <div className="flex">
                <div className="w-8 h-8 bg-orange-600 rounded mr-4 flex-shrink-0 mt-1"></div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Analytics Dashboard</h3>
                  <p className="text-gray-600">
                    Comprehensive reporting for placement officers and department heads.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="py-16">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            How It Works
          </h2>
          
          <div className="max-w-3xl mx-auto">
            <div className="space-y-8">
              <div className="flex items-start">
                <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center mr-4 flex-shrink-0 font-semibold">
                  1
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-1">Create Your Profile</h3>
                  <p className="text-gray-600">Add your education, skills, and career preferences.</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center mr-4 flex-shrink-0 font-semibold">
                  2
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-1">Upload Resume</h3>
                  <p className="text-gray-600">Get your ATS score and recommendations for improvement.</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center mr-4 flex-shrink-0 font-semibold">
                  3
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-1">Browse Jobs</h3>
                  <p className="text-gray-600">See jobs that match your profile and apply directly.</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center mr-4 flex-shrink-0 font-semibold">
                  4
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-1">Track Applications</h3>
                  <p className="text-gray-600">Monitor your application status and get updates.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Ready to Get Started?
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Join students and employers using our platform for better job placements.
          </p>
          <button 
            onClick={handleGetStarted}
            className="px-8 py-3 bg-blue-600 text-white rounded hover:bg-blue-700 text-lg"
          >
            Create Account
          </button>
        </section>

      </main>

      {/* Footer */}
      <footer className="border-t border-gray-200 py-8 mt-16">
        <div className="max-w-6xl mx-auto px-4 text-center text-gray-600">
          <p>&copy; 2025 TalentPort. All rights reserved.</p>
        </div>
      </footer>

    </div>
  );
};

export default TalentPortLanding;