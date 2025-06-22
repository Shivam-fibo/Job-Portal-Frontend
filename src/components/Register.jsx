import React, { useState } from 'react';
import {
  Eye, EyeOff, Mail, Lock, User,
  GraduationCap, Building2, Users, Sparkles, Shield, CheckCircle
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Register = ({ onToggleMode }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    role: 'student'
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [otp, setOtp] = useState('');
const [isOTPSent, setIsOTPSent] = useState(false);
const [isVerified, setIsVerified] = useState(false);


  const navigate = useNavigate();
  const { login } = useAuth();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError('');
  };
const handleSubmit = async (e) => {
  e.preventDefault();
  setLoading(true);
  setError('');

  if (formData.password !== formData.confirmPassword) {
    setError('Passwords do not match');
    setLoading(false);
    return;
  }

  if (formData.password.length < 6) {
    setError('Password must be at least 6 characters long');
    setLoading(false);
    return;
  }

  if (formData.role === 'student' && !formData.email.endsWith('@edu.in')) {
    setError('Student email must end with @edu.in');
    setLoading(false);
    return;
  }

  try {
    const res = await fetch('http://localhost:5000/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
       credentials: 'include',
      body: JSON.stringify({
        email: formData.email,
        password: formData.password,
        role: formData.role
      }),
    });

    const data = await res.json();
    if (res.ok) {
      setIsOTPSent(true); // show OTP input
    } else {
      setError(data.message || 'Registration failed');
    }
  } catch {
    setError('Network error. Please try again.');
  } finally {
    setLoading(false);
  }
};


const handleVerifyOTP = async () => {
  setLoading(true);
  setError('');
  try {
    const res = await fetch('http://localhost:5000/api/auth/verify-otp', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
       credentials: 'include',
      body: JSON.stringify({ email: formData.email, otp }),
    });

    const data = await res.json();
    if (res.ok) {
      login( data.user); 
      navigate('/dashboard');
    } else {
      setError(data.message || 'Invalid OTP');
    }
  } catch {
    setError('Network error. Please try again.');
  } finally {
    setLoading(false);
  }
};



  const roleConfigs = {
    student: {
      title: "Start Your Journey",
      subtitle: "Join thousands of students finding their dream careers",
      image: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=600&h=800&fit=crop",
      icon: GraduationCap,
      features: [
        "Access to 7000+ job opportunities",
        "Personalized career matching",
        "Skill assessment tools"
      ],
      colors: {
        top: "#3B82F6",
        middle: "#fffaff",
        bottom: "#8e8f8d"
      }
    },
    hod: {
      title: "Department Leadership",
      subtitle: "Manage and empower your academic department",
      image: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=600&h=800&fit=crop",
      icon: Building2,
      features: [
        "Student progress tracking",
        "Placement analytics dashboard",
        "Industry partnership management"
      ],
      colors: {
        top: "#311C5A",
        middle: "#f7f8fa",
        bottom: "#FEFFFE"
      }
    },
    placement_officer: {
      title: "Placement Excellence",
      subtitle: "Connect talent with opportunity seamlessly",
      image: "https://images.unsplash.com/photo-1551434678-e076c223a692?w=600&h=800&fit=crop",
      icon: Users,
      features: [
        "Recruitment drive coordination",
        "Company relationship management",
        "Placement success tracking"
      ],
      colors: {
        top: "#164BA1",
        middle: "#ADB4BF",
        bottom: "#F0F4FA"
      }
    }
  };

  const currentRole = roleConfigs[formData.role];
  const RoleIcon = currentRole.icon;

  return (
    <div className="min-h-screen flex items-center justify-center p-4" style={{ backgroundColor: currentRole.colors.bottom }}>
      <div className="w-full rounded-3xl shadow-2xl overflow-hidden" style={{ backgroundColor: currentRole.colors.middle }}>
        <div className="grid lg:grid-cols-2 min-h-[600px]">
          {/* Left Side */}
          <div className="p-8 lg:p-12 flex flex-col justify-center text-white" style={{ backgroundColor: currentRole.colors.top }}>
            <div className="relative z-10">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 rounded-2xl mb-6">
                <RoleIcon className="h-8 w-8 text-white" />
              </div>
              <h1 className="text-3xl lg:text-4xl font-bold mb-4 leading-tight">{currentRole.title}</h1>
              <p className="text-xl mb-8 text-white/90">{currentRole.subtitle}</p>
              <div className="space-y-4">
                {currentRole.features.map((feature, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-green-300 flex-shrink-0" />
                    <span className="text-white/90">{feature}</span>
                  </div>
                ))}
              </div>
              <div className="mt-8 lg:mt-12">
                <img
                  src={currentRole.image}
                  alt={`${formData.role} illustration`}
                  className="w-full max-w-xs h-48 object-cover rounded-2xl shadow-2xl mx-auto lg:mx-0"
                />
              </div>
            </div>
          </div>

          {/* Right Side */}
          <div className="p-8 lg:p-12 flex flex-col justify-center">
            <div className="w-full max-w-md mx-auto">
              <div className="text-center mb-8">
                <div className="flex items-center justify-center gap-2 mb-4">
                  <Sparkles className="h-6 w-6 text-gray-700" />
                  <span className="text-sm font-medium uppercase tracking-wider text-gray-700">
                    {formData.role.replace('_', ' ')} Registration
                  </span>
                </div>
                <h2 className="text-3xl font-bold text-gray-900 mb-2">Create Account</h2>
                <p className="text-gray-600">Sign up for a new account</p>
              </div>

              <form onSubmit={handleSubmit}>
                {error && (
                  <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl mb-6 flex items-center gap-2">
                    <Shield className="h-5 w-5 flex-shrink-0" />
                    <span>{error}</span>
                  </div>
                )}

                <div className="space-y-6">
                  {/* Email */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Email Address</label>
                    <div className="relative group">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <Mail className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-xl bg-gray-50 focus:bg-white outline-none"
                        placeholder="Enter your email"
                      />
                    </div>
                  </div>

                  {/* Role */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Select Your Role</label>
                    <div className="relative group">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <User className="h-5 w-5 text-gray-400" />
                      </div>
                      <select
                        name="role"
                        value={formData.role}
                        onChange={handleChange}
                        className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-xl bg-gray-50 focus:bg-white outline-none"
                      >
                        <option value="student">Student</option>
                        <option value="hod">Head of Department</option>
                        <option value="placement_officer">Placement Officer</option>
                      </select>
                    </div>
                  </div>

                  {/* Password */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Password</label>
                    <div className="relative group">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <Lock className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        type={showPassword ? 'text' : 'password'}
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                        className="w-full pl-12 pr-14 py-4 border-2 border-gray-200 rounded-xl bg-gray-50 focus:bg-white outline-none"
                        placeholder="Enter your password"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute inset-y-0 right-0 pr-4 flex items-center"
                      >
                        {showPassword ? <EyeOff className="h-5 w-5 text-gray-400" /> : <Eye className="h-5 w-5 text-gray-400" />}
                      </button>
                    </div>
                  </div>

                  {/* Confirm Password */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Confirm Password</label>
                    <div className="relative group">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <Lock className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        type={showConfirmPassword ? 'text' : 'password'}
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        required
                        className="w-full pl-12 pr-14 py-4 border-2 border-gray-200 rounded-xl bg-gray-50 focus:bg-white outline-none"
                        placeholder="Confirm your password"
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute inset-y-0 right-0 pr-4 flex items-center"
                      >
                        {showConfirmPassword ? <EyeOff className="h-5 w-5 text-gray-400" /> : <Eye className="h-5 w-5 text-gray-400" />}
                      </button>
                    </div>
                  </div>

                  {/* Submit */}
                  <button
                    type="submit"
                    disabled={loading}
                    style={{ backgroundColor: currentRole.colors.top }}
                    className="w-full text-white font-semibold py-4 px-6 rounded-xl transition-all duration-300 shadow-lg hover:opacity-90 disabled:opacity-50"
                  >
                    {loading ? (
                      <div className="flex items-center justify-center gap-3">
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        Creating Account...
                      </div>
                    ) : (
                      'Create Account'
                    )}
                  </button>
                </div>
              </form>

              {isOTPSent && (
  <div className="mt-6 space-y-4">
    <label className="block text-sm font-semibold text-gray-700">Enter OTP sent to your email</label>
    <input
      type="text"
      value={otp}
      onChange={(e) => setOtp(e.target.value)}
      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl bg-gray-50 focus:bg-white outline-none"
      placeholder="Enter OTP"
    />
    <button
      type="button"
      onClick={handleVerifyOTP}
      style={{ backgroundColor: currentRole.colors.top }}
      className="w-full text-white font-semibold py-3 rounded-xl shadow-md hover:opacity-90"
    >
      {loading ? 'Verifying OTP...' : 'Verify OTP & Continue'}
    </button>
  </div>
)}


              <div className="mt-8 text-center">
                <p className="text-gray-600">
                  Already have an account?{' '}
                  <button
                    onClick={onToggleMode}
                    style={{ color: currentRole.colors.top }}
                    className="font-semibold hover:opacity-80"
                  >
                    Sign in
                  </button>
                </p>
              </div>

              {formData.role === 'student' && (
                <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-xl">
                  <p className="text-sm text-blue-700">
                    <strong>Note:</strong> Student email must end with @edu.in
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
