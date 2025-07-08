// 
//new code

'use client';
// import Image from 'next/image';
import { useState } from 'react';
import Step1Form from './steps/Step1';
import Step2Form from './steps/Step2';
import Step3Form from './steps/Step3';
import Step4Form from './steps/Step4';
import Image from 'next/image';

export default function Hero() {
  const [showStep1, setShowStep1] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  // Step 1
  const [selectedProfile, setSelectedProfile] = useState('myself');
  const [selectedGender, setSelectedGender] = useState('male');
  // Step 2
  const [firstName, setFirstName] = useState('');
  const [middleName, setMiddleName] = useState('');
  const [lastName, setLastName] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  // Step 3
  const [religion, setReligion] = useState('');
  const [community, setCommunity] = useState('');
  const [livingIn, setLivingIn] = useState('');
  // Step 4
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const handleContinueStep1 = () => setCurrentStep(2);
  const handleContinueStep2 = () => setCurrentStep(3);
  const handleContinueStep3 = () => setCurrentStep(4);
  const handleContinueStep4 = () => {
    setIsModalOpen(false);
    setCurrentStep(1);

  };
  function handleBackStep2(): void {
    throw new Error('Function not implemented.');
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Step Modal Overlay */}
      {showStep1 && (
        <div className="fixed inset-0 bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto relative">
            <button
              className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
              onClick={() => setIsModalOpen(false)}
            >
              ✕
            </button>
            {currentStep === 1 && (
              <Step1Form
                selectedProfile={selectedProfile}
                setSelectedProfile={setSelectedProfile}
                selectedGender={selectedGender}
                setSelectedGender={setSelectedGender}
                handleContinueStep1={handleContinueStep1}
              />
            )}
            {currentStep === 2 && (
              <Step2Form
                firstName={firstName}
                setFirstName={setFirstName}
                middleName={middleName}
                setMiddleName={setMiddleName}
                lastName={lastName}
                setLastName={setLastName}
                dateOfBirth={dateOfBirth}
                setDateOfBirth={setDateOfBirth}
                onBack={handleBackStep2}
                handleContinueStep2={handleContinueStep2}
              />
            )}
            {currentStep === 3 && (
              <Step3Form
                religion={religion}
                setReligion={setReligion}
                community={community}
                setCommunity={setCommunity}
                livingIn={livingIn}
                setLivingIn={setLivingIn}
                onBack={handleBackStep2}
                handleContinueStep3={handleContinueStep3}
              />
            )}
            {currentStep === 4 && (
              <Step4Form
                email={email}
                setEmail={setEmail}
                phoneNumber={phoneNumber}
                setPhoneNumber={setPhoneNumber}
                onBack={handleBackStep2}
                handleContinueStep4={handleContinueStep4}
              />
            )}
          </div>
        </div>
      )}
    </div>
  );
}

function setIsModalOpen(arg0: boolean) {
  throw new Error('Function not implemented.');
}
