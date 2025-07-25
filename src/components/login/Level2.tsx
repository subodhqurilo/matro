'use client';

import PropTypes from 'prop-types';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
  InputOTPSeparator,
} from '@/components/ui/input-otp';
import { ArrowLeft } from 'lucide-react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

type Level2FormProps = {
  otp: string;
  setOtp: (value: string) => void;
  onBack: () => void;
  handleContinueLevel2: () => void;
  phoneNumber: string;
};

const Level2Form = ({
  otp,
  setOtp,
  onBack,
  handleContinueLevel2,
  phoneNumber,
}: Level2FormProps) => {
  const [isVerifying, setIsVerifying] = useState(false);

  const handleResendOtp = async () => {
    try {
      console.log('Resending OTP to:', phoneNumber);
      const response = await fetch('https://bxcfrrl4-3000.inc1.devtunnels.ms/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ phoneNumber }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to resend OTP');
      }

      if (!data.success) {
        if (data.message) {
          toast.info(data.message);
          return;
        }
        throw new Error('Failed to resend OTP');
      }

      toast.success(data.message || 'OTP resent successfully');
    } catch (error: any) {
      toast.error(error.message || 'Error resending OTP');
    }
  };

  const handleVerifyOtp = async () => {
    if (otp.length !== 4) {
      toast.error('Please enter a valid 4-digit OTP');
      return;
    }

    setIsVerifying(true);

    try {
      const requestBody = {
        phoneNumber: phoneNumber.trim(),
        otp: otp.trim()
      };
      
      console.log('Sending OTP verification request with:', JSON.stringify(requestBody, null, 2));
      
      // First verify OTP
      const otpResponse = await fetch('https://bxcfrrl4-3000.inc1.devtunnels.ms/auth/otp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      });

      const otpData = await otpResponse.json();
      console.log('OTP Verification Response:', {
        status: otpResponse.status,
        statusText: otpResponse.statusText,
        data: otpData
      });

      if (!otpResponse.ok) {
        throw new Error(otpData.message || 'OTP verification failed');
      }

      if (!otpData.success) {
        if (otpData.message) {
          toast.error(otpData.message);
          return;
        }
        throw new Error('OTP verification failed');
      }

      // If OTP verification is successful, proceed with login
      const loginResponse = await fetch('https://bxcfrrl4-3000.inc1.devtunnels.ms/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          mobile: phoneNumber,
          otp: otp
        }),
      });

      const loginData = await loginResponse.json();

      if (!loginResponse.ok) {
        throw new Error(loginData.message || 'Login failed');
      }

      if (!loginData.success) {
        if (loginData.message) {
          toast.error(loginData.message);
          return;
        }
        throw new Error('Login failed');
      }

      // Store the token and userId (you might want to use context or state management)
      localStorage.setItem('token', loginData.token);
      localStorage.setItem('userId', loginData.userId);

      toast.success(loginData.message || 'Login successful');
      handleContinueLevel2(); // Proceed to next step
    } catch (error: any) {
      toast.error(error.message || 'Error verifying OTP');
    } finally {
      setIsVerifying(false);
    }
  };

  return (
    <>
      <ToastContainer position="top-right" autoClose={3000} />

      <button onClick={onBack}>
        <ArrowLeft className="h-5 w-5 text-gray-500 hover:text-rose-600 transition-colors" />
      </button>

      <div className="flex flex-col items-center justify-center gap-3 mb-6">
        <h2 className="text-xl font-Lato text-gray-900">LOGO</h2>
        <p className="text-xl font-Lato text-gray-900">OTP VERIFICATION</p>
        <p className="text-sm font-Lato text-gray-900">
          We have sent the OTP to {phoneNumber.replace(/^(\d)(\d{7})(\d)$/, '$1*******$3')}
        </p>
      </div>

      <div className="space-y-4 mb-6">
        <div className="flex justify-center">
          <InputOTP maxLength={4} value={otp} onChange={setOtp}>
            <InputOTPGroup>
              <InputOTPSlot index={0} />
              <InputOTPSeparator />
              <InputOTPSlot index={1} />
              <InputOTPSeparator />
              <InputOTPSlot index={2} />
              <InputOTPSeparator />
              <InputOTPSlot index={3} />
            </InputOTPGroup>
          </InputOTP>
        </div>
      </div>

      <p className="text-sm text-gray-600 mb-6 font-Montserrat text-center">
        Didn&apos;t receive OTP?{' '}
        <button
          type="button"
          onClick={handleResendOtp}
          className="text-rose-700 font-medium hover:underline"
        >
          Resend
        </button>
      </p>

      <Button
        onClick={handleVerifyOtp}
        disabled={otp.length !== 4 || isVerifying}
        className="w-full bg-[#7D0A0A] hover:bg-[#9e0e0e]"
        size="lg"
      >
        {isVerifying ? 'Verifying...' : 'Verify'}
      </Button>
    </>
  );
};

Level2Form.propTypes = {
  otp: PropTypes.string.isRequired,
  setOtp: PropTypes.func.isRequired,
  onBack: PropTypes.func.isRequired,
  handleContinueLevel2: PropTypes.func.isRequired,
  phoneNumber: PropTypes.string.isRequired,
};

export default Level2Form;
