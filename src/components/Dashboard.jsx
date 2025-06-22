import React, { useEffect, useState } from 'react';
import {
  GraduationCap,
  Building2,
  Users,
  TrendingUp,
  Award,
  Briefcase,
  Target,
  BarChart3,
  UserCheck,
  Calendar,
  FileText,
  ArrowRight,
  Sparkles,
  ChevronRight,
  Info,
  Mail,
  TargetIcon,
  Eye,
  Heart,
  Star,
  Rocket,
  Lightbulb
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const { user: authUser } = useAuth();
  const userRole = authUser?.role || 'student';
  const [isVisible, setIsVisible] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const handleRoleNavigation = () => {
    switch (userRole) {
      case 'student':
        navigate('/student')
        console.log('Navigating to student dashboard');
        break;
      case 'hod':
        navigate('/hod')
        console.log('Navigating to HOD dashboard');
        break;
      case 'placement_officer':
        navigate('/placement')
        console.log('Navigating to placement officer dashboard');
        break;
      default:
        console.log('Role not recognized');
        break;
    }
  };

  const handleAboutUs = () => navigate('/aboutus');
  const handleContactUs = () => navigate('/contactus');
  const handleOurMission = () => navigate('/ourmission');
  const handleOurVision = () => navigate('/ourvision');
  const handleWhyChooseUs = () => navigate('/whychooseus');
const roleConfigs = {
  student: {
    title: "Launch Your Career Journey",
    subtitle: "Access 7000+ Premium Opportunities",
    description:
      "Connect with top companies, build your profile, and kickstart your professional journey with personalized job recommendations.",
    buttonText: "Explore Opportunities",
    gradient: "bg-[#3B82F6]",
    bgGradient: "bg-[#dae9ff]",
    cardGradient: "bg-[#F5EFEB]",
    image:
      "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=400&h=300&fit=crop",
    stats: [
      { number: "1,75,324", label: "Active Job Listings", icon: Briefcase },
      { number: "97,354", label: "Partner Companies", icon: Building2 },
      { number: "38,47,154", label: "Student Profiles", icon: Users },
      { number: "7,532", label: "Monthly Placements", icon: TrendingUp }
    ],
    features: [
      {
        icon: Target,
        title: "Personalized Matching",
        desc: "AI-powered job recommendations based on your skills and interests"
      },
      {
        icon: Award,
        title: "Skill Assessment",
        desc: "Comprehensive evaluation tools to showcase your abilities"
      },
      {
        icon: Calendar,
        title: "Interview Scheduling",
        desc: "Seamless coordination with recruiters and companies"
      }
    ]
  },
  hod: {
    title: "Department Excellence Dashboard",
    subtitle: "Streamline Academic & Placement Operations",
    description:
      "Manage student progress, track placement statistics, and coordinate with industry partners for optimal outcomes.",
    buttonText: "Access Dashboard",
    gradient: "bg-[#311C5A]",
    bgGradient: "bg-gray-300",
    cardGradient: "bg-[#F7F9FB]",
    image:
      "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&h=300&fit=crop",
    stats: [
      { number: "89%", label: "Department Placement Rate", icon: TrendingUp },
      { number: "1,240", label: "Students Managed", icon: Users },
      { number: "156", label: "Industry Partners", icon: Building2 },
      { number: "45", label: "Active Programs", icon: FileText }
    ],
    features: [
      {
        icon: BarChart3,
        title: "Analytics & Reports",
        desc: "Comprehensive insights into student performance and placement trends"
      },
      {
        icon: UserCheck,
        title: "Student Monitoring",
        desc: "Track individual progress and provide targeted guidance"
      },
      {
        icon: Building2,
        title: "Industry Relations",
        desc: "Manage partnerships and coordinate recruitment drives"
      }
    ]
  },
  placement_officer: {
    title: "Placement Coordination Hub",
    subtitle: "Connect Talent with Opportunities",
    description:
      "Facilitate seamless recruitment processes, manage company relationships, and maximize placement success rates.",
    buttonText: "Manage Placements",
    gradient: "from-[#164BA1] to-[#164BA1]",
    bgGradient: "bg-gradient-to-b from-[#164BA1] via-[#ADB4BF] to-[#F0F4FA]",
    cardGradient: "bg-[#ADB4BF]",
    image:
      "https://images.unsplash.com/photo-1551434678-e076c223a692?w=400&h=300&fit=crop",
    stats: [
      { number: "2,840", label: "Successful Placements", icon: Award },
      { number: "387", label: "Recruiting Companies", icon: Building2 },
      { number: "156", label: "Active Drives", icon: Calendar },
      { number: "92%", label: "Success Rate", icon: TrendingUp }
    ],
    features: [
      {
        icon: Calendar,
        title: "Drive Management",
        desc: "Schedule and coordinate recruitment drives efficiently"
      },
      {
        icon: Users,
        title: "Candidate Screening",
        desc: "Match the right students with appropriate opportunities"
      },
      {
        icon: BarChart3,
        title: "Performance Tracking",
        desc: "Monitor placement metrics and optimize processes"
      }
    ]
  }
};
  const currentRole = roleConfigs[userRole];

  return (
    <div className={`min-h-screen ${currentRole.bgGradient}`}>
      {/* Hero Section */}
      <div
        className={`relative overflow-hidden bg-gradient-to-br ${currentRole.gradient} transition-all duration-1000 ${
          isVisible ? "opacity-100" : "opacity-0"
        }`}
      >
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative px-6 py-20 max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div
              className={`text-white transform transition-all duration-1000 delay-300 ${
                isVisible ? "translate-x-0 opacity-100" : "-translate-x-10 opacity-0"
              }`}
            >
              <div className="flex items-center gap-2 mb-4">
                <Sparkles className="h-6 w-6 text-yellow-300 animate-pulse" />
                <span className="text-sm font-medium uppercase tracking-wider text-white/80">
                  {userRole.replace("_", " ")} Portal
                </span>
              </div>
              <h1 className="text-4xl lg:text-6xl font-bold mb-6 leading-tight">
                {currentRole.title}
              </h1>
              <p className="text-xl lg:text-2xl mb-4 text-white/90">
                {currentRole.subtitle}
              </p>
              <p className="text-lg mb-8 text-white/80 max-w-xl">
                {currentRole.description}
              </p>
              <button
                onClick={handleRoleNavigation}
                className="group inline-flex items-center gap-3 px-8 py-4 bg-white text-gray-900 rounded-xl font-semibold text-lg hover:bg-gray-100 transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl"
              >
                {currentRole.buttonText}
                <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>

            <div
              className={`transform transition-all duration-1000 delay-500 ${
                isVisible ? "translate-x-0 opacity-100" : "translate-x-10 opacity-0"
              }`}
            >
              <div className="relative">
                <div className="absolute -inset-4 bg-white/20 rounded-2xl blur-xl"></div>
                <img
                  src={currentRole.image}
                  alt={`${userRole} dashboard`}
                  className="relative w-full h-80 object-cover rounded-2xl shadow-2xl"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className={`py-16 px-6 ${currentRole.bgGradient}`}>
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {currentRole.stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div
                key={index}
                className={`${currentRole.cardGradient} p-6 rounded-2xl shadow-lg hover:shadow-xl transition duration-500 border border-white/50`}
              >
                <div className={`inline-flex items-center justify-center w-12 h-12 bg-gradient-to-r ${currentRole.gradient} rounded-xl mb-4`}>
                  <Icon className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">{stat.number}</h3>
                <p className="text-gray-700">{stat.label}</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Features */}
      <div className={`py-16 px-6 ${currentRole.bgGradient}`}>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Designed for {userRole.replace("_", " ")} Success
            </h2>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto">
              Everything you need to excel in your role, powered by cutting-edge technology
            </p>
          </div>
          <div className="grid lg:grid-cols-3 gap-8">
            {currentRole.features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div
                  key={index}
                  className={`group ${currentRole.cardGradient} p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-500 hover:-translate-y-2 border border-white/50`}
                >
                  <div className={`inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r ${currentRole.gradient} rounded-2xl mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">{feature.title}</h3>
                  <p className="text-gray-700 leading-relaxed">{feature.desc}</p>
                  <div className="mt-6 flex items-center text-sm font-medium text-gray-600 group-hover:text-gray-800">
                    Learn more <ChevronRight className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Navigation Buttons - Expanded */}
      <div className={`py-12 px-6 ${currentRole.bgGradient}`}>
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-5 gap-6">
          {/* About Us Button */}
          <button 
            onClick={handleAboutUs}
            className={`group flex flex-col items-center justify-center p-6 ${currentRole.cardGradient} rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-white/50`}
          >
            <div className="w-14 h-14 bg-gradient-to-r from-blue-500 via-purple-500 to-indigo-500 rounded-full flex items-center justify-center mb-3 group-hover:rotate-6 transition-transform">
              <Info className="h-6 w-6 text-white" />
            </div>
            <h3 className="text-lg font-bold text-gray-800 mb-1">About Us</h3>
            <p className="text-sm text-gray-700 text-center">Learn about our platform</p>
            <div className="mt-3 text-blue-600 flex items-center text-xs group-hover:text-blue-800 transition-colors">
              Explore <ChevronRight className="h-3 w-3 ml-1 group-hover:translate-x-1 transition-transform" />
            </div>
          </button>

          {/* Contact Us Button */}
          <button 
            onClick={handleContactUs}
            className={`group flex flex-col items-center justify-center p-6 ${currentRole.cardGradient} rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-white/50`}
          >
            <div className="w-14 h-14 bg-gradient-to-r from-green-500 via-teal-500 to-cyan-500 rounded-full flex items-center justify-center mb-3 group-hover:rotate-6 transition-transform">
              <Mail className="h-6 w-6 text-white" />
            </div>
            <h3 className="text-lg font-bold text-gray-800 mb-1">Contact Us</h3>
            <p className="text-sm text-gray-700 text-center">Get in touch with us</p>
            <div className="mt-3 text-green-600 flex items-center text-xs group-hover:text-green-800 transition-colors">
              Reach out <ChevronRight className="h-3 w-3 ml-1 group-hover:translate-x-1 transition-transform" />
            </div>
          </button>

          {/* Our Mission Button */}
          <button 
            onClick={handleOurMission}
            className={`group flex flex-col items-center justify-center p-6 ${currentRole.cardGradient} rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-white/50`}
          >
            <div className="w-14 h-14 bg-gradient-to-r from-orange-500 via-red-500 to-pink-500 rounded-full flex items-center justify-center mb-3 group-hover:rotate-6 transition-transform">
              <TargetIcon className="h-6 w-6 text-white" />
            </div>
            <h3 className="text-lg font-bold text-gray-800 mb-1">Our Mission</h3>
            <p className="text-sm text-gray-700 text-center">Our core purpose</p>
            <div className="mt-3 text-orange-600 flex items-center text-xs group-hover:text-orange-800 transition-colors">
              Learn more <ChevronRight className="h-3 w-3 ml-1 group-hover:translate-x-1 transition-transform" />
            </div>
          </button>

          {/* Our Vision Button */}
          <button 
            onClick={handleOurVision}
            className={`group flex flex-col items-center justify-center p-6 ${currentRole.cardGradient} rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-white/50`}
          >
            <div className="w-14 h-14 bg-gradient-to-r from-yellow-500 via-amber-500 to-orange-500 rounded-full flex items-center justify-center mb-3 group-hover:rotate-6 transition-transform">
              <Eye className="h-6 w-6 text-white" />
            </div>
            <h3 className="text-lg font-bold text-gray-800 mb-1">Our Vision</h3>
            <p className="text-sm text-gray-700 text-center">Our future aspirations</p>
            <div className="mt-3 text-yellow-600 flex items-center text-xs group-hover:text-yellow-800 transition-colors">
              Discover <ChevronRight className="h-3 w-3 ml-1 group-hover:translate-x-1 transition-transform" />
            </div>
          </button>

          {/* Why Choose Us Button */}
          <button 
            onClick={handleWhyChooseUs}
            className={`group flex flex-col items-center justify-center p-6 ${currentRole.cardGradient} rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-white/50`}
          >
            <div className="w-14 h-14 bg-gradient-to-r from-purple-500 via-pink-500 to-rose-500 rounded-full flex items-center justify-center mb-3 group-hover:rotate-6 transition-transform">
              <Star className="h-6 w-6 text-white" />
            </div>
            <h3 className="text-lg font-bold text-gray-800 mb-1">Why Choose Us</h3>
            <p className="text-sm text-gray-700 text-center">What makes us special</p>
            <div className="mt-3 text-purple-600 flex items-center text-xs group-hover:text-purple-800 transition-colors">
              See benefits <ChevronRight className="h-3 w-3 ml-1 group-hover:translate-x-1 transition-transform" />
            </div>
          </button>
        </div>
      </div>

      {/* Footer */}
      
    </div>
  );
};

export default Dashboard;