'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Step1Form from './steps/Step1';
import Step2Form from './steps/Step2';
import Step3Form from './steps/Step3';
import Step4Form from './steps/Step4';
import Step5Form from './steps/Step5';
import Step6Form from './steps/Step6';


const Hero: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [profileFor, setProfileFor] = useState('myself');
  const [gender, setGender] = useState('Male');
  const [maritalStatus, setMaritalStatus] = useState('Unmarried');
  const [numberOfChildren, setNumberOfChildren] = useState(0);
  const [isChildrenLivingWithYou, setIsChildrenLivingWithYou] = useState(false);
  const [firstName, setFirstName] = useState('');
  const [middleName, setMiddleName] = useState('');
  const [lastName, setLastName] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [height, setHeight] = useState('');
  const [diet, setDiet] = useState('');
  const [religion, setReligion] = useState('');
  const [willingToMarryOtherCaste, setWillingToMarryOtherCaste] = useState(false);
  const [caste, setCaste] = useState('');
  const [community, setCommunity] = useState('');
  const [subCommunity, setSubCommunity] = useState('');
  const [motherTongue, setMotherTongue] = useState('');
  const [anyDisability, setAnyDisability] = useState(false);
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [familyType, setFamilyType] = useState('');
  const [familyStatus, setFamilyStatus] = useState('');
  const [familyIncome, setFamilyIncome] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [education, setEducation] = useState('');
  const [employedIn, setEmployedIn] = useState('');
  const [occupation, setOccupation] = useState('');
  const [annualIncome, setAnnualIncome] = useState('');
  const [workLocation, setWorkLocation] = useState('');
  const [profileImage, setProfileImage] = useState('');
  const [imageProfileArray, setImageProfileArray] = useState<string[]>([]);
  const [verificationType, setVerificationType] = useState('');
  const [verificationValue, setVerificationValue] = useState('');

  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    if (searchParams.get('startModal') === 'true') {
      setIsModalOpen(true);
      setCurrentStep(1);
      router.replace('/', { scroll: false }); // clean up URL
    }
  }, [searchParams, router]);

  const handleContinueStep1 = () => setCurrentStep(2);
  const handleContinueStep2 = () => setCurrentStep(3);
  const handleContinueStep3 = () => setCurrentStep(4);
  const handleContinueStep4 = () => setCurrentStep(5);
  const handleContinueStep5 = () => setCurrentStep(6);
  const handleProfileSubmit = async () => {
    try {
      // Get the authentication token from localStorage
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('No authentication token found. Please log in again.');
      }

      const profileData = {
        // Step 1: Basic Information
        profileFor,
        gender,
        maritalStatus,
        numberOfChildren,
        isChildrenLivingWithYou,
        
        // Step 2: Personal Details
        firstName,
        middleName,
        lastName,
        dateOfBirth,
        height,
        diet,
        
        // Step 3: Religious & Community
        religion,
        willingToMarryOtherCaste,
        caste,
        community,
        subCommunity,
        motherTongue,
        
        // Step 4: Contact & Disability
        email,
        phoneNumber,
        anyDisability,
        
        // Step 5: Professional & Family
        familyType,
        familyStatus,
        familyIncome,
        city,
        state,
        education,
        employedIn,
        occupation,
        annualIncome,
        workLocation,
        
        // Step 6: Verification
        profileImage,
        imageProfileArray,
        verificationType,
        verificationValue,
      };

      const response = await fetch('https://bxcfrrl4-3000.inc1.devtunnels.ms/auth/profile', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(profileData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to save profile');
      }

      const responseData = await response.json();
      console.log('Profile saved successfully:', responseData);
      
      // Close the modal and reset the form
      setIsModalOpen(false);
      setCurrentStep(1);
      
      // Optionally show a success message to the user
      alert('Profile saved successfully!');
      
    } catch (error: unknown) {
      console.error('Error saving profile:', error);
      const errorMessage = error instanceof Error ? error.message : 'Failed to save profile. Please try again.';
      alert(`Error: ${errorMessage}`);
    }
  };

  const handleContinueStep6 = async () => {
    try {
      await handleProfileSubmit();
    } catch (error: unknown) {
      console.error('Error in handleContinueStep6:', error);
      const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
      alert(`Error: ${errorMessage}`);
    }
  };
  const handleBackStep2 = () => setCurrentStep(1);
  const handleBackStep3 = () => setCurrentStep(2);
  const handleBackStep4 = () => setCurrentStep(3);
  const handleBackStep5 = () => setCurrentStep(4);
  const handleBackStep6 = () => setCurrentStep(5);

  const handleOpenModal = () => {
    setIsModalOpen(true);
    setCurrentStep(1);
  };

  return (
    <div className="relative min-h-screen grid grid-cols-1 lg:grid-cols-2">
      <div className="flex items-center justify-center">
        <div className="w-full flex flex-col justify-center pl-16 pr-8 py-24 mb-40">
          <h1 className="text-5xl font-medium text-[#343434] leading-tight font-Lato">
            A Pure Path to Marriage — <br />
            With Love and Trust at Heart
          </h1>
          <p className="text-1xl font-light text-[#757575] mt-6 font-Lato">
            This is more than just a matrimonial app. It's a heartfelt journey toward companionship, built on honesty, care, and community — without pressure or payment.
          </p>
        </div>
      </div>
      <div className="relative flex items-center justify-end">
        <Image
          src="/assets/heroimage.png"
          alt="hero"
          layout="fill"
          objectFit="cover"
          className="w-full h-full object-cover"
          priority
        />
      </div>
      {/* Mobile Search Form */}
      <div className="block lg:hidden w-full px-4 mt-6">
        <div className="flex flex-col gap-4 bg-white p-4 shadow-xl border border-gray-200 rounded-md">
          <div className="flex flex-col">
            <label className="text-sm mb-1 font-medium text-[#757575] font-sans">I'm looking for a</label>
            <select className="border-[#6F0000] border p-2 text-md font-medium rounded w-full font-Mulish">
              <option>Women</option>
              <option>Men</option>
            </select>
          </div>
          <div className="flex gap-2 items-end">
            <div className="flex flex-col">
              <label className="text-sm mb-1 font-medium text-[#757575] font-sans">Age</label>
              <input type="number" min="18" max="99" defaultValue="22" className="border border-[#6F0000] p-2 text-md font-medium rounded w-20 font-Mulish" />
            </div>
            <div className="pb-2 text-md font-medium font-Mulish">to</div>
            <div className="flex flex-col">
              <label className="invisible font-medium">Age</label>
              <input type="number" min="18" max="99" defaultValue="27" className="border border-[#6F0000] p-2 text-md font-medium rounded w-20 font-Mulish" />
            </div>
          </div>
          <div className="flex flex-col">
            <label className="text-sm mb-1 font-medium text-[#757575] font-sans">Of Religion</label>
            <select className="border-[#6F0000] border p-2 text-md font-medium rounded w-full font-Mulish">
              <option>Hindu</option>
              <option>Muslim</option>
              <option>Christian</option>
            </select>
          </div>
          <div className="flex flex-col">
            <label className="text-sm mb-1 font-medium text-[#757575] font-sans">And Mother Tongue</label>
            <select className="border-[#6F0000] border p-2 text-md font-medium rounded w-full font-Mulish">
              <option>English</option>
              <option>Hindi</option>
            </select>
          </div>
          <button
            type="button"
            className="bg-[#7D0A0A] text-white w-full py-3 rounded text-md font-semibold font-Mulish shadow-md hover:bg-[#5A0707] transition-colors duration-200"
            onClick={handleOpenModal}
          >
            Let's Begin
          </button>
        </div>
      </div>
      {/* Desktop Search Form */}
      <div className="hidden lg:flex absolute left-1/2 transform -translate-x-1/2 top-[440px] z-20 w-full max-w-4xl">
        <div className="flex items-center justify-evenly gap-6 bg-white px-6 py-5 shadow-2xl border border-gray-200 w-full">
          <div className="flex flex-col">
            <label className="text-sm mb-1 font-medium text-[#757575] font-sans">I'm looking for a</label>
            <select className="border-[#6F0000] border p-2 text-md font-medium rounded min-w-[120px] font-Mulish">
              <option>Women</option>
              <option>Men</option>
            </select>
          </div>
          <div className="flex items-end gap-2 text-md font-medium font-Mulish">
            <div className="flex flex-col">
              <label className="text-sm mb-1 font-medium text-[#757575] font-sans">Age</label>
              <input type="number" min="18" max="99" defaultValue="22" className="border border-[#6F0000] p-2 text-md font-medium rounded w-16 font-Mulish" />
            </div>
            <div className="pb-2">to</div>
            <div className="flex flex-col">
              <label className="invisible font-medium">Age</label>
              <input type="number" min="18" max="99" defaultValue="27" className="border border-[#6F0000] p-2 text-md font-medium rounded w-16 font-Mulish" />
            </div>
          </div>
          <div className="flex flex-col">
            <label className="text-sm mb-1 font-medium text-[#757575] font-sans">Of Religion</label>
            <select className="border-[#6F0000] border p-2 text-md font-medium rounded min-w-[120px] font-Mulish">
              <option>Hindu</option>
              <option>Muslim</option>
              <option>Christian</option>
            </select>
          </div>
          <div className="flex flex-col">
            <label className="text-sm mb-1 font-medium text-[#757575] font-sans">And Mother Tongue</label>
            <select className="border-[#6F0000] border p-2 text-md font-medium rounded min-w-[120px] font-Mulish">
              <option>English</option>
              <option>Hindi</option>
            </select>
          </div>
          <button
            type="button"
            className="bg-[#7D0A0A] text-white px-7 py-3 rounded text-md font-semibold font-Mulish shadow-md hover:bg-[#5A0707] transition-colors duration-200"
            onClick={handleOpenModal}
          >
            Let's Begin
          </button>
        </div>
      </div>
      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-opacity-40 backdrop-blur">
          <div className="relative bg-[#FFFFF1] rounded-lg shadow-xl w-full max-w-md mx-auto p-6 animate-fade-in">
            <button
              className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
              onClick={() => setIsModalOpen(false)}
            >
              ✕
            </button>
            {currentStep === 1 && (
              <Step1Form
                profileFor={profileFor}
                setProfileFor={setProfileFor}
                gender={gender}
                setGender={setGender}
                maritalStatus={maritalStatus}
                setMaritalStatus={setMaritalStatus}
                numberOfChildren={numberOfChildren}
                setNumberOfChildren={setNumberOfChildren}
                isChildrenLivingWithYou={isChildrenLivingWithYou}
                setIsChildrenLivingWithYou={setIsChildrenLivingWithYou}
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
                height={height}
                setHeight={setHeight}
                diet={diet}
                setDiet={setDiet}
                onBack={handleBackStep2}
                handleContinueStep2={handleContinueStep2}
              />
            )}
            {currentStep === 3 && (
              <Step3Form
                religion={religion}
                setReligion={setReligion}
                willingToMarryOtherCaste={willingToMarryOtherCaste}
                setWillingToMarryOtherCaste={setWillingToMarryOtherCaste}
                caste={caste}
                setCaste={setCaste}
                community={community}
                setCommunity={setCommunity}
                subCommunity={subCommunity}
                setSubCommunity={setSubCommunity}
                motherTongue={motherTongue}
                setMotherTongue={setMotherTongue}
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
                anyDisability={anyDisability}
                setAnyDisability={setAnyDisability}
                onBack={handleBackStep4}
                handleContinueStep4={handleContinueStep4}
              />
            )}
            {currentStep === 5 && (
              <Step5Form
                familyType={familyType}
                setFamilyType={setFamilyType}
                familyStatus={familyStatus}
                setFamilyStatus={setFamilyStatus}
                familyIncome={familyIncome}
                setFamilyIncome={setFamilyIncome}
                city={city}
                setCity={setCity}
                state={state}
                setState={setState}
                education={education}
                setEducation={setEducation}
                employedIn={employedIn}
                setEmployedIn={setEmployedIn}
                occupation={occupation}
                setOccupation={setOccupation}
                annualIncome={annualIncome}
                setAnnualIncome={setAnnualIncome}
                workLocation={workLocation}
                setWorkLocation={setWorkLocation}
                onBack={handleBackStep5}
                handleContinueStep5={handleContinueStep5}
              />
            )}
            {currentStep === 6 && (
              <Step6Form
                profileImage={profileImage}
                setProfileImage={setProfileImage}
                imageProfileArray={imageProfileArray}
                setImageProfileArray={setImageProfileArray}
                verificationType={verificationType}
                setVerificationType={setVerificationType}
                verificationValue={verificationValue}
                setVerificationValue={setVerificationValue}
                onBack={handleBackStep6}
                handleContinueStep6={handleContinueStep6}
              />
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Hero;