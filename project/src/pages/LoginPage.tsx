import React from 'react';
import { Navigate } from 'react-router-dom';
import { DatabaseIcon } from 'lucide-react';
import LoginForm from '../components/auth/LoginForm';
import { useAuth } from '../context/AuthContext';

const LoginPage = () => {
  const { isAuthenticated } = useAuth();

  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-white to-indigo-100 flex flex-col justify-center items-center p-4">
      <div className="mb-8 flex flex-col items-center animate-fade-in">
        <div className="bg-blue-600 p-3 rounded-full shadow-lg hover-pulse">
          <DatabaseIcon className="h-10 w-10 text-white" />
        </div>
        <h1 className="mt-4 text-4xl font-bold gradient-text">DataManager</h1>
        <p className="mt-2 text-gray-600">Manage your data efficiently</p>
      </div>
      <LoginForm />
      <p className="mt-8 text-sm text-gray-500 animate-fade-in" style={{ animationDelay: '0.3s' }}>
        &copy; {new Date().getFullYear()} Created by Aboelyazed hatem
      </p>
    </div>
  );
};

export default LoginPage;