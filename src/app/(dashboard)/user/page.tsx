import React from 'react';
import { Check, Heart, Star, MapPin, Clock, User, Home, Briefcase, GraduationCap, Users, Calendar, Moon, X } from 'lucide-react';
import Image from 'next/image';

function App() {
  const similarProfiles = [
    {
      id: 1,
      name: "Priya Gupta",
      age: 26,
      height: "5'4\"",
      religion: "Hindu",
      job: "Software Engineer",
      income: "₹8-10 Lacs",
      education: "B.Tech",
      image: "https://images.pexels.com/photos/1181424/pexels-photo-1181424.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop"
    },
    {
      id: 2,
      name: "Kavya Reddy",
      age: 24,
      height: "5'2\"",
      religion: "Hindu",
      job: "Marketing Manager",
      income: "₹6-8 Lacs",
      education: "MBA",
      image: "https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop"
    },
    {
      id: 3,
      name: "Meera Joshi",
      age: 25,
      height: "5'5\"",
      religion: "Hindu",
      job: "Doctor",
      income: "₹10-12 Lacs",
      education: "MBBS",
      image: "https://images.pexels.com/photos/1181263/pexels-photo-1181263.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop"
    },
    {
      id: 4,
      name: "Anjali Singh",
      age: 27,
      height: "5'3\"",
      religion: "Hindu",
      job: "Teacher",
      income: "₹4-6 Lacs",
      education: "M.Ed",
      image: "https://images.pexels.com/photos/1181519/pexels-photo-1181519.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop"
    }
  ];

  const personalDetails = [
    { label: "Age", value: "25 years", icon: <User className="w-4 h-4" /> },
    { label: "Height", value: "5'6\"", icon: <User className="w-4 h-4" /> },
    { label: "Spoken Languages", value: "Hindi, English, Tamil", icon: <Users className="w-4 h-4" /> },
    { label: "Profile Created By", value: "Self", icon: <User className="w-4 h-4" /> },
    { label: "Marital Status", value: "Never Married", icon: <Heart className="w-4 h-4" /> },
    { label: "Lives In", value: "Mumbai, Maharashtra", icon: <MapPin className="w-4 h-4" /> },
    { label: "Eating Habits", value: "Vegetarian", icon: <Users className="w-4 h-4" /> },
    { label: "Religion", value: "Hindu", icon: <Star className="w-4 h-4" /> },
    { label: "Gothra", value: "Bharadwaj", icon: <Star className="w-4 h-4" /> },
    { label: "Dosha", value: "No Dosha", icon: <Moon className="w-4 h-4" /> },
    { label: "Employment", value: "Private Sector", icon: <Briefcase className="w-4 h-4" /> },
    { label: "Annual Income", value: "₹8-10 Lacs", icon: <Briefcase className="w-4 h-4" /> },
    { label: "Education", value: "B.Tech Computer Science", icon: <GraduationCap className="w-4 h-4" /> },
    { label: "Occupation", value: "Software Engineer", icon: <Briefcase className="w-4 h-4" /> }
  ];

  const partnerPreferences = [
    {
      category: "Basic preferences",
      preferences: [
        { label: "Preferred Groom's Age", value: "25-30 Yrs", match: true },
        { label: "Preferred Height", value: "5'4\" - 5'10\"", match: false },
        { label: "Preferred Marital status", value: "Never married", match: true },
        { label: "Preferred Mother Tongue", value: "Gujarati", match: false },
        { label: "Preferred Physical Status", value: "Normal", match: true },
        { label: "Preferred Eating Habits", value: "Vegetarian, Eggetarian", match: true },
        { label: "Preferred Smoking Habits", value: "Never smokes", match: false },
        { label: "Preferred Drinking Habits", value: "Never drinks", match: false }
      ]
    },
    {
      category: "Religious Preference",
      preferences: [
        { label: "Preferred Religion", value: "Hindu", match: true },
        { label: "Preferred Caste", value: "Yadhuva", match: true },
        { label: "Preferred Subcaste", value: "Any", match: true },
        { label: "Preferred Dosham", value: "Doesn't matter", match: true }
      ]
    },
    {
      category: "Professional Preference",
      preferences: [
        { label: "Preferred Education", value: "Any", match: true },
        { label: "Preferred Employment type", value: "Any", match: true },
        { label: "Preferred Occupation", value: "Any", match: true },
        { label: "Preferred Annual Income", value: "₹5 lakhs - 20 lakhs", match: true }
      ]
    },
    {
      category: "Location Preference",
      preferences: [
        { label: "Preferred Country", value: "10 lakhs - 20 lakhs", match: true },
        { label: "Preferred Residing state", value: "10 lakhs - 20 lakhs", match: true },
        { label: "Preferred Residing city", value: "10 lakhs - 20 lakhs", match: true },
        { label: "Preferred Citizenship", value: "10 lakhs - 20 lakhs", match: true }
      ]
    }
  ];

  const matchingProfiles = [
    {
      name: "Aaradhya Sharma",
      age: 28,
      height: "5'3\"",
      location: "Brahmin",
      profession: "Software Developer",
      income: "Earns ₹5-7 Lakh",
      education: "B.Tech in computer science",
      image: "https://images.pexels.com/photos/1181424/pexels-photo-1181424.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop"
    },
    {
      name: "Aaradhya Sharma",
      age: 28,
      height: "5'3\"",
      location: "Brahmin",
      profession: "Software Developer",
      income: "Earns ₹5-7 Lakh",
      education: "B.Tech in computer science",
      image: "https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop"
    },
    {
      name: "Aaradhya Sharma",
      age: 28,
      height: "5'3\"",
      location: "Brahmin",
      profession: "Software Developer",
      income: "Earns ₹5-7 Lakh",
      education: "B.Tech in computer science",
      image: "https://images.pexels.com/photos/1181263/pexels-photo-1181263.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop"
    },
    {
      name: "Aaradhya Sharma",
      age: 28,
      height: "5'3\"",
      location: "Brahmin",
      profession: "Software Developer",
      income: "Earns ₹5-7 Lakh",
      education: "B.Tech in computer science",
      image: "https://images.pexels.com/photos/1181519/pexels-photo-1181519.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 font-['Inter',system-ui,sans-serif]">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Mobile Header */}
        <div className="lg:hidden bg-white rounded-2xl shadow-lg p-6 mb-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-800">Aaradhya Sharma</h1>
              <p className="text-sm text-gray-500">ID: R9876668</p>
              <p className="text-sm text-emerald-600 flex items-center gap-1">
                <Clock className="w-3 h-3" />
                Last seen: 2 days ago
              </p>
            </div>
            <div className="w-16 h-16 rounded-full overflow-hidden border-4 border-purple-200">
              <Image 
                src="https://images.pexels.com/photos/1181424/pexels-photo-1181424.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop" 
                alt="Profile" 
                width={64}
                height={64}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left Column */}
          <div className="lg:w-1/3 space-y-6">
            {/* Profile Picture & Verification - Hidden on mobile */}
            <div className="hidden lg:block bg-white rounded-2xl shadow-lg p-6">
              <div className="text-center">
                <div className="relative w-48 h-48 mx-auto mb-4">
                  <Image 
                    src="https://images.pexels.com/photos/1181424/pexels-photo-1181424.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop" 
                    alt="Profile" 
                    width={192}
                    height={192}
                    className="w-full h-full object-cover rounded-full border-4 border-purple-200"
                  />
                  <div className="absolute -bottom-2 -right-2 bg-emerald-500 text-white p-2 rounded-full">
                    <Check className="w-5 h-5" />
                  </div>
                </div>
                
                <div className="bg-gradient-to-r from-emerald-50 to-emerald-100 border border-emerald-200 rounded-xl p-4 mb-4">
                  <div className="flex items-center justify-center gap-2 text-emerald-700">
                    <Check className="w-5 h-5" />
                    <span className="font-semibold">Verified Profile</span>
                  </div>
                  <p className="text-sm text-emerald-600 mt-1">Name verified against Govt ID</p>
                </div>
              </div>
            </div>

            {/* Similar Profiles */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Similar Profiles</h3>
              <div className="flex gap-4 overflow-x-auto pb-2">
                {similarProfiles.map((profile) => (
                  <div key={profile.id} className="flex-shrink-0 w-48 bg-gradient-to-b from-purple-50 to-pink-50 rounded-xl p-4 border border-purple-100">
                    <div className="w-16 h-16 rounded-full overflow-hidden mx-auto mb-3">
                      <Image 
                        src={profile.image} 
                        alt={profile.name} 
                        width={64}
                        height={64}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="text-center">
                      <h4 className="font-semibold text-sm text-gray-800">{profile.name}</h4>
                      <p className="text-xs text-gray-600 mb-1">{profile.age}, {profile.height.replace(/'/g, "&apos;")}, {profile.religion}</p>
                      <p className="text-xs text-gray-600 mb-1">{profile.job}</p>
                      <p className="text-xs text-purple-600 font-medium mb-1">{profile.income}</p>
                      <p className="text-xs text-gray-500">{profile.education}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Matching Profiles (moved here) */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-4 mb-4">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                    <span className="text-purple-600 font-semibold text-sm">14</span>
                  </div>
                  <span className="text-purple-700 font-medium">You match 14/21 of her preferences</span>
                </div>
                <p className="text-sm text-gray-600 mb-3">you match</p>
                <div className="w-full bg-purple-200 rounded-full h-2">
                  <div className="bg-purple-600 h-2 rounded-full" style={{ width: '67%' }}></div>
                </div>
              </div>
              <div className="space-y-3">
                {matchingProfiles.map((profile, index) => (
                  <div key={index} className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg p-3 border border-purple-100">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-full overflow-hidden flex-shrink-0">
                        <Image 
                          src={profile.image} 
                          alt={profile.name} 
                          width={48}
                          height={48}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-semibold text-sm text-gray-800 truncate">{profile.name}</h4>
                        <p className="text-xs text-gray-600">
                          <span className="font-Lato">{profile.age} Yrs</span> . {profile.height.replace(/"/g, '&quot;')} . {profile.location}
                        </p>
                        <p className="text-xs text-gray-600">{profile.profession}, {profile.income}</p>
                        <p className="text-xs text-gray-500">{profile.education}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          

          {/* Right Column */}
          <div className="lg:w-2/3 space-y-6">
            {/* Header - Hidden on mobile */}
            <div className="hidden lg:block bg-white rounded-2xl shadow-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h1 className="text-3xl font-bold text-gray-800">Aaradhya Sharma</h1>
                  <p className="text-gray-500">ID: R9876668</p>
                  <p className="text-emerald-600 flex items-center gap-1 mt-1">
                    <Clock className="w-4 h-4" />
                    Last seen: 2 days ago
                  </p>
                </div>
                <div className="flex gap-3">
                  <button className="bg-amber-600 hover:bg-amber-700 text-white px-4 py-2 rounded-lg font-medium transition-colors">
                    Your & Him
                  </button>
                  <button className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg font-medium transition-colors">
                    Astro
                  </button>
                  <button className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center gap-2">
                    <Check className="w-4 h-4" />
                    Accept
                  </button>
                </div>
              </div>
            </div>

            {/* Action Buttons - Mobile Only */}
            <div className="lg:hidden flex gap-2 mb-6">
              <button className="flex-1 bg-amber-600 hover:bg-amber-700 text-white py-3 rounded-lg font-medium transition-colors">
                Your & Him
              </button>
              <button className="flex-1 bg-purple-600 hover:bg-purple-700 text-white py-3 rounded-lg font-medium transition-colors">
                Astro
              </button>
              <button className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white py-3 rounded-lg font-medium transition-colors flex items-center justify-center gap-2">
                <Check className="w-4 h-4" />
                Accept
              </button>
            </div>

            {/* Personal Details */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Personal Details</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {personalDetails.map((detail, index) => (
                  <div key={index} className="flex items-center gap-3 p-3 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg">
                    <div className="text-purple-600">
                      {detail.icon}
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">{detail.label}</p>
                      <p className="font-medium text-gray-800">{detail.value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Family Information */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Family Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center gap-3 p-3 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg">
                  <div className="text-purple-600">
                    <Home className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Family Status</p>
                    <p className="font-medium text-gray-800">Upper Middle Class</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg">
                  <div className="text-purple-600">
                    <Users className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Family Type</p>
                    <p className="font-medium text-gray-800">Nuclear</p>
                  </div>
                </div>
              </div>
            </div>

            {/* About Myself */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">About Myself</h2>
              <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg p-4">
                <p className="text-gray-700 leading-relaxed">
                  I am a passionate software engineer with a love for technology and innovation. I believe in maintaining a perfect balance between personal and professional life. Family values are very important to me, and I enjoy spending quality time with loved ones. I am looking for a life partner who shares similar values, is understanding, and believes in growing together in life&apos;s journey. I enjoy reading, traveling, and exploring new cuisines. I believe in honesty, respect, and mutual understanding as the foundation of a strong relationship.
                </p>
              </div>
            </div>

            {/* Horoscope */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Horoscope</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div className="flex items-center gap-3 p-3 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg">
                  <div className="text-purple-600">
                    <Calendar className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Date of Birth</p>
                    <p className="font-medium text-gray-800">12th March, 1999</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg">
                  <div className="text-purple-600">
                    <Clock className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Time of Birth</p>
                    <p className="font-medium text-gray-800">08:30 AM</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg">
                  <div className="text-purple-600">
                    <Star className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Zodiac (Rashi)</p>
                    <p className="font-medium text-gray-800">Meen (Pisces)</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg">
                  <div className="text-purple-600">
                    <Moon className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Nakshatra</p>
                    <p className="font-medium text-gray-800">Uttara Bhadrapada</p>
                  </div>
                </div>
              </div>
              <div className="bg-gradient-to-r from-emerald-50 to-emerald-100 border border-emerald-200 rounded-xl p-4">
                <p className="text-emerald-700 text-sm">
                  <strong>Note:</strong> Horoscope match is not necessary for this profile
                </p>
              </div>
            </div>

            {/* Partner Preferences */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-6">Partner Preference</h2>
              
              <div className="flex flex-col lg:flex-row gap-8">
               

                {/* Right side - Preferences */}
                <div className="lg:w-2/3">
                  <div className="space-y-6">
                    {partnerPreferences.map((section, sectionIndex) => (
                      <div key={sectionIndex}>
                        <h3 className="text-lg font-semibold text-gray-800 mb-4">{section.category}</h3>
                        <div className="space-y-3">
                          {section.preferences.map((pref, prefIndex) => (
                            <div key={prefIndex} className="flex items-center justify-between p-3 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg">
                              <div className="flex-1">
                                <p className="text-sm text-gray-600">{pref.label}</p>
                                <p className="font-medium text-gray-800">{pref.value}</p>
                              </div>
                              <div className="flex items-center gap-2">
                                <span className="text-sm text-gray-600">you match</span>
                                <div className={`w-6 h-6 rounded-full flex items-center justify-center ${
                                  pref.match 
                                    ? 'bg-emerald-100 text-emerald-600' 
                                    : 'bg-red-100 text-red-600'
                                }`}>
                                  {pref.match ? (
                                    <Check className="w-4 h-4" />
                                  ) : (
                                    <X className="w-4 h-4" />
                                  )}
                                </div>
                              </div>
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
      </div>
    </div>
  );
}

export default App;