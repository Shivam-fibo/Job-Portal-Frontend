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

const ChooseUs = () => {
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
          <div className="absolute top-0 right-0 w-44 h-44 rounded-full transform translate-x-22 -translate-y-22" 
               style={{ backgroundColor: colors.accent }}></div>
          <div className="absolute bottom-0 left-0 w-36 h-36 rounded-full transform -translate-x-18 translate-y-18" 
               style={{ backgroundColor: colors.accent }}></div>
        </div>
        <div className="relative z-10">
          <div className=" text-center">
       <h1 className="text-4xl font-bold tracking-wide  text-white ">
            PLACEMENT CELL
          </h1>
        </div>
        </div>
      </header>
      
      {/* Main Content Section */}
      <main 
        className="flex-grow px-6 py-12 relative"
        style={{ backgroundColor: colors.content }}
      >
        <div className="max-w-6xl mx-auto">
          {/* Title Section */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full mb-4 shadow-lg"
                 style={{ backgroundColor: colors.accent }}>
              <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd"/>
              </svg>
            </div>
            <h2 className="text-4xl font-bold mb-4" style={{ color: colors.text }}>
              Why Choose Us
            </h2>
            <div className="w-24 h-1 mx-auto rounded-full" style={{ backgroundColor: colors.accent }}></div>
          </div>

          {/* Problem Statement */}
          <div className="bg-red-50/30 backdrop-blur-sm rounded-2xl p-8 mb-12 shadow-lg border border-red-200/30">
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 rounded-lg flex items-center justify-center mr-4 bg-red-400">
                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd"/>
                </svg>
              </div>
              <h3 className="text-2xl font-bold" style={{ color: colors.text }}>
                The Problem with Traditional Systems
              </h3>
            </div>
            <p className="text-lg leading-relaxed" style={{ color: colors.text }}>
              Say goodbye to outdated, manual placement processes! Traditional campus placement systems often suffer from unstructured job postings, non-trackable student data, and lack of collaboration between students, recruiters, and administrators.
            </p>
          </div>

          {/* Our Solution */}
          <div className="bg-white/30 backdrop-blur-sm rounded-2xl p-8 mb-12 shadow-lg border border-white/20">
            <div className="flex items-center mb-6">
              <div className="w-10 h-10 rounded-lg flex items-center justify-center mr-4"
                   style={{ backgroundColor: colors.accent }}>
                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd"/>
                </svg>
              </div>
              <h3 className="text-2xl font-bold" style={{ color: colors.text }}>
                Our Smart Solution
              </h3>
            </div>
            <p className="text-xl leading-relaxed font-medium" style={{ color: colors.text }}>
              <span className="font-bold" style={{ color: colors.accent }}>PLACEMENT CELL</span> transforms this experience with a smart, AI-driven platform that keeps everyone connected and informed. Our system offers personalized job recommendations powered by AI, giving students a clear pathway to opportunities that align with their skills and career goals.
            </p>
          </div>

          {/* Key Benefits Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {[
              {
                icon: "📊",
                title: "Systematic Progress Tracking",
                description: "Track each student's journey from resume updates to job applications with complete visibility."
              },
              {
                icon: "🎯",
                title: "ATS Scoring & Insights",
                description: "Real-time insights into how well profiles match industry demands through advanced ATS scoring."
              },
              {
                icon: "🤝",
                title: "Targeted Talent Discovery",
                description: "Recruiters benefit from intelligent matching to discover the most suitable candidates."
              },
              {
                icon: "📈",
                title: "Administrative Excellence",
                description: "Administrators enjoy full visibility and streamlined reporting across all placement activities."
              },
              {
                icon: "🤖",
                title: "AI-Powered Recommendations",
                description: "Personalized job suggestions that adapt to individual skills, preferences, and career goals."
              },
              {
                icon: "🔗",
                title: "Seamless Collaboration",
                description: "Enhanced communication between students, recruiters, and academic institutions."
              }
            ].map((benefit, index) => (
              <div key={index} className="group">
                <div className="bg-white/40 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-white/30 hover:shadow-xl transition-all duration-300 hover:scale-105 h-full">
                  <div className="text-center">
                    <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg mb-4 shadow-md group-hover:scale-110 transition-transform duration-300"
                         style={{ backgroundColor: colors.accent }}>
                      <span className="text-2xl">{benefit.icon}</span>
                    </div>
                    <h3 className="text-lg font-semibold mb-3" style={{ color: colors.text }}>
                      {benefit.title}
                    </h3>
                    <p className="text-sm leading-relaxed" style={{ color: colors.text, opacity: 0.8 }}>
                      {benefit.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Final Call to Action */}
          <div className="text-center">
            <div className="bg-white/30 backdrop-blur-sm rounded-2xl p-10 shadow-lg border border-white/20 inline-block max-w-4xl">
              <div className="flex items-center justify-center mb-6">
                <div className="w-14 h-14 rounded-full flex items-center justify-center mr-4"
                     style={{ backgroundColor: colors.accent }}>
                  <svg className="w-7 h-7 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.293l-3-3a1 1 0 00-1.414 0l-3 3a1 1 0 001.414 1.414L9 9.414V13a1 1 0 102 0V9.414l1.293 1.293a1 1 0 001.414-1.414z" clipRule="evenodd"/>
                  </svg>
                </div>
                <h3 className="text-3xl font-bold" style={{ color: colors.text }}>
                  The Future of Campus Placement
                </h3>
              </div>
              <p className="text-xl leading-relaxed font-medium" style={{ color: colors.text }}>
                In short, <span className="font-bold" style={{ color: colors.accent }}>PLACEMENT CELL</span> empowers your campus with a modern, collaborative, and intelligent placement ecosystem — helping students land the right jobs faster and smarter.
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

export default ChooseUs;