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

const API_URL = 'https://bxcfrrl4-3000.inc1.devtunnels.ms/api/profile/self';

const ProfilePage: React.FC = () => {
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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
        setProfile(data.data || data); // adjust if API response shape is different
      } catch (err: any) {
        setError(err.message || 'Failed to fetch profile');
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

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
      `Drinking - ${p?.lifestyleHobbies?.drinking === 'true' ? 'Yes' : 'No'}`,
      `Smoking - ${p?.lifestyleHobbies?.smoking === 'true' ? 'Yes' : 'No'}`,
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
    { label: 'Manglik', value: p?.astroDetails?.manglik || '' },
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
  // Stats are not present in this API response, so use dummy values or remove if not needed
  const mapStats = (p: any) => [
    { number: '0', label: 'Profile Visits', color: 'bg-purple-50 text-purple-600' },
    { number: '0', label: 'Shortlisted Profiles', color: 'bg-yellow-50 text-yellow-600' },
    { number: '0', label: 'Horoscope Matches', color: 'bg-pink-50 text-pink-600' },
    { number: '0', label: 'Nearby Matches', color: 'bg-orange-50 text-orange-600' },
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
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column */}
          <div className="lg:col-span-1 space-y-6">
            <ProfilePhotoSection imageUrl={profile?.profileImage?.profileImage} />
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