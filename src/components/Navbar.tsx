'use client'
import React, { useState } from 'react';
import { FaHeart, FaBars, FaTimes } from 'react-icons/fa';

const navLinks = [
  { name: 'Home', href: '#' },
  { name: 'Services', href: '#' },
  { name: 'Menu', href: '#' },
  { name: 'Contact Us', href: '#' },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white shadow">
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
                className="text-gray-700 hover:text-red-500 transition-colors duration-200 font-medium"
              >
                {link.name}
              </a>
            </li>
          ))}
        </ul>
        {/* Login Button */}
        <div className="hidden md:block">
          <a
            href="#"
            className="bg-red-500 text-white px-5 py-2 rounded hover:bg-red-600 transition-colors duration-200 font-semibold shadow"
          >
            Login
          </a>
        </div>
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
              <a
                href="#"
                className="block bg-red-500 text-white px-5 py-2 rounded hover:bg-red-600 transition-colors duration-200 font-semibold shadow text-center"
                onClick={() => setMobileOpen(false)}
              >
                Login
              </a>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
} 