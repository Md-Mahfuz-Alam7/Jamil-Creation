import React from 'react';
import { Link } from 'react-router-dom';
import { FaFacebookF, FaInstagram, FaTwitter, FaGithub } from 'react-icons/fa';

const Footer = () => {
    const socialLinks = [
        {
            icon: FaFacebookF,
            href: "https://www.facebook.com/profile.php?id=61565518928430",
            label: "Facebook"
        },
        {
            icon: FaInstagram,
            href: "https://www.instagram.com/jcreation2025",
            label: "Instagram"
        },
        {
            icon: FaTwitter,
            href: "#",
            label: "Twitter"
        },
        {
            icon: FaGithub,
            href: "#",
            label: "Github"
        }
    ];

    return (
        <footer className="bg-white border-t border-gray-100">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-4 lg:py-16">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-12">
                    {/* Logo and Social Section */}
                    <div className="lg:col-span-4 space-y-6">
                        <div className="flex items-center gap-4">
                            <img 
                                className="h-16 w-16 sm:h-20 sm:w-20 md:h-24 md:w-24 object-contain" 
                                src="/images/WhatsApp_Image_2024-10-26_at_02.46.15_72c5ae0f-removebg-preview.png" 
                                alt="Jamil Creation Logo"
                            />
                            <div className="flex flex-col">
                                <h1 className="text-xl sm:text-2xl font-bold text-[#d4a373]">
                                    Jamil Creation
                                </h1>
                                <p className="text-gray-600 text-sm sm:text-base mt-1">
                                    Connect Smarter, Chat Faster
                                </p>
                            </div>
                        </div>
                        <div className="flex space-x-4 lg:ml-6 sm:ml-2 md:ml-6">
                            {socialLinks.map((social, index) => (
                                <a
                                    key={index}
                                    href={social.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-800 text-white hover:bg-[#d4a373] transition-colors duration-200"
                                    aria-label={social.label}
                                >
                                    <social.icon className="w-4 h-4" />
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Quick Links Sections */}
                    <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-3 gap-8">
                        {/* Product Links */}
                        <div className="space-y-6">
                            <p className="text-sm font-semibold tracking-wider text-gray-400 uppercase">
                                Product
                            </p>
                            <ul className="space-y-4">
                                <li>
                                    <Link to="/features" className="text-gray-600 hover:text-[#d4a373] transition-colors duration-200">
                                        Features
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/download" className="text-gray-600 hover:text-[#d4a373] transition-colors duration-200">
                                        Download
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/signup" className="text-gray-600 hover:text-[#d4a373] transition-colors duration-200">
                                        Register
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/login" className="text-gray-600 hover:text-[#d4a373] transition-colors duration-200">
                                        Login
                                    </Link>
                                </li>
                            </ul>
                        </div>

                        {/* Company Links */}
                        <div className="space-y-6">
                            <p className="text-sm font-semibold tracking-wider text-gray-400 uppercase">
                                Company
                            </p>
                            <ul className="space-y-4">
                                <li>
                                    <Link to="/about" className="text-gray-600 hover:text-[#d4a373] transition-colors duration-200">
                                        About
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/careers" className="text-gray-600 hover:text-[#d4a373] transition-colors duration-200">
                                        Careers
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/blog" className="text-gray-600 hover:text-[#d4a373] transition-colors duration-200">
                                        Blog
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/press" className="text-gray-600 hover:text-[#d4a373] transition-colors duration-200">
                                        Press
                                    </Link>
                                </li>
                            </ul>
                        </div>

                        {/* Support Links */}
                        <div className="space-y-6">
                            <p className="text-sm font-semibold tracking-wider text-gray-400 uppercase">
                                Support
                            </p>
                            <ul className="space-y-4">
                                <li>
                                    <Link to="/help" className="text-gray-600 hover:text-[#d4a373] transition-colors duration-200">
                                        Help Center
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/contact" className="text-gray-600 hover:text-[#d4a373] transition-colors duration-200">
                                        Contact Us
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/privacy" className="text-gray-600 hover:text-[#d4a373] transition-colors duration-200">
                                        Privacy Policy
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/terms" className="text-gray-600 hover:text-[#d4a373] transition-colors duration-200">
                                        Terms of Service
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>

                {/* Copyright Section */}
                <div className="mt-12 pt-4">
                    <p className="text-center text-sm text-gray-500">
                        © {new Date().getFullYear()} Jamil Creation. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
