'use client';

import React, { useState, useEffect } from 'react';
import { FaHeart, FaBars, FaTimes, FaUserCircle, FaSignOutAlt, FaChevronDown } from 'react-icons/fa';
import { useRouter } from 'next/navigation';
import SignupWrapper from './signup/SignupWrapper';
import Level1 from './login/Level1';
import Step1Form from './steps/Step1';
import Step2Form from './steps/Step2';
import Step3Form from './steps/Step3';
import Step4Form from './steps/Step4';
import Step5Form from './steps/Step5';
import Step6Form from './steps/Step6';
import Step7Form from './steps/Step7';
import { PROFILE } from '@/utils/Api';
import Link from 'next/link';

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
  const [profileStep, setProfileStep] = useState(1);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [userFirstName, setUserFirstName] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const router = useRouter();

  // Login state
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otp, setOtp] = useState('');

  // Profile setup states
  const [profileFor, setProfileFor] = useState('');
  const [personalFirstName, setPersonalFirstName] = useState('');
  const [personalMiddleName, setPersonalMiddleName] = useState('');
  const [personalLastName, setPersonalLastName] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [gender, setGender] = useState('');
  const [maritalStatus, setMaritalStatus] = useState('');
  const [numberOfChildren, setNumberOfChildren] = useState(0);
  const [isChildrenLivingWithYou, setIsChildrenLivingWithYou] = useState(false);
  const [religion, setReligion] = useState('');
  const [willingToMarryOtherCaste, setWillingToMarryOtherCaste] = useState('');
  const [caste, setCaste] = useState('');
  const [community, setCommunity] = useState('');
  const [gotra, setGotra] = useState('');
  const [motherTongue, setMotherTongue] = useState('');
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [complexion, setComplexion] = useState('');
  const [anyDisability, setAnyDisability] = useState('');
  const [diet, setDiet] = useState('');
  const [familyType, setFamilyType] = useState('');
  const [familyStatus, setFamilyStatus] = useState('');
  const [country, setCountry] = useState('');
  const [state, setState] = useState('');
  const [city, setCity] = useState('');
  const [highestEducation, setHighestEducation] = useState('');
  const [employedIn, setEmployedIn] = useState('');
  const [annualIncome, setAnnualIncome] = useState('');
  const [workLocation, setWorkLocation] = useState('');
  const [designation, setDesignation] = useState('');
  const [profileImage, setProfileImage] = useState<File | null>(null);
  const [adhaarCardFrontImage, setAdhaarCardFrontImage] = useState<File | null>(null);
  const [adhaarCardBackImage, setAdhaarCardBackImage] = useState<File | null>(null);

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
            // Add 5-second delay before opening profile setup
            const timer = setTimeout(() => {
              setIsProfileSetupOpen(true);
            }, 5000);
            
            return () => clearTimeout(timer);
          }
        } catch (error) {
          console.error('Error parsing user data:', error);
        }
      }
    }
  }, []);

  const handleLoginSuccess = async (token: string, userId: string) => {
    localStorage.setItem('authToken', token);
    try {
      const response = await fetch(`${PROFILE.GET_USER_DATA}/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const userData = await response.json();
        localStorage.setItem('userData', JSON.stringify(userData));
        if (userData.firstName) {
          setUserFirstName(userData.firstName);
        }
        if (userData.profileComplete === false) {
          // Add 5-second delay before opening profile setup
          setTimeout(() => {
            setIsProfileSetupOpen(true);
          }, 5000);
        }
      } else {
        console.error('Failed to fetch user data:', await response.text());
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
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
    setIsProfileSetupOpen(false);
    setProfileStep(1);
    router.push('/');
  };

  const convertStringToBoolean = (value: string): boolean => {
    return value === 'Yes' || value === 'true';
  };

  const handleProfileUpdateSuccess = (profileData: any) => {
    const updatedUserData = {
      ...JSON.parse(localStorage.getItem('userData') || '{}'),
      ...profileData,
      profileComplete: true,
    };
    
    localStorage.setItem('userData', JSON.stringify(updatedUserData));
    
    if (profileData.firstName) {
      setUserFirstName(profileData.firstName);
    }
    
    setIsProfileSetupOpen(false);
    setProfileStep(1);
    setErrorMessage('');
    
    console.log('Profile updated successfully:', updatedUserData);
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
        handleLoginSuccess(data.token, data.userData);
        setPhoneNumber('');
        setOtp('');
      } else {
        console.error('OTP verification failed:', data.message);
        setErrorMessage('OTP verification failed. Please try again.');
      }
    } catch (error) {
      console.error('Error verifying OTP:', error);
      setErrorMessage('Error verifying OTP. Please try again.');
    }
  };

  const handleBackLevel1 = () => setCurrentLevel(1);
  const handleBackLevel2 = () => setCurrentLevel(1);

  // Profile setup validation
  const validateStep = (step: number): boolean => {
    switch (step) {
      case 1:
        if (!profileFor || !personalFirstName || !personalLastName || !dateOfBirth || !gender || !maritalStatus) {
          setErrorMessage('Please fill all required fields in Basic Details.');
          return false;
        }
        break;
      case 2:
        if (!religion || !willingToMarryOtherCaste || !motherTongue) {
          setErrorMessage('Please fill all required fields in Religion & Community.');
          return false;
        }
        break;
      case 3:
        if (!height || !weight || !complexion || !anyDisability || !diet) {
          setErrorMessage('Please fill all required fields in Physical Attributes.');
          return false;
        }
        break;
      case 4:
        if (!familyType || !familyStatus) {
          setErrorMessage('Please fill all required fields in Family Background.');
          return false;
        }
        break;
      case 5:
        if (!country || !state || !city || !highestEducation) {
          setErrorMessage('Please fill all required fields in Location & Education.');
          return false;
        }
        break;
      case 6:
        if (!employedIn || !annualIncome || !workLocation || !designation) {
          setErrorMessage('Please fill all required fields in Professional Details.');
          return false;
        }
        break;
      case 7:
        if (!profileImage || !adhaarCardFrontImage || !adhaarCardBackImage) {
          setErrorMessage('Please upload all required images in Aadhaar & Photo Verification.');
          return false;
        }
        break;
      default:
        return true;
    }
    setErrorMessage('');
    return true;
  };

  // Profile setup handlers
  const handleContinueStep1 = () => {
    if (validateStep(1)) setProfileStep(2);
  };
  const handleContinueStep2 = () => {
    if (validateStep(2)) setProfileStep(3);
  };
  const handleContinueStep3 = () => {
    if (validateStep(3)) setProfileStep(4);
  };
  const handleContinueStep4 = () => {
    if (validateStep(4)) setProfileStep(5);
  };
  const handleContinueStep5 = () => {
    if (validateStep(5)) setProfileStep(6);
  };
  const handleContinueStep6 = () => {
    if (validateStep(6)) setProfileStep(7);
  };
  const handleContinueStep7 = async () => {
    if (!validateStep(7)) return;

    setIsSubmitting(true);
    setErrorMessage('');
    try {
      const token = localStorage.getItem('authToken');
      if (!token) {
        setErrorMessage('Authentication token not found. Please log in again.');
        setIsSubmitting(false);
        return;
      }

      const requiredFields = {
        profileFor,
        personalFirstName,
        personalLastName,
        dateOfBirth,
        gender,
        maritalStatus,
        religion,
        willingToMarryOtherCaste,
        motherTongue,
        height,
        weight,
        complexion,
        anyDisability,
        diet,
        familyType,
        familyStatus,
        country,
        state,
        city,
        highestEducation,
        employedIn,
        annualIncome,
        workLocation,
        designation
      };

      const missingFields = Object.entries(requiredFields)
        .filter(([key, value]) => !value)
        .map(([key]) => key);

      if (missingFields.length > 0) {
        setErrorMessage(`Missing required fields: ${missingFields.join(', ')}`);
        setIsSubmitting(false);
        return;
      }

      const formData = new FormData();
      // Step 1
      formData.append('profileFor', profileFor === 'myself' ? 'Self' : profileFor);
      formData.append('personalFirstName', personalFirstName);
      formData.append('personalMiddleName', personalMiddleName || '');
      formData.append('personalLastName', personalLastName);
      formData.append('dateOfBirth', dateOfBirth);
      formData.append('gender', gender);
      formData.append('maritalStatus', maritalStatus);
      formData.append('numberOfChildren', numberOfChildren.toString());
      formData.append('isChildrenLivingWithYou', isChildrenLivingWithYou.toString());
      // Step 2
      formData.append('religion', religion);
      const willingToMarryOtherCasteBool = convertStringToBoolean(willingToMarryOtherCaste);
      formData.append('willingToMarryOtherCaste', willingToMarryOtherCasteBool.toString());
      formData.append('caste', caste || '');
      formData.append('community', community || '');
      formData.append('gotra', gotra || '');
      formData.append('motherTongue', motherTongue);
      // Step 3
      formData.append('height', height);
      formData.append('weight', weight);
      formData.append('complexion', complexion);
      const anyDisabilityBool = convertStringToBoolean(anyDisability);
      formData.append('anyDisability', anyDisabilityBool.toString());
      formData.append('diet', diet);
      // Step 4
      formData.append('familyType', familyType);
      formData.append('familyStatus', familyStatus);
      // Step 5
      formData.append('country', country);
      formData.append('state', state);
      formData.append('city', city);
      formData.append('highestEducation', highestEducation);
      // Step 6
      formData.append('employedIn', employedIn);
      formData.append('annualIncome', annualIncome);
      formData.append('workLocation', workLocation);
      formData.append('designation', designation);
      // Step 7
      if (profileImage) formData.append('profileImage', profileImage, profileImage.name);
      if (adhaarCardFrontImage) formData.append('adhaarCardFrontImage', adhaarCardFrontImage, adhaarCardFrontImage.name);
      if (adhaarCardBackImage) formData.append('adhaarCardBackImage', adhaarCardBackImage, adhaarCardBackImage.name);

      // Add additional fields that might be required by the API
      formData.append('casteNoBar', 'true');
      formData.append('openToPets', 'true');
      formData.append('ownCar', 'false');
      formData.append('ownHouse', 'false');
      formData.append('manglik', 'false');
      formData.append('smoking', 'false');
      formData.append('drinking', 'false');

      // Log FormData contents for debugging
      const formDataEntries: any[] = [];
      formData.forEach((value, key) => {
        formDataEntries.push({ key, value: value instanceof File ? value.name : value });
      });
      console.log('FormData contents:', formDataEntries);
      console.log('Token being used:', token ? 'Token present' : 'No token');
      console.log('API URL:', PROFILE.UPDATE_PROFILE);

      // Log request details
      console.log('Request method: POST');
      console.log('Request headers:', {
        Authorization: `Bearer ${token.substring(0, 20)}...`,
        'Content-Type': 'multipart/form-data (auto-generated)'
      });

      // Test if the API endpoint is accessible
      try {
        const testResponse = await fetch(PROFILE.UPDATE_PROFILE, {
          method: 'OPTIONS',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log('API endpoint test response:', testResponse.status);
      } catch (testError) {
        console.warn('API endpoint test failed:', testError);
      }

      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 30000); // 30 second timeout

      const response = await fetch(PROFILE.UPDATE_PROFILE, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      const responseText = await response.text();
      console.log('API Response Status:', response.status);
      console.log('API Response Headers:', response.headers);
      console.log('API Response Text:', responseText);

      if (response.ok) {
        try {
          const responseData = JSON.parse(responseText);
          
          if (responseData.success && responseData.data) {
            handleProfileUpdateSuccess(responseData.data);
            alert('Profile submitted successfully!');
          } else {
            setErrorMessage('Invalid response format from server. Please try again.');
            console.error('Invalid response format:', responseData);
          }
        } catch (error) {
          setErrorMessage('Failed to parse server response. Please try again.');
          console.error('Error parsing response:', error, 'Response text:', responseText);
        }
      } else {
        let errorData;
        try {
          errorData = JSON.parse(responseText);
        } catch {
          errorData = { message: responseText || 'Unknown server error' };
        }
        
        const errorMessage = errorData.message || errorData.error || 'Unknown server error';
        setErrorMessage(`Profile submission failed: ${errorMessage} (Status: ${response.status})`);
        console.error('Profile submission failed:', {
          status: response.status,
          statusText: response.statusText,
          errorData,
          responseText
        });
      }
    } catch (error) {
      if (error instanceof Error) {
        if (error.name === 'AbortError') {
          setErrorMessage('Request timed out. Please try again.');
        } else if (error.name === 'TypeError' && error.message.includes('fetch')) {
          setErrorMessage('Network error. Please check your internet connection and try again.');
        } else {
          setErrorMessage(`Error submitting profile: ${error.message}`);
        }
      } else {
        setErrorMessage('Error submitting profile. Please check your network and try again.');
      }
      console.error('Error submitting profile:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleBack = () => {
    if (profileStep > 1) {
      setProfileStep(profileStep - 1);
      setErrorMessage('');
    } else {
      setIsProfileSetupOpen(false);
    }
  };

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
                  <FaChevronDown
                    className={`text-gray-600 transition-transform ${isProfileOpen ? 'transform rotate-180' : ''}`}
                  />
                </div>
              </button>

              {/* Profile Dropdown */}
              {isProfileOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50">
                  <div className="px-4 py-2 text-sm text-gray-700 border-b border-gray-100">
                    <p className="font-medium">{userFirstName || 'User'}</p>
                    <Link href="/profiles">
                    <p className="text-xs text-gray-500">View Profile</p>
                    </Link>
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
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-opacity-40 backdrop-blur-sm">
          <div className="relative bg-white rounded-lg shadow-xl w-full max-w-md p-6">
            <button
              className="absolute right-3 top-3 text-gray-500 hover:text-red-500"
              onClick={() => setIsLoginOpen(false)}
            >
              ✕
            </button>
            {errorMessage && (
              <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">
                {errorMessage}
              </div>
            )}
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
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-opacity-40 backdrop-blur-sm">
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
        <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-opacity-40">
          <div className="relative rounded-lg shadow-xl w-full max-w-md mx-auto p-6 animate-fade-in custom-scrollbar bg-white px-4 py-4 min-w-[450px] max-h-[90vh] overflow-y-auto">
            <button
              className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
              onClick={() => setIsProfileSetupOpen(false)}
            >
              ✕
            </button>
            {errorMessage && (
              <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">
                {errorMessage}
              </div>
            )}
            {profileStep === 1 && (
              <Step1Form
                profileFor={profileFor}
                setProfileFor={setProfileFor}
                personalFirstName={personalFirstName}
                setPersonalFirstName={setPersonalFirstName}
                personalMiddleName={personalMiddleName}
                setPersonalMiddleName={setPersonalMiddleName}
                personalLastName={personalLastName}
                setPersonalLastName={setPersonalLastName}
                dateOfBirth={dateOfBirth}
                setDateOfBirth={setDateOfBirth}
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
            {profileStep === 2 && (
              <Step2Form
                religion={religion}
                setReligion={setReligion}
                willingToMarryOtherCaste={willingToMarryOtherCaste}
                setWillingToMarryOtherCaste={setWillingToMarryOtherCaste}
                caste={caste}
                setCaste={setCaste}
                community={community}
                setCommunity={setCommunity}
                gotra={gotra}
                setGotra={setGotra}
                motherTongue={motherTongue}
                setMotherTongue={setMotherTongue}
                onBack={handleBack}
                handleContinueStep2={handleContinueStep2}
              />
            )}
            {profileStep === 3 && (
              <Step3Form
                height={height}
                setHeight={setHeight}
                weight={weight}
                setWeight={setWeight}
                complexion={complexion}
                setComplexion={setComplexion}
                anyDisability={anyDisability}
                setAnyDisability={setAnyDisability}
                diet={diet}
                setDiet={setDiet}
                onBack={handleBack}
                handleContinueStep3={handleContinueStep3}
              />
            )}
            {profileStep === 4 && (
              <Step4Form
                familyType={familyType}
                setFamilyType={setFamilyType}
                familyStatus={familyStatus}
                setFamilyStatus={setFamilyStatus}
                onBack={handleBack}
                handleContinueStep4={handleContinueStep4}
              />
            )}
            {profileStep === 5 && (
              <Step5Form
                country={country}
                setCountry={setCountry}
                state={state}
                setState={setState}
                city={city}
                setCity={setCity}
                highestEducation={highestEducation}
                setHighestEducation={setHighestEducation}
                onBack={handleBack}
                handleContinueStep5={handleContinueStep5}
              />
            )}
            {profileStep === 6 && (
              <Step6Form
                employedIn={employedIn}
                setEmployedIn={setEmployedIn}
                annualIncome={annualIncome}
                setAnnualIncome={setAnnualIncome}
                workLocation={workLocation}
                setWorkLocation={setWorkLocation}
                designation={designation}
                setDesignation={setDesignation}
                onBack={handleBack}
                handleContinueStep6={handleContinueStep6}
              />
            )}
            {profileStep === 7 && (
              <Step7Form
                profileImage={profileImage}
                setProfileImage={setProfileImage}
                adhaarCardFrontImage={adhaarCardFrontImage}
                setAdhaarCardFrontImage={setAdhaarCardFrontImage}
                adhaarCardBackImage={adhaarCardBackImage}
                setAdhaarCardBackImage={setAdhaarCardBackImage}
                onBack={handleBack}
                handleContinueStep7={handleContinueStep7}
              />
            )}
            {isSubmitting && (
              <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                <div className="text-white">Submitting...</div>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
}