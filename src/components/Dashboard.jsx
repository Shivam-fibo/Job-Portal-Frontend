import React from 'react';
import { useAuth } from '../context/AuthContext';
import { AiOutlineLogout, AiOutlineUser } from 'react-icons/ai';

const Dashboard = () => {
  const { user, logout } = useAuth();

  const getRoleDisplayName = (role) => {
    switch (role) {
      case 'student':
        return 'Student';
      case 'hod':
        return 'HOD';
      case 'placement_officer':
        return 'Placement Officer';
      default:
        return role;
    }
  };

  const getRoleColor = (role) => {
    switch (role) {
      case 'student':
        return 'bg-blue-100 text-blue-800';
      case 'hod':
        return 'bg-green-100 text-green-800';
      case 'placement_officer':
        return 'bg-purple-100 text-purple-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <div className="bg-blue-600 p-2 rounded-lg">
                <AiOutlineUser className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-semibold text-gray-900">
                  Dashboard
                </h1>
                <p className="text-sm text-gray-500">
                  Welcome back, {user?.email}
                </p>
              </div>
            </div>
            
            <button
              onClick={logout}
              className="cursor-pointer flex items-center space-x-2 bg-red-50 hover:bg-red-100 text-red-700 px-4 py-2 rounded-lg transition-colors"
            >
              <AiOutlineLogout className="h-4 w-4" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          {/* Role Display */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-blue-100 rounded-full mb-4">
              <AiOutlineUser className="h-10 w-10 text-blue-600" />
            </div>
            
            <h1 className="text-4xl font-bold text-gray-800 mb-2">
              {getRoleDisplayName(user?.role)}
            </h1>
            
            <div className="flex justify-center mb-4">
              <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getRoleColor(user?.role)}`}>
                {getRoleDisplayName(user?.role)}
              </span>
            </div>
            
            <p className="text-gray-600 mb-6">
              You are logged in as a {getRoleDisplayName(user?.role).toLowerCase()}
            </p>
          </div>

          {/* User Information Card */}
          <div className="bg-gray-50 rounded-xl p-6 mb-8">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">
              User Information
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-500 mb-1">
                  Email Address
                </label>
                <p className="text-gray-900 font-medium">{user?.email}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-500 mb-1">
                  Role
                </label>
                <p className="text-gray-900 font-medium">
                  {getRoleDisplayName(user?.role)}
                </p>
              </div>
            </div>
          </div>

          {/* Role-specific content placeholder */}
          <div className="bg-blue-50 rounded-xl p-6">
            <h2 className="text-lg font-semibold text-blue-800 mb-3">
              {getRoleDisplayName(user?.role)} Features
            </h2>
            <p className="text-blue-700">
              This is where {getRoleDisplayName(user?.role).toLowerCase()}-specific features and content would be displayed.
              The system successfully recognizes your role and can provide appropriate access controls and functionality.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;