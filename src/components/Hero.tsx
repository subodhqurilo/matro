'use client';
import Image from 'next/image';
import { useState } from 'react';
import Step1Form from './steps/Step1';
import Step2Form from './steps/Step2';
import Step3Form from './steps/Step3';
import Step4Form from './steps/Step4';
interface Card {
  img: string;
  text: string;
  name: string;
}
const Home: React.FC = () => {
  const cards: Card[] = [
    {
      img: '/assets/image 1597.png',
      text: 'We met on this app without spending a single rupee. What we found was priceless — trust, comfort, and love.',
      name: '– Aarav & Zoya',
    },
    {
      img: '/assets/image 1597.png',
      text: 'We met on this app without spending a single rupee. What we found was priceless — trust, comfort, and love.',
      name: '– Aarav & Zoya',
    },
    {
      img: '/assets/image 1597.png',
      text: 'We met on this app without spending a single rupee. What we found was priceless — trust, comfort, and love.',
      name: '– Aarav & Zoya',
    },
  ];
  const [isModalOpen, setIsModalOpen] = useState(false);
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
    // Optionally reset all fields here
  };
  const handleBackStep2 = () => setCurrentStep(1);
  const handleBackStep3 = () => setCurrentStep(2);
  const handleBackStep4 = () => setCurrentStep(3);
  const handleOpenModal = () => {
    setIsModalOpen(true);
    setCurrentStep(1);
  };
  return (
    <div className="relative min-h-screen grid grid-cols-1 lg:grid-cols-2">
      {/* Left Side: Text */}
      <div className="bg-gradient-to-r from-red-50 to-pink-50 flex items-center justify-center">
        <div className="w-full flex flex-col justify-center pl-16 pr-8 py-24">
          <h1 className="text-3xl  text-[#343434] leading-tight font-Lato">
            A Pure Path to Marriage — <br />
            With Love and Trust at Heart
          </h1>
          <p className="text-md text-[#757575] mt-6 font-Lato" >
            This is more than just a matrimonial app. It's a heartfelt journey toward companionship, built on honesty, care, and community — without pressure or payment.
          </p>
        </div>
      </div>
      {/* Right Side: Image */}
      <div className=" relative flex items-center  justify-end">
        <Image
          src="/assets/heroimage.png"
          alt="hero"
          layout="fill"
          objectFit="cover"
          className="w-full h-full  object-cover"
          priority
        />
      </div>
      {/* Search Form: Overlapping, centered below the split */}
      <div className="absolute left-1/2 transform -translate-x-1/2 top-[480px] z-20 w-full max-w-4xl">
        <div className="flex items-center justify-evenly gap-6 bg-white px-6 py-5 shadow-2xl border border-gray-200 rounded-lg">
          <div className="flex flex-col">
            <label className="text-sm mb-1 font-medium text-[#757575] font-sans">I'm looking for a</label>
            <select className="border-[#6F0000] border p-2 text-md font-medium rounded min-w-[120px] font-Mulish" style={{ fontWeight: 500, letterSpacing: '0.5px' }}>
              <option>Women</option>
              <option>Men</option>
            </select>
          </div>
          <div className="flex items-end gap-2 text-md font-medium font-Mulish" style={{ letterSpacing: '0.5px' }}>
            <div className="flex flex-col">
              <label className="text-sm mb-1 font-medium text-[#757575] font-sans">Age</label>
              <input
                type="number"
                min="18"
                max="99"
                defaultValue="22"
                className="border border-[#6F0000] p-2 text-md font-medium rounded w-16 font-Mulish"
                style={{ fontWeight: 500 }}
              />
            </div>
            <div className="pb-2 text-md font-medium font-Mulish" style={{ fontWeight: 500 }}>to</div>
            <div className="flex flex-col">
              <label className="invisible font-medium">Age</label>
              <input
                type="number"
                min="18"
                max="99"
                defaultValue="27"
                className="border border-[#6F0000] p-2 text-md font-medium rounded w-16 font-Mulish"
                style={{ fontWeight: 500 }}
              />
            </div>
          </div>
          <div className="flex flex-col">
            <label className="text-sm mb-1 font-medium text-[#757575] font-sans">Of Religion</label>
            <select className="border border-[#6F0000] p-2 text-md font-medium rounded min-w-[120px] font-Mulish" style={{ fontWeight: 500, letterSpacing: '0.5px' }}>
              <option>Hindu</option>
              <option>Muslim</option>
              <option>Christian</option>
            </select>
          </div>
          <div className="flex flex-col">
            <label className="text-sm mb-1 font-medium text-[#757575] font-sans">And Mother Tongue</label>
            <select className="border border-[#6F0000] p-2 text-md font-medium rounded min-w-[120px] font-Mulish" style={{ fontWeight: 500, letterSpacing: '0.5px' }}>
              <option>English</option>
              <option>Hindi</option>
            </select>
          </div>
          <button
            type="button"
            className="bg-[#7D0A0A] text-white px-7 py-3 rounded text-md font-semibold font-Mulish shadow-md hover:bg-[#5A0707] transition-colors duration-200"
            style={{ letterSpacing: '1px', height: '48px' }}
            onClick={handleOpenModal}
          >
            Let's Begin
          </button>
        </div>
      </div>
      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-opacity-40 backdrop-blur">
          <div className="relative bg-white rounded-lg shadow-xl w-full max-w-md mx-auto p-6 animate-fade-in">
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
                onBack={handleBackStep3}
                handleContinueStep3={handleContinueStep3}
              />
            )}
            {currentStep === 4 && (
              <Step4Form
                email={email}
                setEmail={setEmail}
                phoneNumber={phoneNumber}
                setPhoneNumber={setPhoneNumber}
                onBack={handleBackStep4}
                handleContinueStep4={handleContinueStep4}
              />
            )}
          </div>
        </div>
      )}
    </div>
  );
};
export default Home;