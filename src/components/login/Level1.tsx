'use client';

import PropTypes from 'prop-types';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ArrowLeft, Phone } from 'lucide-react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

type Level1FormProps = {
  phoneNumber: string;
  setPhoneNumber: (value: string) => void;
  onBack: () => void;
  handleContinueLevel1: () => void;
  openSignupModal: () => void; // NEW PROP
};

const Level1Form = ({
  phoneNumber,
  setPhoneNumber,
  onBack,
  handleContinueLevel1,
  openSignupModal,
}: Level1FormProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const validatePhoneNumber = (phone: string): boolean => {
    const phoneRegex = /^\d{10}$/;
    return phoneRegex.test(phone);
  };

  const handleSendOtp = async () => {
    if (!validatePhoneNumber(phoneNumber)) {
      setError('Please enter a valid 10-digit phone number');
      toast.error('Please enter a valid 10-digit phone number');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch('https://bxcfrrl4-3000.inc1.devtunnels.ms/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ phoneNumber }),



        
      });

      const data = await response.json();

      if (!response.ok) {
        if (data.message === 'Your account is pending admin approval. Please wait for verification.') {
          toast.info(data.message);
          return;
        }
        throw new Error(data.message || 'Failed to send OTP');
      }

      if (!data.success) {
        if (data.message) {
          toast.info(data.message);
          return;
        }
        throw new Error('Failed to send OTP');
      }

      toast.success(data.message || 'OTP sent successfully');
      handleContinueLevel1(); // Proceed to OTP verification step
    } catch (err: any) {
      setError(err.message || 'Something went wrong');
      toast.error(err.message || 'Something went wrong');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <ToastContainer position="top-right" autoClose={3000} />
      <button onClick={onBack}>
        <ArrowLeft className="h-5 w-5 text-gray-500 hover:text-rose-600 transition-colors" />
      </button>
      <div className="flex flex-col items-center justify-center space-x-3 gap-3 mb-6">
        <h2 className="text-xl font-Lato text-gray-900">Logo</h2>
        <p className="text-xl font-Lato text-gray-900">Welcome back! Please Login</p>
      </div>

      <div className="space-y-4 mb-6">
        <div>
          <Label htmlFor="phone" className="text-sm font-Inter text-gray-700 mb-2 block">
            Enter Your Number *
          </Label>
          <div className="relative">
            <Input
              id="phone"
              type="tel"
              placeholder="Enter your phone number"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              className={`w-full pr-10 bg-white ${error ? 'border-red-500' : ''}`}
              required
            />
            <Phone className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
          </div>
          {error && <p className="text-sm text-red-500 mt-1">{error}</p>}
        </div>
      </div>

      <div className="flex items-center font-Montserrat justify-between text-sm text-gray-600 mb-6">
        <h2>Login with OTP</h2>
        <h2>Forget Password?</h2>
      </div>

      <Button
        onClick={handleSendOtp}
        className="w-full bg-rose-700 hover:bg-rose-800 text-white py-3 font-Inter text-base shadow-lg hover:shadow-xl transition-all duration-200"
        size="lg"
        disabled={isLoading}
      >
        {isLoading ? 'Sending OTP...' : 'Login'}
      </Button>

      <p className='text-sm text-gray-600 mt-6 font-Inter text-center'>
        Don't have an account?{' '}
        <button onClick={openSignupModal} className="text-rose-700 hover:underline">
          Sign up here
        </button>
      </p>
    </>
  );
};

Level1Form.propTypes = {
  phoneNumber: PropTypes.string.isRequired,
  setPhoneNumber: PropTypes.func.isRequired,
  onBack: PropTypes.func.isRequired,
  handleContinueLevel2: PropTypes.func.isRequired,
  openSignupModal: PropTypes.func.isRequired, // Added missing PropType
};

export default Level1Form;