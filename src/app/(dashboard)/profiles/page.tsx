import React from 'react';
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

const ProfilePage: React.FC = () => {
  const stats = [
    { number: '29', label: 'Profile Visits', color: 'bg-purple-50 text-purple-600' },
    { number: '30', label: 'Shortlisted Profiles', color: 'bg-yellow-50 text-yellow-600' },
    { number: '29', label: 'Horoscope Matches', color: 'bg-pink-50 text-pink-600' },
    { number: '29', label: 'Nearby Matches', color: 'bg-orange-50 text-orange-600' },
  ];

  const basicInfo = [
    { label: 'Posted by', value: 'Self' },
    { label: 'Age', value: '24' },
    { label: 'Marital Status', value: 'Never Married' },
    { label: 'Height', value: '5\'2"(157)' },
    { label: 'Any Disability', value: 'None' },
    { label: 'Health Information', value: 'Not Specified' },
  ];

  const religiousInfo = [
    { label: 'Religion', value: 'Hindu' },
    { label: 'Mother Tongue', value: 'Hindi,English' },
    { label: 'Community', value: 'Agarwal' },
    { label: 'Sub Community', value: 'Not Specified' },
    { label: 'Caste No Bar', value: 'Yes' },
    { label: 'Gotra/Gothra', value: 'Not Specified' },
  ];

  const familyInfo = [
    { label: 'Family Background', value: 'Nuclear' },
    { label: 'Family Income', value: '50-70 Lakh' },
    { label: 'Father is', value: 'Business' },
    { label: 'Family Based Out of', value: 'Not Specified' },
    { label: 'Mother is', value: 'Housewife' },
    { label: 'Brother', value: '1' },
    { label: 'Sister', value: '3' },
  ];

  const lifestyleInfo = [
    { label: 'Habits', items: ['Dietary Habits - Vegetarian', 'Drinking Habits - Yes', 'Smoking Habits - Yes', 'Open to pets - Yes'] },
    { label: 'Assets', items: ['Own a House - Yes', 'Own a Car - Yes'] },
    { label: 'Food I cook', items: ['Paneer, Chicken'] },
    { label: 'Hobbies', items: ['Dancing, singing'] },
    { label: 'Interests', items: ['Travelling'] },
    { label: 'Favorite Music', items: ['Travelling'] },
    { label: 'Sports', items: ['Travelling'] },
    { label: 'Cuisine', items: ['Travelling'] },
    { label: 'Movies', items: ['Travelling'] },
    { label: 'TV Shows', items: ['Travelling'] },
    { label: 'Vacation Destination', items: ['Travelling'] },
  ];

  const astroDetails = [
    { label: 'Zodiac', value: 'Virgo' },
    { label: 'Date of Birth', value: '12/12/1998' },
    { label: 'Time of Birth', value: '11am - 3d sec' },
    { label: 'City of Birth', value: 'Delhi' },
  ];

  const education = [
    { label: 'Highest Degree', value: 'MCA' },
    { label: 'Post Graduation', value: 'NULL' },
    { label: 'Under Graduation', value: 'BCA' },
    { label: 'School', value: 'Science Das VK' },
  ];

  const career = [
    { label: 'Employee In', value: 'Private Sector' },
    { label: 'Occupation', value: 'UI/UX Designer' },
    { label: 'Company', value: 'Qurilc' },
    { label: 'Annual Income', value: '1 lakh - 2 lakh' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column */}
          <div className="lg:col-span-1 space-y-6">
            <ProfilePhotoSection />
            <AboutMeSection />
            <EducationSection education={education} />
            <CareerSection career={career} />
            <AstroDetailsSection astroDetails={astroDetails} />
          </div>
          {/* Right Column */}
          <div className="lg:col-span-2 space-y-6">
            <StatsSection stats={stats} />
            <BasicInfoSection basicInfo={basicInfo} />
            <ReligiousInfoSection religiousInfo={religiousInfo} />
            <FamilyInfoSection familyInfo={familyInfo} />
            <LifestyleInfoSection lifestyleInfo={lifestyleInfo} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;