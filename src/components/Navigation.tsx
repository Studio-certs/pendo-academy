import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Home, Users, BookOpen, User, LogOut, GraduationCap } from 'lucide-react';
import UserAvatar from './UserAvatar';

export default function Navigation() {
  const { user, isAdmin, signOut } = useAuth();
  const location = useLocation();

  const handleLogout = async () => {
    await signOut();
  };

  return (
    <>
      {/* Top navigation */}
      <nav className="fixed top-0 left-0 right-0 bg-white shadow-sm z-50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Mobile: Only Logo */}
            <div className="md:hidden w-full flex justify-center">
              <Link to="/" className="flex items-center">
                <UserAvatar
                  src="https://rgltgdklkrksczphrupu.supabase.co/storage/v1/object/public/images//PENDO-ACADEMY.png"
                  alt="Logo"
                  size="md"
                />
              </Link>
            </div>

            {/* Desktop: Logo and Navigation */}
            <div className="hidden md:flex items-center justify-between w-full">
              <Link to="/" className="flex items-center">
                <UserAvatar
                  src="https://rgltgdklkrksczphrupu.supabase.co/storage/v1/object/public/images//PENDO-ACADEMY.png"
                  alt="Logo"
                  size="lg"
                />
              </Link>
              <div className="flex items-center space-x-4">
                {user ? (
                  <>
                    <Link 
                      to="/my-learning"
                      className="text-gray-600 hover:text-gray-900 flex items-center"
                    >
                      <GraduationCap className="w-4 h-4 mr-1" />
                      My Learning
                    </Link>
                    <Link 
                      to="/meetups"
                      className="text-gray-600 hover:text-gray-900 flex items-center"
                    >
                      <Users className="w-4 h-4 mr-1" />
                      Meetups
                    </Link>
                    <Link to="/profile" className="text-gray-600 hover:text-gray-900">Profile</Link>
                    {isAdmin && (
                      <Link to="/admin" className="text-gray-600 hover:text-gray-900">Admin</Link>
                    )}
                    <button
                      onClick={handleLogout}
                      className="flex items-center text-gray-600 hover:text-gray-900"
                    >
                      <LogOut className="w-4 h-4 mr-1" />
                      Logout
                    </button>
                  </>
                ) : (
                  <>
                    <Link to="/" className={`text-gray-600 hover:text-gray-900 ${location.pathname === '/' ? 'font-medium' : ''}`}>Home</Link>
                    <Link to="/meetups" className={`text-gray-600 hover:text-gray-900 ${location.pathname.startsWith('/meetups') ? 'font-medium' : ''}`}>Meetups</Link>
                    <Link to="/courses" className={`text-gray-600 hover:text-gray-900 ${location.pathname.startsWith('/courses') ? 'font-medium' : ''}`}>Courses</Link>
                    <Link to="/login" className="text-gray-600 hover:text-gray-900">Login</Link>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Bottom navigation for mobile */}
      <nav className="fixed bottom-0 left-0 right-0 md:hidden bg-white border-t border-gray-200 z-50">
        <div className={`grid h-16 ${user ? 'grid-cols-5' : 'grid-cols-4'}`}>
          <Link
            to="/"
            className={`flex flex-col items-center justify-center w-full ${
              location.pathname === '/' ? 'text-blue-600' : 'text-gray-600'
            }`}
          >
            <Home size={24} />
            <span className="text-xs mt-1">Home</span>
          </Link>
          <Link
            to="/meetups"
            className={`flex flex-col items-center justify-center w-full ${
              location.pathname.startsWith('/meetups') ? 'text-blue-600' : 'text-gray-600'
            }`}
          >
            <Users size={24} />
            <span className="text-xs mt-1">Meetups</span>
          </Link>
          <Link
            to="/courses"
            className={`flex flex-col items-center justify-center w-full ${
              location.pathname.startsWith('/courses') ? 'text-blue-600' : 'text-gray-600'
            }`}
          >
            <BookOpen size={24} />
            <span className="text-xs mt-1">Courses</span>
          </Link>
          {user ? (
            <>
              <Link
                to="/profile"
                className={`flex flex-col items-center justify-center w-full ${
                  location.pathname === '/profile' ? 'text-blue-600' : 'text-gray-600'
                }`}
              >
                <User size={24} />
                <span className="text-xs mt-1">Profile</span>
              </Link>
              <button
                onClick={handleLogout}
                className={`flex flex-col items-center justify-center w-full ${
                  location.pathname === '/login' ? 'text-blue-600' : 'text-gray-600'
                }`}
              >
                <LogOut size={24} />
                <span className="text-xs mt-1">Logout</span>
              </button>
            </>
          ) : (
            <Link
              to="/login"
              className={`flex flex-col items-center justify-center w-full ${
                location.pathname === '/login' ? 'text-blue-600' : 'text-gray-600'
              }`}
            >
              <User size={24} />
              <span className="text-xs mt-1">Login</span>
            </Link>
          )}
        </div>
      </nav>
    </>
  );
}
