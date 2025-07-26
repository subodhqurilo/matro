'use client';

import { useState } from 'react';
import Follow1Form from './follow1';
import Follow2Form from './follow2';

interface SignupWrapperProps {
  onSignupSuccess: (token: string, userData?: any) => void;
}

const SignupWrapper = ({ onSignupSuccess }: SignupWrapperProps) => {
  const [step, setStep] = useState(1);

  // Step 1 state
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [createPassword, setCreatePassword] = useState('');

  // Step 2 state
  const [otp, setOtp] = useState('');

  const handleContinueFollow2 = () => {
    if (!fullName || !mobileNumber || !createPassword) {
      alert('Please fill all required fields');
      return;
    }
    setStep(2);
  };

  const handleBackToFollow1 = () => {
    setStep(1);
  };

  const handleOtpVerify = () => {
    if (otp.length === 4) {
      alert('OTP Verified. Signup Complete!');
      // You can redirect here
    } else {
      alert('Please enter a valid OTP.');
    }
  };

  return (
    <div className="max-w-md mx-auto p-4">
      {step === 1 && (
        <Follow1Form
          fullName={fullName}
          setFullName={setFullName}
          email={email}
          setEmail={setEmail}
          mobileNumber={mobileNumber}
          setMobileNumber={setMobileNumber}
          createPassword={createPassword}
          setCreatePassword={setCreatePassword}
          onBack={() => window.history.back()}
          handleContinueFollow2={handleContinueFollow2}
        />
      )}
      {step === 2 && (
        <Follow2Form
          otp={otp}
          phoneNumber={mobileNumber}
          setOtp={setOtp}
          onBack={handleBackToFollow1}
          handleContinueFollow1Form={handleOtpVerify}
        />
      )}
    </div>
  );
};

export default SignupWrapper;