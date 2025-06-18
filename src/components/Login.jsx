import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import {
  Eye,
  EyeOff,
  Mail,
  Lock,
  User,
  GraduationCap,
  Building2,
  Users,
  Shield,
  CheckCircle,
  Sparkles
} from 'lucide-react';
import ForgotPasswordModal from './ForgotPasswordModel';
import { useNavigate } from 'react-router-dom';

const Login = ({ onToggleMode }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    role: 'student'
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showForgotModal, setShowForgotModal] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();

  const roleConfigs = {
    student: {
      title: "Welcome Back Student",
      subtitle: "Access your personalized career dashboard and opportunities",
      topColor: "#3B82F6",
      middleColor: "#fffaff",
      bottomColor: "#8e8f8d",
      image: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=600&h=800&fit=crop",
      icon: GraduationCap,
      features: [
        "Track your applications",
        "View personalized job matches",
        "Access skill development resources"
      ]
    },
    hod: {
      title: "Department Dashboard",
      subtitle: "Manage your department's placement activities",
      topColor: "#311C5A ",
      middleColor: "#f7f8fa",
      bottomColor: "#FEFFFE",
      image: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=600&h=800&fit=crop",
      icon: Building2,
      features: [
        "View student placement statistics",
        "Manage department resources",
        "Track industry collaborations"
      ]
    },
    placement_officer: {
      title: "Placement Portal",
      subtitle: "Connect students with top recruiters",
      topColor: "#164BA1",
      middleColor: "#ADB4BF",
      bottomColor: "#F0F4FA",
      image: "https://images.unsplash.com/photo-1551434678-e076c223a692?w=600&h=800&fit=crop",
      icon: Users,
      features: [
        "Manage recruitment drives",
        "Track company engagements",
        "Monitor placement progress"
      ]
    }
  };

  const currentRole = roleConfigs[formData.role];
  const RoleIcon = currentRole.icon;

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        login(data.token, data.user);
        navigate('/dashboard');
      } else {
        setError(data.message || 'Login failed');
      }
    } catch (error) {
      setError('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4" style={{ backgroundColor: currentRole.bottomColor }}>
      <div className="w-full rounded-3xl shadow-2xl overflow-hidden" style={{ backgroundColor: currentRole.middleColor }}>
        <div className="grid lg:grid-cols-2 min-h-[600px]">
          {/* Left Side */}
          <div className="p-8 lg:p-12 flex flex-col justify-center text-white" style={{ backgroundColor: currentRole.topColor }}>
            <div className="inline-flex items-center justify-center w-16 h-16 bg-opacity-20 rounded-2xl mb-6">
              <RoleIcon className="h-8 w-8 text-black" />
            </div>
            <h1 className="text-3xl lg:text-4xl font-bold mb-4">{currentRole.title}</h1>
            <p className="text-lg mb-6">{currentRole.subtitle}</p>

            <div className="space-y-4">
              {currentRole.features.map((feature, idx) => (
                <div key={idx} className="flex items-center gap-3">
                  <CheckCircle className="h-5 w-5 text-white" />
                  <span>{feature}</span>
                </div>
              ))}
            </div>

            <div className="mt-8 lg:mt-12">
              <img
                src={currentRole.image}
                alt={`${formData.role} illustration`}
                className="w-full max-w-xs h-48 object-cover rounded-2xl shadow-lg"
              />
            </div>
          </div>

          {/* Right Side */}
          <div className="p-8 lg:p-12 flex flex-col justify-center">
            <div className="w-full max-w-md mx-auto">
              <div className="text-center mb-8">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <Sparkles className="h-6 w-6 text-black" />
                  <span className="text-sm font-semibold uppercase tracking-wider text-black">
                    {formData.role.replace('_', ' ')} Login
                  </span>
                </div>
                <h2 className="text-3xl font-bold text-black mb-1">Welcome Back</h2>
                <p className="text-gray-700">Sign in to continue your journey</p>
              </div>

              {error && (
                <div className="bg-red-100 border border-red-200 text-red-700 px-4 py-3 rounded-xl mb-6 flex items-center gap-2">
                  <Shield className="h-5 w-5" />
                  <span>{error}</span>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Email */}
                <div>
                  <label className="block text-sm font-semibold text-black mb-2">Email Address</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center">
                      <Mail className="h-5 w-5 text-gray-500" />
                    </div>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full pl-12 pr-4 py-3 border rounded-xl bg-gray-100 focus:ring-2 ring-black outline-none"
                      placeholder="Enter your email"
                    />
                  </div>
                </div>

                {/* Role */}
                <div>
                  <label className="block text-sm font-semibold text-black mb-2">Select Your Role</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center">
                      <User className="h-5 w-5 text-gray-500" />
                    </div>
                    <select
                      name="role"
                      value={formData.role}
                      onChange={handleChange}
                      className="w-full pl-12 pr-4 py-3 border rounded-xl bg-gray-100 focus:ring-2 ring-black outline-none appearance-none"
                    >
                      <option value="student">Student</option>
                      <option value="hod">Head of Department</option>
                      <option value="placement_officer">Placement Officer</option>
                    </select>
                  </div>
                </div>

                {/* Password */}
                <div>
                  <label className="block text-sm font-semibold text-black mb-2">Password</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center">
                      <Lock className="h-5 w-5 text-gray-500" />
                    </div>
                    <input
                      type={showPassword ? 'text' : 'password'}
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      required
                      className="w-full pl-12 pr-14 py-3 border rounded-xl bg-gray-100 focus:ring-2 ring-black outline-none"
                      placeholder="Enter your password"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute inset-y-0 right-0 pr-4 flex items-center"
                    >
                      {showPassword ? <EyeOff className="h-5 w-5 text-gray-500" /> : <Eye className="h-5 w-5 text-gray-500" />}
                    </button>
                  </div>
                </div>

                {/* Forgot Password */}
                <div className="text-right">
                  <button
                    type="button"
                    onClick={() => setShowForgotModal(true)}
                    className="text-sm font-medium text-black hover:underline"
                  >
                    Forgot Password?
                  </button>
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-black text-white font-semibold py-3 px-6 rounded-xl hover:opacity-90 transition-all duration-300 disabled:opacity-50"
                >
                  {loading ? 'Signing In...' : 'Sign In'}
                </button>
              </form>

              {/* Toggle to Register */}
              <div className="mt-6 text-center">
                <p className="text-black">
                  Don't have an account?{' '}
                  <button
                    onClick={onToggleMode}
                    className="font-semibold underline"
                  >
                    Sign up
                  </button>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {showForgotModal && (
        <ForgotPasswordModal onClose={() => setShowForgotModal(false)} />
      )}
    </div>
  );
};

export default Login;
