import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import AuthPage from './components/AuthPage';
import Dashboard from './components/Dashboard';
import Studenet from './components/student/Studenet';
import PlacementOfficer from './components/Placement Officer/PlacementOfficer';
import Hod from './components/hod/Hod';
import { ReactNotifications } from 'react-notifications-component';
import 'react-notifications-component/dist/theme.css';




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

  return (
    <Routes>
         
      {!user ? (
        <Route path="*" element={<AuthPage />} />
      ) : (
        <>
          <Route path="/" element={<Dashboard />} />
          <Route path="/student" element={<Studenet />} />
          <Route path="/hod" element={<Hod />} />
          <Route path="/placement" element={<PlacementOfficer />} />
          <Route path="*" element={<Navigate to="/" />} />
        </>
      )}
    </Routes>
  );
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <ReactNotifications />
        <AppContent />
      </Router>
    </AuthProvider>
  );
}

export default App;
