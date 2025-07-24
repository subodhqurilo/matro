'use client';

import React, { useState, useEffect } from 'react';
import { FaHeart, FaBars, FaTimes, FaUserCircle, FaSignOutAlt, FaChevronDown } from 'react-icons/fa';
import { useRouter } from 'next/navigation';

import Level2Form from './login/Level2';
import SignupWrapper from './signup/SignupWrapper';
import Level1 from './login/Level1';

const navLinks = [
  { name: 'Home', href: '/' },
  { name: 'Matches', href: '/matches' },
  { name: 'Messages', href: '/messages' },
  { name: 'Inbox', href: '/inbox' },
];

export default function Navbar() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isSignupOpen, setIsSignupOpen] = useState(false);
  const [currentLevel, setCurrentLevel] = useState(1);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otp, setOtp] = useState('');
  const [mobileOpen, setMobileOpen] = useState(false);

  // Check auth status on component mount
  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);

  const handleLoginSuccess = (token: string) => {
    localStorage.setItem('authToken', token);
    setIsAuthenticated(true);
    setIsLoginOpen(false);
    setCurrentLevel(1);
  };

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    setIsAuthenticated(false);
    setIsProfileOpen(false);
    router.push('/');
  };

  const openLoginModal = () => {
    setIsLoginOpen(true);
    setIsSignupOpen(false);
    setCurrentLevel(1);
  };

  const openSignupModal = () => {
    setIsSignupOpen(true);
    setIsLoginOpen(false);
  };

  const handleContinueLevel1 = () => setCurrentLevel(2);
  const handleContinueLevel2 = async () => {
    try {
      // Here you would typically verify the OTP with your backend
      const response = await fetch('https://bxcfrrl4-3000.inc1.devtunnels.ms/auth/otp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ phoneNumber, otp }),
      });

      const data = await response.json();
      
      if (data.success) {
        handleLoginSuccess(data.token);
        // Reset form state
        setPhoneNumber('');
        setOtp('');
      } else {
        console.error('OTP verification failed:', data.message);
        // Handle error (show error message to user)
      }
    } catch (error) {
      console.error('Error verifying OTP:', error);
      // Handle error
    }
  };

  const handleBackLevel1 = () => setCurrentLevel(1); // Added missing function
  const handleBackLevel2 = () => setCurrentLevel(1); // Fixed - should go back to level 1

  return (
    <header className="sticky top-0 z-50 bg-[#FFF8F0] shadow">
      <nav className="max-w-7xl mx-auto flex items-center justify-between px-4 py-3 md:py-4">
        {/* Logo */}
        <div className="flex items-center space-x-2">
          <FaHeart className="text-red-500 text-2xl" />
          <span className="font-bold text-xl">Logo</span>
        </div>

        {/* Desktop Nav Links - Only show when authenticated */}
        {isAuthenticated && (
          <ul className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <li key={link.name}>
                <a
                  href={link.href}
                  className="text-gray-700 hover:text-[#7D0A0A] transition-colors duration-200 font-medium"
                >
                  {link.name}
                </a>
              </li>
            ))}
          </ul>
        )}

        {/* Auth Buttons */}
        <div className="hidden md:flex items-center">
          {!isAuthenticated ? (
            <button
              type="button"
              className="bg-[#7D0A0A] text-white px-7 py-3 rounded text-md font-semibold font-Mulish shadow-md hover:bg-[#5A0707] transition-colors duration-200"
              style={{ letterSpacing: '1px', height: '48px' }}
              onClick={openLoginModal}
            >
              Login
            </button>
          ) : (
            <div className="relative">
              <button
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                className="flex items-center space-x-2 focus:outline-none"
              >
                <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
                  <FaUserCircle className="text-3xl text-gray-600" />
                </div>
                <FaChevronDown className={`text-gray-600 transition-transform ${isProfileOpen ? 'transform rotate-180' : ''}`} />
              </button>
              
              {/* Profile Dropdown */}
              {isProfileOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50">
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center space-x-2"
                  >
                    <FaSignOutAlt />
                    <span>Sign out</span>
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Mobile Hamburger Menu */}
        <button
          className="md:hidden p-2 rounded focus:outline-none focus:ring-2 focus:ring-red-500"
          onClick={() => setMobileOpen((prev) => !prev)}
        >
          {mobileOpen ? (
            <FaTimes className="text-2xl text-gray-700" />
          ) : (
            <FaBars className="text-2xl text-gray-700" />
          )}
        </button>
      </nav>

      {/* Mobile Nav */}
      {mobileOpen && (
        <div className="md:hidden bg-white shadow px-4 pb-4 animate-fade-in-down">
          <ul className="flex flex-col space-y-3 mt-2">
            {navLinks.map((link) => (
              <li key={link.name}>
                <a
                  href={link.href}
                  className="block text-gray-700 hover:text-red-500 transition-colors duration-200 font-medium"
                  onClick={() => setMobileOpen(false)}
                >
                  {link.name}
                </a>
              </li>
            ))}
            <li>
              <button
                className="block bg-red-500 text-white px-5 py-2 rounded hover:bg-red-600 transition-colors duration-200 font-semibold shadow text-center w-full"
                onClick={() => {
                  setMobileOpen(false);
                  openLoginModal();
                }}
              >
                Login
              </button>
            </li>
          </ul>
        </div>
      )}

      {/* ✅ LOGIN MODAL */}
      {isLoginOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40 backdrop-blur-sm">
          <div className="relative bg-white rounded-lg shadow-xl w-full max-w-md p-6">
            <button
              className="absolute right-3 top-3 text-gray-500 hover:text-red-500"
              onClick={() => setIsLoginOpen(false)}
            >
              ✕
            </button>

            {currentLevel === 1 && (
              <Level1
                phoneNumber={phoneNumber}
                setPhoneNumber={setPhoneNumber}
                onBack={handleBackLevel1}
                handleContinueLevel1={handleContinueLevel1}
                openSignupModal={openSignupModal} // Added missing prop
              />
            )}

            {currentLevel === 2 && (
              <Level2Form
                otp={otp}
                setOtp={setOtp}
                onBack={handleBackLevel2}
                handleContinueLevel2={handleContinueLevel2}
                phoneNumber={phoneNumber} // Added missing prop
              />
            )}
          </div>
        </div>
      )}

      {/* ✅ SIGNUP MODAL */}
      {isSignupOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40 backdrop-blur-sm">
          <div className="relative bg-white rounded-lg shadow-xl w-full max-w-md p-6">
            <button
              className="absolute right-3 top-3 text-gray-500 hover:text-red-500"
              onClick={() => setIsSignupOpen(false)}
            >
              ✕
            </button>
            <SignupWrapper />
          </div>
        </div>
      )}
    </header>
  );
}