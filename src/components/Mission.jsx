import React from 'react';
import { useAuth } from "../context/AuthContext";

const roleColors = {
  student: {
    header: '#3B82F6',
    content: '#EFF6FF',
    footer: '#1E40AF',
    text: '#1F2937',
    accent: '#93C5FD'
  },
  hod: {
    header: '#10B981',
    content: '#ECFDF5',
    footer: '#047857',
    text: '#064E3B',
    accent: '#6EE7B7'
  },
  placement_officer: {
    header: '#7C3AED',
    content: '#F5F3FF',
    footer: '#5B21B6',
    text: '#1F2937',
    accent: '#C4B5FD'
  }
};

const Mission = () => {
  const { user: authUser } = useAuth();
  const userRole = authUser?.role || 'student';
  const colors = roleColors[userRole];

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header Section */}
      <header 
        className="py-8 px-6 shadow-xl relative overflow-hidden"
        style={{ backgroundColor: colors.header }}
      >
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-40 h-40 rounded-full transform translate-x-20 -translate-y-20" 
               style={{ backgroundColor: colors.accent }}></div>
          <div className="absolute bottom-0 left-0 w-28 h-28 rounded-full transform -translate-x-14 translate-y-14" 
               style={{ backgroundColor: colors.accent }}></div>
        </div>
        <div className=" text-center">
         <h1 className="text-4xl font-bold tracking-wide  text-black">
            PLACEMENT CELL
          </h1>
        </div>
      </header>
      
      {/* Main Content Section */}
      <main 
        className="flex-grow px-6 py-12 relative"
        style={{ backgroundColor: colors.content }}
      >
        <div className="max-w-5xl mx-auto">
          {/* Mission Title Section */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full mb-4 shadow-lg"
                 style={{ backgroundColor: colors.accent }}>
              <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd"/>
                <path d="M17 2a1 1 0 00-1 1v14a1 1 0 102 0V3a1 1 0 00-1-1z"/>
              </svg>
            </div>
            <h2 className="text-4xl font-bold mb-4" style={{ color: colors.text }}>
              Our Mission
            </h2>
            <div className="w-24 h-1 mx-auto rounded-full" style={{ backgroundColor: colors.accent }}></div>
          </div>

          {/* Mission Statement */}
          <div className="bg-white/30 backdrop-blur-sm rounded-2xl p-10 shadow-lg border border-white/20 mb-10">
            <p className="text-xl leading-relaxed text-center font-medium" style={{ color: colors.text }}>
              At PLACEMENT CELL, our mission is to empower students with smart, AI-driven tools that make career discovery and job placement seamless and personalized.
            </p>
          </div>

          {/* Mission Pillars */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {[
              {
                icon: "🤖",
                title: "AI-Driven Intelligence",
                description: "Smart algorithms that understand your unique potential and match you with the perfect opportunities."
              },
              {
                icon: "🌉",
                title: "Bridge the Gap",
                description: "Seamlessly connecting student capabilities with industry demands through innovative matching technology."
              },
              {
                icon: "📊",
                title: "Transparent Tracking",
                description: "Complete visibility into your application journey with real-time updates and progress tracking."
              },
              {
                icon: "🎯",
                title: "Skill Matching",
                description: "Precise alignment of your skills and interests with employer requirements for better outcomes."
              },
              {
                icon: "🤝",
                title: "Collaborative Platform",
                description: "A unified ecosystem where students, recruiters, and institutions work together effectively."
              },
              {
                icon: "📈",
                title: "Personalized Growth",
                description: "Tailored recommendations and insights to accelerate your career development journey."
              }
            ].map((pillar, index) => (
              <div key={index} className="group">
                <div className="bg-white/40 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-white/30 hover:shadow-xl transition-all duration-300 hover:scale-105 h-full">
                  <div className="text-center">
                    <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg mb-4 shadow-md group-hover:scale-110 transition-transform duration-300"
                         style={{ backgroundColor: colors.accent }}>
                      <span className="text-2xl">{pillar.icon}</span>
                    </div>
                    <h3 className="text-lg font-semibold mb-3" style={{ color: colors.text }}>
                      {pillar.title}
                    </h3>
                    <p className="text-sm leading-relaxed" style={{ color: colors.text, opacity: 0.8 }}>
                      {pillar.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Call to Action */}
          <div className="text-center">
            <div className="bg-white/30 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-white/20 inline-block">
              <h3 className="text-2xl font-bold mb-4" style={{ color: colors.text }}>
                Ready to Transform Your Career Journey?
              </h3>
              <p className="text-lg" style={{ color: colors.text, opacity: 0.8 }}>
                Join thousands of students who have already discovered their dream careers through our platform.
              </p>
            </div>
          </div>
        </div>
      </main>
      
      {/* Footer Section */}
      <footer 
        className="py-6 px-6 text-center border-t-2 border-white/20"
        style={{ backgroundColor: colors.footer }}
      >
        <div className="max-w-4xl mx-auto">
          <p className="font-medium" style={{ color: colors.text }}>
            © {new Date().getFullYear()} PLACEMENT CELL. All rights reserved.
          </p>
          <div className="mt-2 flex justify-center">
            <div className="w-16 h-0.5 rounded-full" style={{ backgroundColor: colors.accent }}></div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Mission;