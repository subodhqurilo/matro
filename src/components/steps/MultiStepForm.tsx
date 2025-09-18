'use client';

import { useState } from 'react';
import Step1Form from './Step1';
import Step2Form from './Step2';
import Step3Form from './Step3';
import Step4Form from './Step4';
import Step5Form from './Step5';
import Step6Form from './Step6';
import Step7Form from './Step7';


interface MultiStepFormProps {
  onClose: () => void;
}

export default function MultiStepForm({ onClose }: MultiStepFormProps) {
  const [step, setStep] = useState(1);

  // Step 1 states
  const [profileFor, setProfileFor] = useState('');
  const [personalFirstName, setPersonalFirstName] = useState('');
  const [personalMiddleName, setPersonalMiddleName] = useState('');
  const [personalLastName, setPersonalLastName] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [gender, setGender] = useState('');
  const [maritalStatus, setMaritalStatus] = useState('');
  const [numberOfChildren, setNumberOfChildren] = useState(0);
  const [isChildrenLivingWithYou, setIsChildrenLivingWithYou] = useState(false);

  // Step 2 states
  const [religion, setReligion] = useState('');
  const [willingToMarryOtherCaste, setWillingToMarryOtherCaste] = useState('');
  const [caste, setCaste] = useState('');
  const [community, setCommunity] = useState('');
  const [gotra, setGotra] = useState('');
  const [motherTongue, setMotherTongue] = useState('');

  // Step 3 states
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [complexion, setComplexion] = useState('');
  const [anyDisability, setAnyDisability] = useState('');
  const [diet, setDiet] = useState('');

  // Step 4 states
  const [familyType, setFamilyType] = useState('');
  const [familyStatus, setFamilyStatus] = useState('');

  // Step 5 states
  const [country, setCountry] = useState('');
  const [state, setState] = useState('');
  const [city, setCity] = useState('');
  const [highestEducation, setHighestEducation] = useState('');

  // Step 6 states
  const [employedIn, setEmployedIn] = useState('');
  const [annualIncome, setAnnualIncome] = useState('');
  const [workLocation, setWorkLocation] = useState('');
  const [designation, setDesignation] = useState('');

  // Step 7 states
  const [profileImage, setProfileImage] = useState<File | null>(null);
  const [adhaarCardFrontImage, setAdhaarCardFrontImage] = useState<File | null>(null);
  const [adhaarCardBackImage, setAdhaarCardBackImage] = useState<File | null>(null);


const validateStep = (): boolean => {
  switch (step) {
    case 1:
      if (!profileFor || !personalFirstName || !personalLastName || !dateOfBirth || !gender || !maritalStatus) {
        alert("Please fill all required fields in Step 1");
        return false;
      }
      break;
    case 2:
      if (!religion || !willingToMarryOtherCaste || !motherTongue) {
        alert("Please fill all required fields in Step 2");
        return false;
      }
      break;
    case 3:
      if (!height || !weight || !complexion || !diet) {
        alert("Please fill all required fields in Step 3");
        return false;
      }
      break;
    case 4:
      if (!familyType || !familyStatus) {
        alert("Please fill all required fields in Step 4");
        return false;
      }
      break;
    case 5:
      if (!country || !state || !city || !highestEducation) {
        alert("Please fill all required fields in Step 5");
        return false;
      }
      break;
    case 6:
      if (!employedIn || !annualIncome || !workLocation || !designation) {
        alert("Please fill all required fields in Step 6");
        return false;
      }
      break;
    case 7:
      if (!profileImage || !adhaarCardFrontImage || !adhaarCardBackImage) {
        alert("Please upload all required documents in Step 7");
        return false;
      }
      break;
    default:
      return true;
  }
  return true;
};


  const handleNext = () => {
  if (!validateStep()) return;
  setStep((prev) => prev + 1);
};
  const handleBack = () => {
    if (step > 1) setStep((prev) => prev - 1);
    else onClose();
  };



  const handleSubmit = async () => {
  const token = localStorage.getItem('authToken'); // make sure you have the token
  if (!token) {
    alert('You must be logged in!');
    return;
  }

  const formDataObj = new FormData();

  // Append all text fields
  formDataObj.append('profileFor', profileFor);
  formDataObj.append('personalFirstName', personalFirstName);
  formDataObj.append('personalMiddleName', personalMiddleName);
  formDataObj.append('personalLastName', personalLastName);
  formDataObj.append('dateOfBirth', dateOfBirth);
  formDataObj.append('gender', gender);
  formDataObj.append('maritalStatus', maritalStatus);
  formDataObj.append('numberOfChildren', numberOfChildren.toString());
  formDataObj.append('isChildrenLivingWithYou', isChildrenLivingWithYou.toString());
  formDataObj.append('religion', religion);
  formDataObj.append('willingToMarryOtherCaste', willingToMarryOtherCaste);
  formDataObj.append('caste', caste);
  formDataObj.append('community', community);
  formDataObj.append('gotra', gotra);
  formDataObj.append('motherTongue', motherTongue);
  formDataObj.append('height', height);
  formDataObj.append('weight', weight);
  formDataObj.append('complexion', complexion);
  formDataObj.append('anyDisability', anyDisability);
  formDataObj.append('diet', diet);
  formDataObj.append('familyType', familyType);
  formDataObj.append('familyStatus', familyStatus);
  formDataObj.append('country', country);
  formDataObj.append('state', state);
  formDataObj.append('city', city);
  formDataObj.append('highestEducation', highestEducation);
  formDataObj.append('employedIn', employedIn);
  formDataObj.append('annualIncome', annualIncome);
  formDataObj.append('workLocation', workLocation);
  formDataObj.append('designation', designation);

  // Append files with exact names expected by backend
  if (profileImage) formDataObj.append('profileImage', profileImage);
  if (adhaarCardFrontImage) formDataObj.append('adhaarCardFrontImage', adhaarCardFrontImage);
  if (adhaarCardBackImage) formDataObj.append('adhaarCardBackImage', adhaarCardBackImage);

  try {
    const response = await fetch('https://matrimonial-backend-7ahc.onrender.com/auth/profile', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`, // add token for authentication
      },
      body: formDataObj,
    });

    if (response.ok) {
      const data = await response.json();
      alert('Profile submitted successfully!');
      console.log('Server response:', data);
      onClose(); // close modal
    } else {
      const errorData = await response.json();
      console.error('Submission error:', errorData);
      alert(`Submission failed: ${errorData.message}`);
    }
  } catch (error) {
    console.error('Error submitting form:', error);
    alert('Something went wrong!');
  }
};



  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
      <div className="bg-white w-full max-w-md rounded-lg p-6 relative overflow-y-auto max-h-[90vh]">
        {step === 1 && (
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
            handleContinue={handleNext}
          />
        )}

        {step === 2 && (
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
            handleContinue={handleNext}
          />
        )}

        {step === 3 && (
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
            handleContinue={handleNext}
          />
        )}

        {step === 4 && (
          <Step4Form
            familyType={familyType}
            setFamilyType={setFamilyType}
            familyStatus={familyStatus}
            setFamilyStatus={setFamilyStatus}
            onBack={handleBack}
            handleContinue={handleNext}
          />
        )}

        {step === 5 && (
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
            handleContinue={handleNext}
          />
        )}

        {step === 6 && (
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
            handleContinue={handleNext}
          />
        )}

        {step === 7 && (
          <Step7Form
            profileImage={profileImage}
            setProfileImage={setProfileImage}
            adhaarCardFrontImage={adhaarCardFrontImage}
            setAdhaarCardFrontImage={setAdhaarCardFrontImage}
            adhaarCardBackImage={adhaarCardBackImage}
            setAdhaarCardBackImage={setAdhaarCardBackImage}
            onBack={handleBack}
            handleContinue={handleSubmit}
          />
        )}
      </div>
    </div>
  );
}
