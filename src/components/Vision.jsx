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

const Vision = () => {
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
          <div className="absolute top-0 left-0 w-32 h-32 rounded-full transform -translate-x-16 -translate-y-16" 
               style={{ backgroundColor: colors.accent }}></div>
          <div className="absolute bottom-0 right-0 w-24 h-24 rounded-full transform translate-x-12 translate-y-12" 
               style={{ backgroundColor: colors.accent }}></div>
        </div>
        <div className="relative z-10">
          <div className=" text-center">
           <h1 className="text-4xl font-bold tracking-wide  text-white ">
            ISL PLACEMENT CELL
          </h1>
        </div>
        </div>
      </header>
      
      {/* Main Content Section */}
      <main 
        className="flex-grow px-6 py-12 relative"
        style={{ backgroundColor: colors.content }}
      >
        <div className="max-w-5xl mx-auto">
          {/* Vision Title Section */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full mb-4 shadow-lg"
                 style={{ backgroundColor: colors.accent }}>
              <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10 12a2 2 0 100-4 2 2 0 000 4z"/>
                <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd"/>
              </svg>
            </div>
            <h2 className="text-4xl font-bold mb-4" style={{ color: colors.text }}>
              Our Vision
            </h2>
            <div className="w-24 h-1 mx-auto rounded-full" style={{ backgroundColor: colors.accent }}></div>
          </div>

          {/* Introduction */}
          <div className="bg-white/30 backdrop-blur-sm rounded-2xl p-8 mb-10 shadow-lg border border-white/20">
            <p className="text-xl leading-relaxed text-center font-medium" style={{ color: colors.text }}>
              Our vision is to reshape the future of campus placements by building an end-to-end ecosystem where students can unlock their potential and secure their dream careers.
            </p>
          </div>

          {/* Feature Cards */}
          <div className="grid gap-8 mb-12">
            {[
              {
                icon: "🎯",
                title: "Direct Job Applications",
                description: "Discover and apply for jobs directly through our platform — no external sites required."
              },
              {
                icon: "🔒",
                title: "Enhanced Security",
                description: "Access enhanced security and authentication for safe and trusted interactions."
              },
              {
                icon: "🚀",
                title: "AI-Powered Opportunities",
                description: "Unlock more job opportunities by continuously improving AI recommendations and partnerships with diverse industries."
              }
            ].map((feature, index) => (
              <div key={index} className="group">
                <div className="bg-white/40 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/30 hover:shadow-xl transition-all duration-300 hover:scale-105">
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 rounded-xl flex items-center justify-center shadow-md group-hover:scale-110 transition-transform duration-300"
                           style={{ backgroundColor: colors.accent }}>
                        <span className="text-2xl">{feature.icon}</span>
                      </div>
                    </div>
                    <div className="flex-grow">
                      <h3 className="text-xl font-semibold mb-2" style={{ color: colors.text }}>
                        {feature.title}
                      </h3>
                      <p className="leading-relaxed" style={{ color: colors.text, opacity: 0.8 }}>
                        {feature.description}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Closing Statement */}
          <div className="bg-white/30 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-white/20">
            <p className="text-lg leading-relaxed text-center font-medium" style={{ color: colors.text }}>
              We aspire to create a world where students, recruiters, and academic institutions work together on a secure, intelligent, and highly efficient placement platform that adapts to evolving career landscapes.
            </p>
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
            © {new Date().getFullYear()} ISL PLACEMENT CELL. All rights reserved.
          </p>
          <div className="mt-2 flex justify-center">
            <div className="w-16 h-0.5 rounded-full" style={{ backgroundColor: colors.accent }}></div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Vision;