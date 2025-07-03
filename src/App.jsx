import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import AuthPage from './components/AuthPage';
import Dashboard from './components/Dashboard';
import Studenet from './components/student/JobPosting';
import PlacementOfficer from './components/Placement Officer/PlacementOfficerJob';
import Hod from './components/hod/Hod';
import StudentProfileForm from './components/student/StudentProfileForm';
import StudentLandingPage from './components/student/StudentLandingPage';
import PlacmentOfficerSection from './components/Placement Officer/PlacmentOfficerSection';
import Mission from './components/Mission';
import ContactUs from './components/ContactUs';
import AboutUs from './components/AboutUs';
import Vision from './components/Vision';
import ChooseUs from './components/ChooseUs';
import HomePage from './components/HomePage';
import Header from './components/Header';
import StudentProfiles from './components/StudentList';
import ViewAnnouncements from './components/ViewAnnouncements';
import CreateAnnouncement from './components/hod/AddAnoucement';
import HodOfficerJob from './components/hod/HofOfficerJob';
import {Toaster} from 'react-hot-toast'


const AppContent = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<AuthPage />} />
        <Route path="/contactus" element={<ContactUs />} />
        <Route path="/ourmission" element={<Mission />} />
        <Route path="/aboutus" element={<AboutUs />} />
        <Route path="/ourvision" element={<Vision />} />
        <Route path="/whychooseus" element={<ChooseUs />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    );
  }


  return (
    <>
      <Header />
      <Toaster position="top-right" reverseOrder={false} />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/contactus" element={<ContactUs />} />
        <Route path="/ourmission" element={<Mission />} />
        <Route path="/aboutus" element={<AboutUs />} />
        <Route path="/ourvision" element={<Vision />} />
        <Route path="/whychooseus" element={<ChooseUs />} />
        <Route path="/home" element={<Navigate to="/dashboard" replace />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/student" element={<StudentLandingPage />} />
        <Route path="/jobs/opening" element={<Studenet />} />
        <Route path="/hod" element={<Hod />} />
        <Route path="hod/newjob" element={<HodOfficerJob/>} />
        <Route path="/placement" element={<PlacmentOfficerSection />} />
        <Route path="/newJob" element={<PlacementOfficer />} />
        <Route path="/student/profile" element={<StudentProfileForm />} />
        <Route path='/studentlist' element={<StudentProfiles/>}/>
        <Route path="/viewAnnoucment" element={<ViewAnnouncements/>}/>
        <Route path="/addAnnoucment" element={<CreateAnnouncement/>}/>
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>

    </>
  );
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <AppContent />
      </Router>
    </AuthProvider>
  );
}

export default App;