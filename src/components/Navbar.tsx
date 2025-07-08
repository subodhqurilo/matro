'use client';

import React, { useState } from 'react';
import { FaHeart, FaBars, FaTimes } from 'react-icons/fa';
import Level1Form from './login/Level1';
import Level2Form from './login/Level2';
import Level3Form from './login/Level3';

const navLinks = [
  { name: 'Home', href: '/' },
  { name: 'Matches', href: '/matches' },
  { name: 'Messages', href: '/messages' },
  { name: 'Inbox', href: '/inbox' },
];

export default function Navbar() {
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentLevel, setCurrentLevel] = useState(1);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otp, setOtp] = useState('');

 
  const handleContinueLevel1 = () => setCurrentLevel(2);
  const handleContinueLevel2 = () => setCurrentLevel(3);
  const handleContinueLevel3 = () => {
    setIsModalOpen(false);
    console.log('OTP Submitted:', otp); 
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
    setCurrentLevel(1);
  };

  const handleBackLevel2 = () => setCurrentLevel(1);
  const handleBackLevel3 = () => setCurrentLevel(2);

  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-[#FFF8F0] shadow">
      <nav className="max-w-7xl mx-auto flex items-center justify-between px-4 py-3 md:py-4">
        {/* Logo */}
        <div className="flex items-center space-x-2">
          <FaHeart className="text-red-500 text-2xl" />
          <span className="font-bold text-xl">Logo</span>
        </div>

        {/* Desktop Nav Links */}
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

        {/* Login Button */}
        <button
          type="button"
          className="bg-[#7D0A0A] text-white px-7 py-3 rounded text-md font-semibold font-Mulish shadow-md hover:bg-[#5A0707] transition-colors duration-200"
          style={{ letterSpacing: '1px', height: '48px' }}
          onClick={handleOpenModal}
        >
          Login
        </button>

        {/* Hamburger Menu Button */}
        <button
          className="md:hidden p-2 rounded focus:outline-none focus:ring-2 focus:ring-red-500"
          onClick={() => setMobileOpen((prev) => !prev)}
          aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
        >
          {mobileOpen ? (
            <FaTimes className="text-2xl text-gray-700" />
          ) : (
            <FaBars className="text-2xl text-gray-700" />
          )}
        </button>
      </nav>

      {/* Mobile Nav Links */}
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
                  handleOpenModal();
                }}
              >
                Login
              </button>
            </li>
          </ul>
        </div>
      )}

      
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-opacity-40 backdrop-blur">
          <div className="relative bg-[#FFFFF1] rounded-lg  shadow-xl w-full max-w-md mx-auto p-6 animate-fade-in">
            <button
              className="absolute right-3 top-3 text-gray-500 hover:text-red-500"
              onClick={() => setIsModalOpen(false)}
            >
              ✕
            </button>

            {currentLevel === 1 && (
              <Level1Form
                email={email}
                setEmail={setEmail}
                password={password}
                setPassword={setPassword}
                onBack={() => setIsModalOpen(false)}
                handleContinueLevel1={handleContinueLevel1}
              />
            )}

            {currentLevel === 2 && (
              <Level2Form
                phoneNumber={phoneNumber}
                setPhoneNumber={setPhoneNumber}
                onBack={handleBackLevel2}
                handleContinueLevel2={handleContinueLevel2}
              />
            )}

            {currentLevel === 3 && (
              <Level3Form
                otp={otp}
                setOtp={setOtp}
                onBack={handleBackLevel3}
                handleContinueLevel3={handleContinueLevel3}
              />
            )}
          </div>
        </div>
      )}
    </header>
  );
}
