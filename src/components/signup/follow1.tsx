'use client';

import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ArrowLeft } from 'lucide-react';

type Follow1FormProps = {
  fullName: string;
  setFullName: (value: string) => void;
  email: string;
  setEmail: (value: string) => void;
  mobileNumber: string;
  setMobileNumber: (value: string) => void;
  createPassword: string;
  setCreatePassword: (value: string) => void;
  onBack: () => void;
  handleContinueFollow2: () => void;
};

const Follow1Form = ({
  fullName,
  setFullName,
  email,
  setEmail,
  mobileNumber,
  setMobileNumber,
  createPassword,
  setCreatePassword,
  onBack,
  handleContinueFollow2,
}: Follow1FormProps) => {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  // Function to parse full name into first, middle, and last names
  const parseFullName = (fullName: string) => {
    const nameParts = fullName.trim().split(' ');
    const firstName = nameParts[0] || '';
    const lastName = nameParts[nameParts.length - 1] || '';
    const middleName = nameParts.length > 2 ? nameParts.slice(1, -1).join(' ') : '';
    
    return { firstName, middleName, lastName };
  };

  // Function to handle registration API call
  const handleRegister = async () => {
    // Validate required fields
    if (!fullName.trim() || !mobileNumber.trim() || !createPassword.trim()) {
      setError('Please fill in all required fields');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      const { firstName, middleName, lastName } = parseFullName(fullName);
      
      const requestBody = {
        firstName,
        middleName: middleName || '',
        lastName: lastName || '',
        mobile: mobileNumber,
        password: createPassword,
        email: email
      };
      
      console.log('Sending registration request:', JSON.stringify(requestBody, null, 2));

      const response = await fetch('https://apimatri.qurilo.com/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        // Save token to localStorage
        if (data.token) {
          localStorage.setItem('token', data.token);
          console.log('Token saved to localStorage');
        }
        
        console.log('Registration successful! Token:', data.token);
        console.log('User ID:', data.userId);
        
        // Continue to next step
        handleContinueFollow2();
      } else {
        setError(data.message || 'Registration failed. Please try again.');
      }
    } catch (error) {
      console.error('Registration error:', error);
      setError('Network error. Please check your connection and try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="flex items-center space-x-3 mb-6">
        <button onClick={onBack}>
          <ArrowLeft className="h-5 w-5 text-gray-500 hover:text-rose-600 transition-colors" />
        </button>
        <h2 className="text-xl font-semibold text-gray-900">Register</h2>
      </div>

      {error && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-md">
          <p className="text-sm text-red-600">{error}</p>
        </div>
      )}

      <div className="space-y-4 mb-6">
        <div>
          <Label className="text-sm font-medium text-gray-700 mb-2 block">
            Full Name *
          </Label>
          <Input
            placeholder="Enter your full name"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            className="w-full bg-white"
            required
            disabled={isLoading}
          />
        </div>

        <div>
          <Label className="text-sm font-medium text-gray-700 mb-2 block">
            Email
          </Label>
          <Input
            type="email"
            placeholder="Enter your email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full bg-white"
            disabled={isLoading}
          />
        </div>

        <div>
          <Label className="text-sm font-medium text-gray-700 mb-2 block">
            Mobile Number *
          </Label>
          <Input
            placeholder="Enter your mobile number"
            value={mobileNumber}
            onChange={(e) => setMobileNumber(e.target.value)}
            className="w-full bg-white"
            required
            disabled={isLoading}
          />
        </div>

        <div>
          <Label className="text-sm font-medium text-gray-700 mb-2 block">
            Create Password *
          </Label>
          <div className="relative">
            <Input
              type={showPassword ? "text" : "password"}
              placeholder="Create a secure password"
              value={createPassword}
              onChange={(e) => setCreatePassword(e.target.value)}
              className="w-full bg-white pr-10"
              required
              disabled={isLoading}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
              disabled={isLoading}
            >
              {showPassword ? 'Hide' : 'Show'}
            </button>
          </div>
        </div>

        <Button
          onClick={handleRegister}
          className="w-full bg-rose-700 hover:bg-rose-800 text-white py-3 font-medium text-base shadow-lg hover:shadow-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          size="lg"
          disabled={isLoading}
        >
          {isLoading ? 'Registering...' : 'Register Now'}
        </Button>
      </div>
    </>
  );
};

Follow1Form.propTypes = {
  fullName: PropTypes.string.isRequired,
  setFullName: PropTypes.func.isRequired,
  email: PropTypes.string.isRequired,
  setEmail: PropTypes.func.isRequired,
  mobileNumber: PropTypes.string.isRequired,
  setMobileNumber: PropTypes.func.isRequired,
  createPassword: PropTypes.string.isRequired,
  setCreatePassword: PropTypes.func.isRequired,
  onBack: PropTypes.func.isRequired,
  handleContinueFollow2: PropTypes.func.isRequired,
};

export default Follow1Form;