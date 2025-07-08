import React from 'react';
import { Camera, Edit3, MapPin, Heart, Users, Star, Calendar } from 'lucide-react';

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
            {/* Profile Photo */}
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <div className="relative">
                <div className="w-40 h-40 mx-auto rounded-full bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center overflow-hidden">
                  <img 
                    src="https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop"
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                </div>
                <button className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-2 bg-red-600 text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-red-700 transition-colors flex items-center gap-2">
                  <Camera className="w-4 h-4" />
                  Add photos
                </button>
              </div>
              
              <div className="mt-8 text-center">
                <p className="text-sm text-gray-600 mb-2">Only you can see how to expand sharing</p>
                <div className="flex items-center justify-center gap-1 text-blue-600">
                  <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                  <span className="text-sm">Get 2x more matches</span>
                </div>
              </div>

              <div className="mt-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-700">Complete your profile</span>
                  <span className="text-sm text-gray-500">5%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-red-600 h-2 rounded-full" style={{ width: '5%' }}></div>
                </div>
              </div>
            </div>

            {/* About Me */}
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">About me</h3>
                <Edit3 className="w-4 h-4 text-gray-400 cursor-pointer hover:text-gray-600" />
              </div>
              <p className="text-gray-600 text-sm leading-relaxed">
                I am a software engineer by profession and a creative thinker at heart. I value intellect, honesty, and kindness. Outside of work, I enjoy reading, exploring new places, and spending quality time with family. I am looking for someone who is respectful, supportive, and shares a positive outlook towards life.
              </p>
            </div>

            {/* Education */}
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Education</h3>
                <Edit3 className="w-4 h-4 text-gray-400 cursor-pointer hover:text-gray-600" />
              </div>
              <div className="space-y-3">
                {education.map((item, index) => (
                  <div key={index} className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">{item.label}</span>
                    <span className="text-sm font-medium text-gray-900">{item.value}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Career */}
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Career</h3>
                <Edit3 className="w-4 h-4 text-gray-400 cursor-pointer hover:text-gray-600" />
              </div>
              <div className="space-y-3">
                {career.map((item, index) => (
                  <div key={index} className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">{item.label}</span>
                    <span className="text-sm font-medium text-gray-900">{item.value}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Astro Details */}
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Astro Details</h3>
                <Edit3 className="w-4 h-4 text-gray-400 cursor-pointer hover:text-gray-600" />
              </div>
              <div className="space-y-3">
                {astroDetails.map((item, index) => (
                  <div key={index} className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">{item.label}</span>
                    <span className="text-sm font-medium text-gray-900">{item.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="lg:col-span-2 space-y-6">
            {/* Stats */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {stats.map((stat, index) => (
                <div key={index} className="bg-white rounded-2xl p-6 shadow-sm text-center">
                  <div className={`inline-flex items-center justify-center w-12 h-12 rounded-full ${stat.color} text-2xl font-bold mb-3`}>
                    {stat.number}
                  </div>
                  <p className="text-sm text-gray-600 font-medium">{stat.label}</p>
                </div>
              ))}
            </div>

            {/* Basic Info */}
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-gray-900">Basic Info</h3>
                <Edit3 className="w-4 h-4 text-gray-400 cursor-pointer hover:text-gray-600" />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {basicInfo.map((item, index) => (
                  <div key={index} className="flex justify-between items-center py-2">
                    <span className="text-sm text-gray-600">{item.label}</span>
                    <span className="text-sm font-medium text-gray-900">{item.value}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Religious Background */}
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-gray-900">Religious Background</h3>
                <Edit3 className="w-4 h-4 text-gray-400 cursor-pointer hover:text-gray-600" />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {religiousInfo.map((item, index) => (
                  <div key={index} className="flex justify-between items-center py-2">
                    <span className="text-sm text-gray-600">{item.label}</span>
                    <span className="text-sm font-medium text-gray-900">{item.value}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Family */}
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-gray-900">Family</h3>
                <Edit3 className="w-4 h-4 text-gray-400 cursor-pointer hover:text-gray-600" />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {familyInfo.map((item, index) => (
                  <div key={index} className="flex justify-between items-center py-2">
                    <span className="text-sm text-gray-600">{item.label}</span>
                    <span className="text-sm font-medium text-gray-900">{item.value}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Lifestyle & Hobbies */}
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-gray-900">Lifestyle & Hobbies</h3>
                <Edit3 className="w-4 h-4 text-gray-400 cursor-pointer hover:text-gray-600" />
              </div>
              <div className="space-y-6">
                {lifestyleInfo.map((section, index) => (
                  <div key={index}>
                    <h4 className="text-sm font-semibold text-gray-900 mb-3">{section.label}</h4>
                    <div className="space-y-2">
                      {section.items.map((item, itemIndex) => (
                        <div key={itemIndex} className="text-sm text-gray-600 flex items-center gap-2">
                          <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
                          {item}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;