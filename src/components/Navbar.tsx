'use client';

import React, { useState, useEffect } from 'react';
import { FaHeart, FaBars, FaTimes, FaUserCircle, FaSignOutAlt, FaChevronDown } from 'react-icons/fa';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

import SignupWrapper from './signup/SignupWrapper';
import Level1 from './login/Level1';

import Step1Form from './steps/Step1';
import Step2Form from './steps/Step2';
import Step3Form from './steps/Step3';
import Step4Form from './steps/Step4';
import Step5Form from './steps/Step5';
import Step6Form from './steps/Step6';

const navLinks = [
  { name: 'Home', href: '/' },
  { name: 'Matches', href: '/matches' },
  { name: 'Messages', href: '/messages' },
  { name: 'Inbox', href: '/inbox' },
];

export default function Navbar() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isSignupOpen, setIsSignupOpen] = useState(false);
  const [currentLevel, setCurrentLevel] = useState(1);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isProfileSetupOpen, setIsProfileSetupOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [userFirstName, setUserFirstName] = useState('');
  const router = useRouter();

  // Login state
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otp, setOtp] = useState('');

  // Profile setup state
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

  // Check auth status on component mount
  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (token) {
      setIsAuthenticated(true);
      const userData = localStorage.getItem('userData');
      if (userData) {
        try {
          const parsedData = JSON.parse(userData);
          if (parsedData.firstName) {
            setUserFirstName(parsedData.firstName);
          }
          if (parsedData.profileComplete === false) {
            setIsProfileSetupOpen(true);
          }
        } catch (error) {
          console.error('Error parsing user data:', error);
        }
      }
    }
  }, []);

  const handleLoginSuccess = (token: string, userData?: any) => {
    localStorage.setItem('authToken', token);
    if (userData) {
      localStorage.setItem('userData', JSON.stringify(userData));
      if (userData.firstName) {
        setUserFirstName(userData.firstName);
      }
      if (userData.profileComplete === false) {
        setIsProfileSetupOpen(true);
      }
    }
    setIsAuthenticated(true);
    setIsLoginOpen(false);
    setCurrentLevel(1);
  };

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('userData');
    setIsAuthenticated(false);
    setIsProfileOpen(false);
    setUserFirstName('');
    router.push('/');
  };

  const openLoginModal = () => {
    setIsLoginOpen(true);
    setIsSignupOpen(false);
    setCurrentLevel(1);
  };

  const openSignupModal = () => {
    setIsSignupOpen(true);
    setIsLoginOpen(false);
  };

  // Profile setup handlers
  const handleContinueStep1 = () => setCurrentStep(2);
  const handleContinueStep2 = () => setCurrentStep(3);
  const handleContinueStep3 = () => setCurrentStep(4);
  const handleContinueStep4 = () => setCurrentStep(5);
  const handleContinueStep5 = () => setCurrentStep(6);
  
  const handleProfileSubmit = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('No authentication token found. Please log in again.');
      }

      const formData = new FormData();
      formData.append('profileFor', profileFor);
      formData.append('gender', gender);
      formData.append('maritalStatus', maritalStatus);
      formData.append('numberOfChildren', numberOfChildren.toString());
      formData.append('isChildrenLivingWithYou', isChildrenLivingWithYou.toString());
      formData.append('firstName', firstName);
      formData.append('middleName', middleName);
      formData.append('lastName', lastName);
      formData.append('dateOfBirth', dateOfBirth);
      formData.append('height', height);
      formData.append('diet', diet);
      formData.append('religion', religion);
      formData.append('willingToMarryOtherCaste', willingToMarryOtherCaste.toString());
      formData.append('caste', caste);
      formData.append('community', community);
      formData.append('subCommunity', subCommunity);
      formData.append('motherTongue', motherTongue);
      formData.append('email', email);
      formData.append('phoneNumber', phoneNumber);
      formData.append('anyDisability', anyDisability.toString());
      formData.append('familyType', familyType);
      formData.append('familyStatus', familyStatus);
      formData.append('familyIncome', familyIncome);
      formData.append('city', city);
      formData.append('state', state);
      formData.append('education', education);
      formData.append('employedIn', employedIn);
      formData.append('occupation', occupation);
      formData.append('annualIncome', annualIncome);
      formData.append('workLocation', workLocation);
      if (profileImage) {
        formData.append('profileImage', profileImage);
      }
      imageProfileArray.forEach((image, index) => {
        formData.append(`imageProfileArray[${index}]`, image);
      });
      formData.append('verificationType', verificationType);
      formData.append('verificationValue', verificationValue);

      const response = await fetch('https://apimatri.qurilo.com/auth/profile', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to save profile');
      }

      const responseData = await response.json();
      console.log('Profile saved successfully:', responseData);

      // Update user data
      const userData = JSON.parse(localStorage.getItem('userData') || '{}');
      userData.profileComplete = true;
      localStorage.setItem('userData', JSON.stringify(userData));

      setIsProfileSetupOpen(false);
      setCurrentStep(1);
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

  // Login handlers
  const handleContinueLevel1 = () => setCurrentLevel(2);
  const handleContinueLevel2 = async () => {
    try {
      const response = await fetch('https://apimatri.qurilo.com/auth/otp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ phoneNumber, otp }),
      });

      const data = await response.json();
      
      if (data.success) {
        console.log('Auth Token:', data.token);
        handleLoginSuccess(data.token);
        setPhoneNumber('');
        setOtp('');
      } else {
        console.error('OTP verification failed:', data.message);
      }
    } catch (error) {
      console.error('Error verifying OTP:', error);
    }
  };

  const handleBackLevel1 = () => setCurrentLevel(1);
  const handleBackLevel2 = () => setCurrentLevel(1);

  return (
    <header className="sticky top-0 z-50 bg-[#FFF8F0] shadow">
      <nav className="max-w-7xl mx-auto flex items-center justify-between px-4 py-3 md:py-4">
        {/* Logo */}
        <div className="flex items-center space-x-2">
          <FaHeart className="text-red-500 text-2xl" />
          <span className="font-bold text-xl">Logo</span>
        </div>

        {/* Desktop Nav Links - Only show when authenticated */}
        {isAuthenticated && (
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
        )}

        {/* Auth Buttons */}
        <div className="hidden md:flex items-center">
          {!isAuthenticated ? (
            <button
              type="button"
              className="bg-[#7D0A0A] text-white px-7 py-3 rounded text-md font-semibold font-Mulish shadow-md hover:bg-[#5A0707] transition-colors duration-200"
              style={{ letterSpacing: '1px', height: '48px' }}
              onClick={openLoginModal}
            >
              Login
            </button>
          ) : (
            <div className="relative">
              <button
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                className="flex items-center space-x-2 focus:outline-none"
              >
                <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
                  <FaUserCircle className="text-3xl text-gray-600" />
                </div>
                <div className="flex items-center space-x-1">
                  <span className="font-medium text-gray-800">
                    {userFirstName || 'Profile'}
                  </span>
                  <FaChevronDown className={`text-gray-600 transition-transform ${isProfileOpen ? 'transform rotate-180' : ''}`} />
                </div>
              </button>
              
              {/* Profile Dropdown */}
              {isProfileOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50">
                  <div className="px-4 py-2 text-sm text-gray-700 border-b border-gray-100">
                    <p className="font-medium">{userFirstName || 'User'}</p>
                    <p className="text-xs text-gray-500">View Profile</p>
                  </div>
                  <button
                    onClick={() => {
                      setIsProfileOpen(false);
                      setIsProfileSetupOpen(true);
                    }}
                    className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Complete Profile
                  </button>
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center space-x-2"
                  >
                    <FaSignOutAlt />
                    <span>Sign out</span>
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Mobile Hamburger Menu */}
        <button
          className="md:hidden p-2 rounded focus:outline-none focus:ring-2 focus:ring-red-500"
          onClick={() => setMobileOpen((prev) => !prev)}
        >
          {mobileOpen ? (
            <FaTimes className="text-2xl text-gray-700" />
          ) : (
            <FaBars className="text-2xl text-gray-700" />
          )}
        </button>
      </nav>

      {/* Mobile Nav */}
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
              {!isAuthenticated ? (
                <button
                  className="block bg-red-500 text-white px-5 py-2 rounded hover:bg-red-600 transition-colors duration-200 font-semibold shadow text-center w-full"
                  onClick={() => {
                    setMobileOpen(false);
                    openLoginModal();
                  }}
                >
                  Login
                </button>
              ) : (
                <>
                  <button
                    className="block bg-gray-200 text-gray-800 px-5 py-2 rounded hover:bg-gray-300 transition-colors duration-200 font-semibold shadow text-center w-full mb-2"
                    onClick={() => {
                      setMobileOpen(false);
                      setIsProfileSetupOpen(true);
                    }}
                  >
                    Complete Profile
                  </button>
                  <button
                    className="block bg-red-500 text-white px-5 py-2 rounded hover:bg-red-600 transition-colors duration-200 font-semibold shadow text-center w-full"
                    onClick={() => {
                      setMobileOpen(false);
                      handleLogout();
                    }}
                  >
                    Logout
                  </button>
                </>
              )}
            </li>
          </ul>
        </div>
      )}

      {/* LOGIN MODAL */}
      {isLoginOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40 backdrop-blur-sm">
          <div className="relative bg-white rounded-lg shadow-xl w-full max-w-md p-6">
            <button
              className="absolute right-3 top-3 text-gray-500 hover:text-red-500"
              onClick={() => setIsLoginOpen(false)}
            >
              ✕
            </button>

            {currentLevel === 1 && (
              <Level1
                phoneNumber={phoneNumber}
                setPhoneNumber={setPhoneNumber}
                onBack={handleBackLevel1}
                handleContinueLevel1={handleContinueLevel1}
                openSignupModal={openSignupModal}
                onLoginSuccess={handleLoginSuccess}
              />
            )}

           
          </div>
        </div>
      )}

      {/* SIGNUP MODAL */}
      {isSignupOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40 backdrop-blur-sm">
          <div className="relative bg-white rounded-lg shadow-xl w-full max-w-md p-6">
            <button
              className="absolute right-3 top-3 text-gray-500 hover:text-red-500"
              onClick={() => setIsSignupOpen(false)}
            >
              ✕
            </button>
            <SignupWrapper onSignupSuccess={handleLoginSuccess} />
          </div>
        </div>
      )}

      {/* PROFILE SETUP MODAL */}
      {isProfileSetupOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40 backdrop-blur-sm">
          <div className="relative bg-[#FFFFF1] rounded-lg shadow-xl w-full max-w-md mx-auto p-6 animate-fade-in">
            <button
              className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
              onClick={() => setIsProfileSetupOpen(false)}
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
    </header>
  );
}