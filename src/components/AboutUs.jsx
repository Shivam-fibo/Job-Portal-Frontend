import React from 'react';
import { useAuth } from "../context/AuthContext";

const roleColors = {
  student: {
    header: '#3A82F7',
    content: '#FEFBFF',
    footer: '#FFFFFF',
    text: '#2C3E50',
    accent: '#3498db'
  },
  hod: {
    header: '#311C5A',
    content: '#e2e8f0',
    footer: '#e2e8f0',
    text: 'F7F9FB',
    accent: '#d4a017'
  },
  placement_officer: {
    header: '#164BA1',
    content: '#ADB4BF',
    footer: '#F0F4FA',
    text: '#1A2B50',
    accent: '#2c82c9'
  }
};

const AboutUs = () => {
  const { user: authUser } = useAuth();
  const userRole = authUser?.role || 'student';
  const colors = roleColors[userRole];

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header Section */}
      <header 
        className="py-8 px-6 shadow-lg relative overflow-hidden"
        style={{ backgroundColor: colors.header }}
      >
        <div className=" text-center">
          <h1 className="text-4xl font-bold tracking-wide  text-white ">
            PLACEMENT CELL
          </h1>
        </div>
        {/* Subtle background pattern */}
        <div className="absolute top-0 right-0 w-64 h-64 opacity-10 transform rotate-12 translate-x-16 -translate-y-16">
          <div className="w-full h-full rounded-full" style={{ backgroundColor: colors.accent }}></div>
        </div>
      </header>
      
      {/* Main Content Section */}
      <main 
        className="flex-grow py-12 px-6"
        style={{ backgroundColor: colors.content }}
      >
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 
              className="text-4xl font-bold mb-4"
              style={{ color: colors.text }}
            >
              About Us
            </h2>
            <div className="w-20 h-1 mx-auto rounded-full" style={{ backgroundColor: colors.accent }}></div>
          </div>
          
          <div className="space-y-8">
            <div className="bg-white/70 backdrop-blur-sm p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-white/50">
              <p 
                className="text-lg leading-relaxed"
                style={{ color: colors.text }}
              >
                Welcome to <span className="font-bold text-xl" style={{ color: colors.accent }}>PLACEMENT CELL</span>, a next-generation Campus Placement Management platform designed to bridge the gap between students and their dream careers. What sets us apart? We harness the power of AI-driven job matching to deliver personalized job recommendations tailored to each student's unique skill set.
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-white/50">
                <div className="flex items-center mb-4">
                  <div className="w-3 h-3 rounded-full mr-3" style={{ backgroundColor: colors.accent }}></div>
                  <h3 className="text-xl font-semibold" style={{ color: colors.text }}>AI-Powered Matching</h3>
                </div>
                <p className="text-base leading-relaxed" style={{ color: colors.text }}>
                  Our intelligent system automatically scrapes students' skills and resume data, aligning them with job requirements for optimal matches.
                </p>
              </div>
              
              <div className="bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-white/50">
                <div className="flex items-center mb-4">
                  <div className="w-3 h-3 rounded-full mr-3" style={{ backgroundColor: colors.accent }}></div>
                  <h3 className="text-xl font-semibold" style={{ color: colors.text }}>ATS Scoring</h3>
                </div>
                <p className="text-base leading-relaxed" style={{ color: colors.text }}>
                  Get transparent ATS scores that quantify how well candidates match specific opportunities, providing actionable insights.
                </p>
              </div>
            </div>
            
            <div className="bg-gradient-to-r from-white/90 to-white/70 backdrop-blur-sm p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-white/50 relative overflow-hidden">
              <div className="relative z-10">
                <p 
                  className="text-lg leading-relaxed mb-6"
                  style={{ color: colors.text }}
                >
                  This empowers students with actionable insights to fine-tune their profiles and gives recruiters an instant, transparent view of potential fits.
                </p>
                
                <p 
                  className="text-lg leading-relaxed font-medium"
                  style={{ color: colors.text }}
                >
                  At <span className="font-bold" style={{ color: colors.accent }}>PLACEMENT CELL</span>, we don't just manage placements — we create smart, data-driven career pathways that unlock opportunities and simplify hiring for both students and companies.
                </p>
              </div>
              {/* Decorative element */}
              <div className="absolute bottom-0 right-0 w-32 h-32 opacity-5 transform translate-x-8 translate-y-8">
                <div className="w-full h-full rounded-full" style={{ backgroundColor: colors.accent }}></div>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      {/* Footer Section */}
      <footer 
        className="py-6 px-6 relative overflow-hidden"
        style={{ backgroundColor: colors.footer }}
      >
        <div className="relative z-10 text-center max-w-4xl mx-auto">
          <div className="mb-2 h-px w-24 mx-auto" style={{ backgroundColor: colors.accent, opacity: 0.3 }}></div>
          <p className="font-medium" style={{ color: colors.text }}>
            © {new Date().getFullYear()} PLACEMENT CELL. All rights reserved.
          </p>
        </div>
        {/* Subtle background element */}
        <div className="absolute bottom-0 left-0 w-48 h-48 opacity-5 transform -translate-x-12 translate-y-12">
          <div className="w-full h-full rounded-full" style={{ backgroundColor: colors.accent }}></div>
        </div>
      </footer>
    </div>
  );
};

export default AboutUs;