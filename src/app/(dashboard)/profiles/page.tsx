"use client"

import React, { useEffect, useState } from 'react';
import ProfilePhotoSection from '@/app/(dashboard)/profiles/_components/ProfilePhotoSection';
import StatsSection from '@/app/(dashboard)/profiles/_components/StatsSection';
import ReligiousInfoSection from '@/app/(dashboard)/profiles/_components/ReligiousInfoSection';
import LifestyleInfoSection from '@/app/(dashboard)/profiles/_components/LifestyleInfoSection';
import AboutMeSection from './_components/AboutMeSection';
import EducationSection from './_components/EducationSection';
import CareerSection from './_components/CareerSection';
import AstroDetailsSection from './_components/AstroDetailsSection';
import BasicInfoSection from './_components/BasicInfoSection';
import FamilyInfoSection from './_components/FamilyInfoSection';
import { useUser } from '../../../components/ui/UserContext';

const DEFAULT_PROFILE_IMAGE = "https://res.cloudinary.com/dppe3ni5z/image/upload/v1757144487/default-profile.png";


const API_URL = 'https://matrimonial-backend-7ahc.onrender.com/api/profile/self';
const UPDATE_API_URL = 'https://matrimonial-backend-7ahc.onrender.com/api/profile/update-profile';
const UPLOAD_PHOTO_API = 'https://matrimonial-backend-7ahc.onrender.com/api/basic-details';

const ProfilePage: React.FC = () => {
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [updateStatus, setUpdateStatus] = useState<string | null>(null);
const [photoUploading, setPhotoUploading] = useState(false);
const { profileImage, setProfileImage } = useUser();

  useEffect(() => {
  const fetchProfile = async () => {
    setLoading(true);
    setError(null);
    try {
      const token = localStorage.getItem('authToken');
      if (!token) throw new Error('No authentication token found. Please log in.');

      const response = await fetch(API_URL, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!response.ok) throw new Error('Failed to fetch profile');
      const data = await response.json();
      console.log("Profile Image from backend (self API):", data.data?.profileImage);

      const fullProfile = data.data || data;

      // ✅ Correct conversion
      if (fullProfile.profileImage) {
        if (typeof fullProfile.profileImage === "object") {
          // backend se object aa raha hai
          if (fullProfile.profileImage.filename) {
            fullProfile.profileImage = `https://matrimonial-backend-7ahc.onrender.com/uploads/${fullProfile.profileImage.filename}`;
          } else if (fullProfile.profileImage.url) {
            fullProfile.profileImage = `https://matrimonial-backend-7ahc.onrender.com${fullProfile.profileImage.url}`;
          }
        }
        // Agar string hi aa gaya to use directly
      }

      setProfile(fullProfile);
    } catch (err: any) {
      setError(err.message || 'Failed to fetch profile');
    } finally {
      setLoading(false);
    }
  };
  fetchProfile();
}, []);



const handlePhotoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
  if (!e.target.files?.length) return;

  const file = e.target.files[0];
  const formData = new FormData();
  formData.append('profileImage', file);

  setPhotoUploading(true);
  setUpdateStatus(null);

  try {
    const token = localStorage.getItem('authToken');
    if (!token) throw new Error('No authentication token found.');

    const response = await fetch('https://matrimonial-backend-7ahc.onrender.com/api/basic-details/', {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${token}`, // Only this header for FormData
      },
      body: formData,
    });

    if (!response.ok) {
      const errData = await response.json();
      throw new Error(errData.message || 'Failed to upload image');
    }

    const data = await response.json();

    // Use Cloudinary URL directly
    const uploadedUrl = data.data?.profileImage || DEFAULT_PROFILE_IMAGE;

    setProfile(prev => ({ ...prev, profileImage: uploadedUrl }));
    setProfileImage(uploadedUrl);

    setUpdateStatus('Profile photo updated successfully!');
  } catch (err: any) {
    console.error('Upload Error:', err);
    setUpdateStatus(err.message || 'Failed to upload photo');
  } finally {
    setPhotoUploading(false);
  }
};









  // Helper for displaying basic info, lifestyle, etc. (your existing mapping functions)
  
const normalizeEnum = (value: any) => {
  if (value === true || value === "true" || value === "Yes") return "Yes";
  return "No";
};

//   const handleUpdateProfile = async () => {
//     setUpdateStatus(null);
//     try {
//       const token = localStorage.getItem('authToken');
//       if (!token) throw new Error('No authentication token found. Please log in.');

//       const updatedProfile = {
//         basicInfo: {
//           postedBy: profile?.basicInfo?.postedBy || "Self",
//           firstName: profile?.basicInfo?.firstName || "ashok",
//           middleName: profile?.basicInfo?.middleName || "None",
//           lastName: profile?.basicInfo?.lastName || "kumar",
//           maritalStatus: profile?.basicInfo?.maritalStatus || "single",
//           anyDisability: profile?.basicInfo?.anyDisability || "No",
//           weight: profile?.basicInfo?.weight || 60,
//           complexion: profile?.basicInfo?.complexion || "Fair",
//           healthInformation: profile?.basicInfo?.healthInformation || "Healthy and active",
//           height: profile?.basicInfo?.height || "5ft 8in"
//         },
//         religionDetails: {
//           religion: profile?.religionDetails?.religion || "Hindu",
//           motherTongue: profile?.religionDetails?.motherTongue || "Tamil",
//           community: profile?.religionDetails?.community || "Iyer",
//           casteNoBar: profile?.religionDetails?.casteNoBar || "Yes",
//           gothra: profile?.religionDetails?.gothra || "None"
//         },
//         familyDetails: {
//           familyBackground: profile?.familyDetails?.familyBackground || "Nuclear",
//           fatherOccupation: profile?.familyDetails?.fatherOccupation || "Business",
//           motherOccupation: profile?.familyDetails?.motherOccupation || "Housewife",
//           brother: profile?.familyDetails?.brother || 4,
//           sister: profile?.familyDetails?.sister || 3,
//           familyBasedOutOf: profile?.familyDetails?.familyBasedOutOf || "Chennai"
//         },
//         astroDetails: {
//           manglik: normalizeEnum(profile?.astroDetails?.manglik),

//           dateOfBirth: profile?.astroDetails?.dateOfBirth || "1995-05-21",
//           timeOfBirth: profile?.astroDetails?.timeOfBirth || "11:34 AM",
//           cityOfBirth: profile?.astroDetails?.cityOfBirth || "Delhi"
//         },
//         educationDetails: {
//           highestDegree: profile?.educationDetails?.highestDegree || "B.Tech",
//           postGraduation: profile?.educationDetails?.postGraduation || "MCA",
//           underGraduation: profile?.educationDetails?.underGraduation || "BCA",
//           school: profile?.educationDetails?.school || "DPS VK",
//           schoolStream: profile?.educationDetails?.schoolStream || "Science"
//         },
//         careerDetails: {
//           employedIn: profile?.careerDetails?.employedIn || "Private",
//           occupation: profile?.careerDetails?.occupation || "Developer",
//           company: profile?.careerDetails?.company || "Infosys",
//           annualIncome: profile?.careerDetails?.annualIncome || "8 LPA"
//         },
//         lifestyleHobbies: {
//           diet: profile?.lifestyleHobbies?.diet || "Vegetarian",
//           ownHouse: profile?.lifestyleHobbies?.ownHouse || "Yes",
//           ownCar: profile?.lifestyleHobbies?.ownCar || "Yes",
          
//           smoking: normalizeEnum(profile?.lifestyleHobbies?.smoking),
// drinking: normalizeEnum(profile?.lifestyleHobbies?.drinking),

//           openToPets: profile?.lifestyleHobbies?.openToPets || "Yes",
//           foodICook: profile?.lifestyleHobbies?.foodICook || ["Maggi", "Veggies"],
//           hobbies: profile?.lifestyleHobbies?.hobbies || ["Dancing", "Singing"],
//           interests: profile?.lifestyleHobbies?.interests || ["Traveling"],
//           favoriteMusic: profile?.lifestyleHobbies?.favoriteMusic || ["Depend on mood bro"],
//           sports: profile?.lifestyleHobbies?.sports || ["Cricket"],
//           cuisine: profile?.lifestyleHobbies?.cuisine || ["Indian", "only indian bro"],
//           tvShows: profile?.lifestyleHobbies?.tvShows || ["Mahabharat", "Ramayan"],
//           vacationDestination: profile?.lifestyleHobbies?.vacationDestination || ["Uttrakhand", "Temples"]
//         },
//         aboutMe: profile?.aboutMe || "I am a Mindblowing"
//       };

//       const response = await fetch(UPDATE_API_URL, {
//         method: 'PUT',
//         headers: {
//           'Content-Type': 'application/json',
//           'Authorization': `Bearer ${token}`,
//         },
//         body: JSON.stringify(updatedProfile)
//       });

//       if (!response.ok) throw new Error('Failed to update profile');
//       const updatedData = await response.json();
//       setProfile(updatedData.data || updatedData);
//       setUpdateStatus('Profile updated successfully!');
//     } catch (err: any) {
//       setUpdateStatus(err.message || 'Failed to update profile');
//     }
//   };

  // Map API data to component props (using new structure)
  const mapBasicInfo = (p: any) => [
    { label: 'Posted by', value: p?.basicInfo?.postedBy || 'Self' },
    { label: 'Name', value: `${p?.basicInfo?.firstName || ''} ${p?.basicInfo?.middleName !== 'None' ? p?.basicInfo?.middleName : ''} ${p?.basicInfo?.lastName || ''}`.replace(/ +/g, ' ').trim() },
    { label: 'Age', value: p?.basicInfo?.age || '' },
    { label: 'Marital Status', value: p?.basicInfo?.maritalStatus || '' },
    { label: 'Height', value: p?.basicInfo?.height || '' },
    { label: 'Any Disability', value: p?.basicInfo?.anyDisability || 'None' },
    { label: 'Health Information', value: p?.basicInfo?.healthInformation || 'Not Specified' },
    { label: 'Weight', value: p?.basicInfo?.weight?.toString() || '' },
    { label: 'Complexion', value: p?.basicInfo?.complexion || '' },
  ];
  const mapReligiousInfo = (p: any) => [
    { label: 'Religion', value: p?.religionDetails?.religion || '' },
    { label: 'Mother Tongue', value: p?.religionDetails?.motherTongue || '' },
    { label: 'Community', value: p?.religionDetails?.community || '' },
    { label: 'Caste No Bar', value: p?.religionDetails?.casteNoBar || '' },
    { label: 'Gotra/Gothra', value: p?.religionDetails?.gothra || '' },
  ];
  const mapFamilyInfo = (p: any) => [
    { label: 'Family Background', value: p?.familyDetails?.familyBackground || '' },
    { label: 'Father is', value: p?.familyDetails?.fatherOccupation || '' },
    { label: 'Mother is', value: p?.familyDetails?.motherOccupation || '' },
    { label: 'Brother', value: p?.familyDetails?.brother?.toString() || '' },
    { label: 'Sister', value: p?.familyDetails?.sister?.toString() || '' },
    { label: 'Family Based Out of', value: p?.familyDetails?.familyBasedOutOf || '' },
  ];
  const mapLifestyleInfo = (p: any) => [
  { label: 'Habits', items: [
      `Diet - ${p?.lifestyleHobbies?.diet || ''}`,
      `Drinking - ${normalizeEnum(p?.lifestyleHobbies?.drinking)}`,
      `Smoking - ${normalizeEnum(p?.lifestyleHobbies?.smoking)}`,
      `Open to pets - ${p?.lifestyleHobbies?.openToPets || ''}`,
  ] },
  { label: 'Assets', items: [
      `Own a House - ${p?.lifestyleHobbies?.ownHouse || ''}`,
      `Own a Car - ${p?.lifestyleHobbies?.ownCar || ''}`,
  ] },
  { label: 'Food I cook', items: p?.lifestyleHobbies?.foodICook || [] },
  { label: 'Hobbies', items: p?.lifestyleHobbies?.hobbies || [] },
  { label: 'Interests', items: p?.lifestyleHobbies?.interests || [] },
  { label: 'Favorite Music', items: p?.lifestyleHobbies?.favoriteMusic || [] },
  { label: 'Sports', items: p?.lifestyleHobbies?.sports || [] },
  { label: 'Cuisine', items: p?.lifestyleHobbies?.cuisine || [] },
  { label: 'Movies', items: p?.lifestyleHobbies?.movies || [] },
  { label: 'TV Shows', items: p?.lifestyleHobbies?.tvShows || [] },
  { label: 'Vacation Destination', items: p?.lifestyleHobbies?.vacationDestination || [] },
];

  const mapAstroDetails = (p: any) => [
  { label: 'Zodiac', value: p?.astroDetails?.zodiacSign || '' },
  { label: 'Date of Birth', value: p?.astroDetails?.dateOfBirth || '' },
  { label: 'Time of Birth', value: p?.astroDetails?.timeOfBirth || '' },
  { label: 'City of Birth', value: p?.astroDetails?.cityOfBirth || '' },
  { label: 'Manglik', value: normalizeEnum(p?.astroDetails?.manglik) },
];

  const mapEducation = (p: any) => [
    { label: 'Highest Degree', value: p?.educationDetails?.highestDegree || '' },
    { label: 'Post Graduation', value: p?.educationDetails?.postGraduation || '' },
    { label: 'Under Graduation', value: p?.educationDetails?.underGraduation || '' },
    { label: 'School', value: p?.educationDetails?.school || '' },
    { label: 'School Stream', value: p?.educationDetails?.schoolStream || '' },
  ];
  const mapCareer = (p: any) => [
    { label: 'Employee In', value: p?.careerDetails?.employedIn || '' },
    { label: 'Occupation', value: p?.careerDetails?.occupation || '' },
    { label: 'Company', value: p?.careerDetails?.company || '' },
    { label: 'Annual Income', value: p?.careerDetails?.annualIncome || '' },
  ];
  const mapStats = (p: any) => [
    { number: '0', label: 'Profile Visits', color: 'bg-purple-50 text-purple-600' },
    { number: '0', label: 'Shortlisted Profiles', color: 'bg-yellow-50 text-yellow-600' },
    { number: '0', label: 'Not-Now', color: 'bg-pink-50 text-pink-600' },
    // { number: '0', label: 'Nearby Matches', color: 'bg-orange-50 text-orange-600' },
  ];

  if (loading) {
    return <div className="min-h-screen bg-white flex items-center justify-center">Loading profile...</div>;
  }
  if (error) {
    return <div className="min-h-screen bg-white flex items-center justify-center text-red-500">{error}</div>;
  }
  if (!profile) {
    return <div className="min-h-screen bg-white flex items-center justify-center">No profile data found.</div>;
  }

  return (
    <div className="min-h-screen bg-white p-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-end mb-4">
          {/* <button
            onClick={handleUpdateProfile}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Update Profile
          </button> */}
        </div>
        {updateStatus && (
          <div className={`mb-4 p-2 rounded ${updateStatus.includes('successfully') ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
            {updateStatus}
          </div>
        )}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 bg-white">
          {/* Left Column */}
          <div className="lg:col-span-1 space-y-6">

<ProfilePhotoSection
  imageUrl={profile?.profileImage || DEFAULT_PROFILE_IMAGE}
  photoUploading={photoUploading}
  onPhotoChange={handlePhotoUpload}
/>

            <AboutMeSection aboutMe={profile?.aboutMe} />
            <EducationSection education={mapEducation(profile)} />
            <CareerSection career={mapCareer(profile)} />
            <AstroDetailsSection astroDetails={mapAstroDetails(profile)} />
          </div>
          {/* Right Column */}
          <div className="lg:col-span-2 space-y-6">
            <StatsSection stats={mapStats(profile)} />
            <BasicInfoSection basicInfo={mapBasicInfo(profile)} />
            <ReligiousInfoSection religiousInfo={mapReligiousInfo(profile)} />
            <FamilyInfoSection familyInfo={mapFamilyInfo(profile)} />
            <LifestyleInfoSection lifestyleInfo={mapLifestyleInfo(profile)} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;