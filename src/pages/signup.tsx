import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';
import AuthForm from '../components/AuthForm';
import DarkModeToggle from '../components/DarkModeToggle';
import { ArrowLeft } from 'lucide-react';

const Signup: React.FC = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSignup = async (formData: any) => {
    setLoading(true);
    setError('');

    try {
      // Load existing users
      const existingUsers = JSON.parse(localStorage.getItem('users') || '[]');
      
      // Check if user already exists
      if (existingUsers.find((user: any) => user.email === formData.email)) {
        setError('User with this email already exists');
        setLoading(false);
        return;
      }

      // Add new user
      const newUser = {
        id: Date.now(),
        username: formData.username,
        email: formData.email,
        password: formData.password,
        phone: formData.phone || '',
        createdAt: new Date().toISOString()
      };

      existingUsers.push(newUser);
      localStorage.setItem('users', JSON.stringify(existingUsers));

      setSuccess('Account created successfully! Redirecting to login...');
      setTimeout(() => {
        navigate('/login');
      }, 2000);
    } catch (err) {
      setError('Failed to create account. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        {/* Dark Mode Toggle */}
        <div className="absolute top-4 right-4">
          <DarkModeToggle />
        </div>

        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="absolute top-4 left-4 p-2 rounded-lg bg-white/20 dark:bg-gray-800/50 backdrop-blur-sm border border-gray-200 dark:border-gray-700 hover:bg-white/30 dark:hover:bg-gray-700/50 transition-all duration-300"
        >
          <ArrowLeft className="h-5 w-5 text-gray-600 dark:text-gray-400" />
        </button>

        <div className="max-w-md w-full space-y-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              proPAL AI
            </h2>
            <h3 className="mt-6 text-2xl font-bold text-gray-900 dark:text-white">
              Create your account
            </h3>
            <p className="mt-2 text-gray-600 dark:text-gray-400">
              Join thousands of businesses using Voice AI
            </p>
          </div>

          <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-md rounded-2xl p-8 border border-gray-200 dark:border-gray-700 shadow-xl">
            {success && (
              <div className="mb-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 text-green-600 dark:text-green-400 px-4 py-3 rounded-lg">
                {success}
              </div>
            )}
            
            <AuthForm 
              type="signup" 
              onSubmit={handleSignup} 
              loading={loading} 
              error={error} 
            />

            <div className="mt-6 text-center">
              <p className="text-gray-600 dark:text-gray-400">
                Already have an account?{' '}
                <button
                  onClick={() => navigate('/login')}
                  className="text-purple-600 dark:text-purple-400 hover:text-purple-500 dark:hover:text-purple-300 font-medium transition-colors"
                >
                  Sign in here
                </button>
              </p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Signup;
