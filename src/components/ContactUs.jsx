import React from 'react';
import { useAuth } from "../context/AuthContext";

const roleColors = {
   student: {
    header: '#FFFFFF',
    content: '#FFFFFF',
    footer: '#FFFFFF',
    text: '#1F2937',    
    accent: '#D1D5DB'   
  },
hod: {
     header: '#FFFFFF',
    content: '#FFFFFF',
    footer: '#FFFFFF',
    text: '#1F2937',
    accent: '#D1D5DB'
  },
  placement_officer: {
     header: '#FFFFFF',
    content: '#FFFFFF',
    footer: '#FFFFFF',
    text: '#1F2937',
    accent: '#D1D5DB'
  }
};

const ContactUs = () => {
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
          <div className="absolute top-0 left-0 w-36 h-36 rounded-full transform -translate-x-18 -translate-y-18" 
               style={{ backgroundColor: colors.accent }}></div>
          <div className="absolute bottom-0 right-0 w-32 h-32 rounded-full transform translate-x-16 translate-y-16" 
               style={{ backgroundColor: colors.accent }}></div>
        </div>
        <div className="relative z-10">
         <div className=" text-center">
         <h1 className="text-4xl font-bold tracking-wide  text-black">
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
        <div className="max-w-5xl mx-auto">
          {/* Contact Title Section */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full mb-4 shadow-lg"
                 style={{ backgroundColor: colors.accent }}>
              <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z" clipRule="evenodd"/>
              </svg>
            </div>
            <h2 className="text-4xl font-bold mb-4" style={{ color: colors.text }}>
              Contact Us
            </h2>
            <div className="w-24 h-1 mx-auto rounded-full" style={{ backgroundColor: colors.accent }}></div>
          </div>

          {/* Introduction */}
          <div className="bg-white/30 backdrop-blur-sm rounded-2xl p-8 mb-10 shadow-lg border border-white/20">
            <p className="text-xl leading-relaxed text-center font-medium" style={{ color: colors.text }}>
              Have questions about job opportunities, application status, or how to make the most of our platform? We're here to help!
            </p>
          </div>

          {/* Main Content Grid */}
          <div className="grid lg:grid-cols-2 gap-10 mb-12">
            {/* About Section */}
            <div className="bg-white/40 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-white/30">
              <div className="flex items-center mb-6">
                <div className="w-10 h-10 rounded-lg flex items-center justify-center mr-4"
                     style={{ backgroundColor: colors.accent }}>
                  <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 3a1 1 0 00-1.447-.894L8.763 6H5a3 3 0 000 6h.28l1.771 5.316A1 1 0 008 18h1a1 1 0 001-1v-4.382l6.553 3.894A1 1 0 0018 16V3z" clipRule="evenodd"/>
                  </svg>
                </div>
                <h3 className="text-2xl font-bold" style={{ color: colors.text }}>
                  About Our Support
                </h3>
              </div>
              <p className="text-lg leading-relaxed mb-6" style={{ color: colors.text }}>
                Our Placement Officer is the dedicated administrator of the campus placement cell and manages all placement activities through our system.
              </p>
              <p className="text-lg leading-relaxed" style={{ color: colors.text }}>
                Whether you're a student looking for guidance, a recruiter seeking top talent, or an academic partner wanting to collaborate — feel free to reach out.
              </p>
            </div>

            {/* Contact Information */}
            <div className="bg-white/40 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-white/30">
              <div className="flex items-center mb-6">
                <div className="w-10 h-10 rounded-lg flex items-center justify-center mr-4"
                     style={{ backgroundColor: colors.accent }}>
                  <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"/>
                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"/>
                  </svg>
                </div>
                <h3 className="text-2xl font-bold" style={{ color: colors.text }}>
                  Get In Touch
                </h3>
              </div>
              
              <div className="space-y-6">
                {/* Email */}
                <div className="group">
                  <div className="flex items-center p-4 bg-white/50 rounded-xl border border-white/40 hover:shadow-md transition-all duration-300">
                    <div className="w-12 h-12 rounded-lg flex items-center justify-center mr-4 group-hover:scale-110 transition-transform duration-300"
                         style={{ backgroundColor: colors.accent }}>
                      <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"/>
                        <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"/>
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-semibold text-lg mb-1" style={{ color: colors.text }}>Email</h4>
                      <a 
                        href="mailto:placementofficer778@gmail.com" 
                        className="hover:underline text-lg font-medium transition-colors duration-300"
                        style={{ color: colors.accent }}
                      >
                        placementofficer778@gmail.com
                      </a>
                    </div>
                  </div>
                </div>
                
                {/* Phone */}
                <div className="group">
                  <div className="flex items-center p-4 bg-white/50 rounded-xl border border-white/40 hover:shadow-md transition-all duration-300">
                    <div className="w-12 h-12 rounded-lg flex items-center justify-center mr-4 group-hover:scale-110 transition-transform duration-300"
                         style={{ backgroundColor: colors.accent }}>
                      <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"/>
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-semibold text-lg mb-1" style={{ color: colors.text }}>Phone</h4>
                      <a 
                        href="tel:+919030387774" 
                        className="hover:underline text-lg font-medium transition-colors duration-300"
                        style={{ color: colors.accent }}
                      >
                        +91 9876543210
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Response Promise */}
          <div className="text-center">
            <div className="bg-white/30 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-white/20 inline-block">
              <div className="flex items-center justify-center mb-4">
                <div className="w-12 h-12 rounded-full flex items-center justify-center mr-3"
                     style={{ backgroundColor: colors.accent }}>
                  <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                  </svg>
                </div>
                <h3 className="text-2xl font-bold" style={{ color: colors.text }}>
                  Our Promise
                </h3>
              </div>
              <p className="text-lg font-medium" style={{ color: colors.text }}>
                We strive to respond promptly and ensure your placement journey is smooth, secure, and successful.
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

export default ContactUs;