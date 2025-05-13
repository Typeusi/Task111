import React from 'react';
import { useNavigate } from 'react-router-dom';
import { DatabaseIcon, LogOutIcon, PlusIcon, HomeIcon } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const handleCreateNew = () => {
    navigate('/record/new');
  };

  const handleGoHome = () => {
    navigate('/');
  };

  return (
    <nav className="bg-white border-b border-gray-200 fixed w-full z-10 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0 flex items-center">
              <DatabaseIcon className="h-8 w-8 text-blue-600" />
              <span className="ml-2 text-xl font-bold text-gray-800">DataManager</span>
            </div>
            {user && (
              <div className="ml-6 flex space-x-4">
                <button
                  onClick={handleGoHome}
                  className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-100 flex items-center"
                >
                  <HomeIcon className="h-4 w-4 mr-1" />
                  Dashboard
                </button>
              </div>
            )}
          </div>
          
          {user && (
            <div className="flex items-center space-x-4">
              <button
                onClick={handleCreateNew}
                className="px-3 py-2 rounded-md text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 flex items-center transition-colors"
              >
                <PlusIcon className="h-4 w-4 mr-1" />
                New Record
              </button>
              
              <div className="flex items-center">
                <span className="text-sm font-medium text-gray-700 mr-3">
                  {user.username}
                </span>
                <button
                  onClick={handleLogout}
                  className="p-2 rounded-full text-gray-500 hover:text-red-500 hover:bg-gray-100"
                  title="Logout"
                >
                  <LogOutIcon className="h-5 w-5" />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;