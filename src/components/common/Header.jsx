import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import SignupModal from '../SignupModal';

const Header = () => {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, logout } = useAuth();
  const [showSignupModal, setShowSignupModal] = useState(false);

  const getNavLinkClass = (path) => {
    const baseClass = "text-[14px] font-medium leading-[17px] font-inter transition-colors duration-200";
    return `${baseClass} ${location.pathname === path ? 'text-[#d4a373]' : 'text-[black] hover:text-[#d4a373]'}`;
  };

  const handleLogout = async () => {
    try {
      await logout();
      // Redirect to home page after logout
      window.location.href = '/';
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  return (
    <>
      <header className="relative h-auto min-h-[60px] w-full bg-white border-b border-[#e5e8ea] flex flex-wrap items-center px-4 md:px-10">
        <div className="flex items-center">
          <Link to="/" className="flex items-center">
            <img
              src="/images/WhatsApp_Image_2024-10-26_at_02.46.15_72c5ae0f-removebg-preview.png"
              alt="JC Logo"
              className="mr-2 h-20 w-20 md:h-28 md:w-28" 
            />
            <h1 className="text-[16px] md:text-[18px] font-bold leading-[22px] text-[#d4a373] font-inter">
              Jamil Creation
            </h1>
          </Link>
        </div>
        
        {/* Mobile menu button */}
        <button 
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="ml-auto md:hidden p-2"
        >
          <svg 
            className="w-6 h-6 text-[#d4a373]" 
            fill="none" 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth="2" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            {isMenuOpen ? (
              <path d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>

        {/* Navigation links - Both mobile and desktop */}
        <nav className={`${
          isMenuOpen ? 'flex' : 'hidden'
        } md:flex flex-col md:flex-row w-full md:w-auto md:ml-auto items-center space-y-4 md:space-y-0 md:space-x-8 mt-4 md:mt-0`}>
          <Link to="/" className={getNavLinkClass('/')} >
            Home
          </Link>

          {user ? (
            <>
              <Link to="/dashboard" className={getNavLinkClass('/dashboard')}>
                Dashboard
              </Link>
              <Link to="/create-invoice" className={getNavLinkClass('/create-invoice')}>
                Create Invoice
              </Link>
              <button
                onClick={handleLogout}
                className="px-4 py-2 bg-[#d4a373] text-white rounded-lg text-sm font-medium hover:bg-[#cb997e] transition-colors duration-200 w-full md:w-auto text-center"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/download" className={getNavLinkClass('/download')}>
                Download
              </Link>
              <button
                onClick={() => setShowSignupModal(true)}
                className="px-4 py-2 bg-[#d4a373] text-white rounded-lg text-sm font-medium hover:bg-[#cb997e] transition-colors duration-200 w-full md:w-auto text-center"
              >
                Get Started
              </button>
            </>
          )}
        </nav>
      </header>
      <SignupModal 
        isOpen={showSignupModal} 
        onClose={() => setShowSignupModal(false)} 
      />
    </>
  );
};

export default Header;