'use client';

import { useState } from 'react';
import Follow1Form from './follow1';
import Follow2Form from './follow2';


interface SignupWrapperProps {
  onSignupSuccess: (token: string, userData?: any) => void;
  setIsProfileSetupOpen: (value: boolean) => void;
    closeModal: () => void; // 

}

const SignupWrapper = ({ onSignupSuccess, setIsProfileSetupOpen,closeModal }: SignupWrapperProps) => {
  const [step, setStep] = useState(1);


  // Step 1 state
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');

  // Step 2 state
  const [otp, setOtp] = useState('');

  const handleContinueFollow2 = () => {
    if (!firstName || !lastName || !mobileNumber) {
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
      // After OTP verification, you can redirect to Step 3 or dashboard
      setIsProfileSetupOpen(true);

    } else {
      alert('Please enter a valid OTP.');
    }
  };

  return (
    <div className="max-w-md mx-auto p-4">
      {step === 1 && (
        <Follow1Form
          firstName={firstName}
          setFirstName={setFirstName}
          lastName={lastName}
          setLastName={setLastName}
          email={email}
          setEmail={setEmail}
          mobileNumber={mobileNumber}
          setMobileNumber={setMobileNumber}
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
              setIsProfileSetupOpen={setIsProfileSetupOpen} 
              closeModal={closeModal}
        />
      )}
    </div>
  );
};

export default SignupWrapper;
