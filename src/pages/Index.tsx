import React from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';
import DarkModeToggle from '../components/DarkModeToggle';
import { ArrowRight, Mic, MessageSquare, Zap } from 'lucide-react';

const Index: React.FC = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: <Mic className="h-6 w-6" />,
      title: "Multilingual Voice AI",
      description: "Natural conversations in Indian languages and dialects"
    },
    {
      icon: <MessageSquare className="h-6 w-6" />,
      title: "Smart Automation",
      description: "Automate calls, support, and customer outreach"
    },
    {
      icon: <Zap className="h-6 w-6" />,
      title: "Scale Your Business",
      description: "Handle thousands of conversations simultaneously"
    }
  ];

  return (
    <Layout showNavigation>
      <div className="relative min-h-screen overflow-hidden">
        {/* Dark Mode Toggle */}
        <div className="absolute top-4 right-4 z-10">
          <DarkModeToggle />
        </div>

        {/* Hero Section */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
          <div className="text-center">
            <h1 className="text-4xl sm:text-6xl font-bold text-gray-900 dark:text-white mb-6">
              Voice AI for
              <span className="block bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                Indian Businesses
              </span>
            </h1>
            
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto">
              Revolutionary multilingual voice agents that speak naturally in Indian languages, 
              helping SMBs automate customer interactions and scale their operations.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
              <button
                onClick={() => navigate('/signup')}
                className="group bg-gradient-to-r from-purple-600 to-blue-600 text-white px-8 py-4 rounded-xl hover:from-purple-700 hover:to-blue-700 transition-all duration-300 transform hover:scale-105 flex items-center gap-2 shadow-lg hover:shadow-xl"
              >
                Get Started Free
                <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </button>
              
              <button
                onClick={() => navigate('/login')}
                className="px-8 py-4 rounded-xl border-2 border-purple-600 text-purple-600 dark:text-purple-400 hover:bg-purple-600 hover:text-white dark:border-purple-400 dark:hover:bg-purple-400 dark:hover:text-gray-900 transition-all duration-300"
              >
                Sign In
              </button>
            </div>

            {/* Features Grid */}
            <div className="grid md:grid-cols-3 gap-8 mt-20">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-md rounded-2xl p-6 border border-gray-200 dark:border-gray-700 hover:transform hover:scale-105 transition-all duration-300 hover:shadow-xl"
                >
                  <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white p-3 rounded-xl w-fit mb-4">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Background Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-80 h-80 rounded-full bg-gradient-to-r from-purple-400 to-blue-400 opacity-20 blur-3xl"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 rounded-full bg-gradient-to-r from-blue-400 to-indigo-400 opacity-20 blur-3xl"></div>
        </div>
      </div>
    </Layout>
  );
};

export default Index;
