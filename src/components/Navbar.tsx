import { UserButton, useUser } from '@clerk/clerk-react';
import { useNavigate } from 'react-router-dom';
import { Beaker } from 'lucide-react';

export default function Navbar() {
  const navigate = useNavigate();

  const getDashboardPath = (button: any) => {
    switch (button) {
      case 'superAdmin':
        return '/super-admin';
      case 'admin':
        return '/admin';
      default:
        return '/member';
    }
  };

  return (
    <nav className="bg-white/80 backdrop-blur-md border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center space-x-3 transition-all duration-200 hover:scale-105">
            <Beaker className="h-6 w-6 text-indigo-600" />
            <span className="text-lg font-semibold bg-gradient-to-r from-indigo-600 to-indigo-400 bg-clip-text text-transparent">
              AI Test Automation
            </span>
          </div>
          
          <div className="flex items-center space-x-6">
            <button
              onClick={() => navigate(getDashboardPath("member"))}
              className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-indigo-600 transition-colors duration-200 rounded-md hover:bg-indigo-50"
            >
              Dashboard
            </button>
            <button
              onClick={() => navigate(getDashboardPath("admin"))}
              className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-indigo-600 transition-colors duration-200 rounded-md hover:bg-indigo-50"
            >
              Admin
            </button>
            <div className="pl-2 border-l border-gray-200">
              <UserButton 
                afterSignOutUrl="/"
                appearance={{
                  elements: {
                    avatarBox: "h-8 w-8"
                  }
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};