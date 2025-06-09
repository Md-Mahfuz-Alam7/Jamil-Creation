import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Header = () => {
  const location = useLocation();

  const getNavLinkClass = (path) => {
    const baseClass = "text-[14px] font-medium leading-[17px] font-inter transition-colors duration-200";
    return `${baseClass} ${location.pathname === path ? 'text-blue-600' : 'text-[#0c141c] hover:text-blue-600'}`;
  };

  return (
    <header className="h-[65px] w-full bg-white border-b border-[#e5e8ea] flex items-center px-10">
      <div className="flex items-center">
        <Link to="/" className="flex items-center">
          <img
            src="/images/img_depth_5_frame_0.svg"
            alt="Invoicer Logo"
            className="w-4 h-4 mr-4"
          />
          <h1 className="text-[18px] font-bold leading-[22px] text-[#0c141c] font-inter">
            Invoicer
          </h1>
        </Link>
      </div>
      
      <nav className="flex items-center ml-auto space-x-8">
        <Link to="/" className={getNavLinkClass('/')}>
          Home
        </Link>
        <Link to="/create-invoice" className={getNavLinkClass('/create-invoice')}>
          Invoice
        </Link>
        <Link to="/signup" className={getNavLinkClass('/signup')}>
          Sign Up
        </Link>
        <Link to="/download" className={getNavLinkClass('/download')}>
          Download
        </Link>
      </nav>
      
      <div className="flex items-center ml-8">
        <Link 
          to="/signup" 
          className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors duration-200"
        >
          Get Started
        </Link>
      </div>
    </header>
  );
};

export default Header;