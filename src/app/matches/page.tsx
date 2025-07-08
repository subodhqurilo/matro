'use client';
import React, { useState } from 'react';
import { Check, X, MapPin, Briefcase, GraduationCap, Heart, MessageCircle, Star } from 'lucide-react';

interface Profile {
  id: string;
  name: string;
  age: number;
  height: string;
  profession: string;
  salary: string;
  education: string;
  location: string;
  languages: string[];
  image: string;
  lastSeen: string;
  verified: boolean;
}

const profiles: Profile[] = [
  {
    id: '1',
    name: 'Aaradhya Sharma',
    age: 28,
    height: '5\'5"',
    profession: 'Software Developer',
    salary: '$5-7 Lakh',
    education: 'B.Tech in Computer Science',
    location: 'Delhi',
    languages: ['Hindi', 'English'],
    image: 'https://images.pexels.com/photos/1391498/pexels-photo-1391498.jpeg?auto=compress&cs=tinysrgb&w=400',
    lastSeen: 'Last seen an hour ago',
    verified: true
  },
  {
    id: '2',
    name: 'Priya Patel',
    age: 26,
    height: '5\'3"',
    profession: 'Marketing Manager',
    salary: '$4-6 Lakh',
    education: 'MBA in Marketing',
    location: 'Mumbai',
    languages: ['Hindi', 'English', 'Gujarati'],
    image: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=400',
    lastSeen: 'Last seen 2 hours ago',
    verified: true
  },
  {
    id: '3',
    name: 'Anita Reddy',
    age: 24,
    height: '5\'4"',
    profession: 'Graphic Designer',
    salary: '$3-5 Lakh',
    education: 'BFA in Design',
    location: 'Bangalore',
    languages: ['Hindi', 'English', 'Telugu'],
    image: 'https://images.pexels.com/photos/1130626/pexels-photo-1130626.jpeg?auto=compress&cs=tinysrgb&w=400',
    lastSeen: 'Last seen 30 minutes ago',
    verified: true
  },
  {
    id: '4',
    name: 'Kavya Singh',
    age: 29,
    height: '5\'6"',
    profession: 'Data Scientist',
    salary: '$8-12 Lakh',
    education: 'M.Tech in AI/ML',
    location: 'Hyderabad',
    languages: ['Hindi', 'English'],
    image: 'https://images.pexels.com/photos/1036623/pexels-photo-1036623.jpeg?auto=compress&cs=tinysrgb&w=400',
    lastSeen: 'Last seen 45 minutes ago',
    verified: true
  },
  {
    id: '5',
    name: 'Riya Gupta',
    age: 27,
    height: '5\'2"',
    profession: 'Financial Analyst',
    salary: '$6-8 Lakh',
    education: 'CA, CPA',
    location: 'Pune',
    languages: ['Hindi', 'English', 'Marathi'],
    image: 'https://images.pexels.com/photos/1468379/pexels-photo-1468379.jpeg?auto=compress&cs=tinysrgb&w=400',
    lastSeen: 'Last seen 1 hour ago',
    verified: true
  },
  {
    id: '6',
    name: 'Sneha Joshi',
    age: 25,
    height: '5\'1"',
    profession: 'Product Manager',
    salary: '$7-10 Lakh',
    education: 'MBA in Product Management',
    location: 'Chennai',
    languages: ['Hindi', 'English', 'Tamil'],
    image: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=400',
    lastSeen: 'Last seen 15 minutes ago',
    verified: true
  }
];

const tabs = [
  { id: 'received', label: 'Received', count: 32 },
  { id: 'accepted', label: 'Accepted', count: 0 },
  { id: 'sent', label: 'Sent', count: 0 },
  { id: 'deleted', label: 'Deleted', count: 0 }
];

function App() {
  const [activeTab, setActiveTab] = useState('received');
  const [acceptedProfiles, setAcceptedProfiles] = useState<Set<string>>(new Set());
  const [declinedProfiles, setDeclinedProfiles] = useState<Set<string>>(new Set());

  const handleAccept = (profileId: string) => {
    setAcceptedProfiles(prev => new Set(prev).add(profileId));
  };

  const handleDecline = (profileId: string) => {
    setDeclinedProfiles(prev => new Set(prev).add(profileId));
  };

  const getVisibleProfiles = () => {
    switch (activeTab) {
      case 'received':
        return profiles.filter(profile => !acceptedProfiles.has(profile.id) && !declinedProfiles.has(profile.id));
      case 'accepted':
        return profiles.filter(profile => acceptedProfiles.has(profile.id));
      case 'sent':
        return [];
      case 'deleted':
        return profiles.filter(profile => declinedProfiles.has(profile.id));
      default:
        return profiles;
    }
  };

  const visibleProfiles = getVisibleProfiles();

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-white to-pink-50">
      <div className="max-w-6xl mx-auto px-4 py-8">
      

        {/* Tabs */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <div className="flex space-x-1 bg-gray-100 p-1 rounded-xl">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-1 py-3 px-4 rounded-lg font-medium transition-all duration-300 ${
                  activeTab === tab.id
                    ? 'bg-white text-pink-600 shadow-md transform scale-105'
                    : 'text-gray-600 hover:text-gray-800 hover:bg-gray-50'
                }`}
              >
                {tab.label}
                {tab.count > 0 && (
                  <span className={`ml-2 px-2 py-1 rounded-full text-xs font-bold ${
                    activeTab === tab.id
                      ? 'bg-pink-100 text-pink-700'
                      : 'bg-gray-200 text-gray-600'
                  }`}>
                    {tab.count}
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Profiles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {visibleProfiles.map((profile) => (
            <div
              key={profile.id}
              className="bg-white rounded-3xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group hover:scale-105"
            >
              {/* Profile Image */}
              <div className="relative h-64 overflow-hidden">
                <img
                  src={profile.image}
                  alt={profile.name}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                />
                <div className="absolute top-4 right-4 bg-white rounded-full p-2 shadow-md">
                  <Star className="w-4 h-4 text-yellow-500 fill-current" />
                </div>
                {profile.verified && (
                  <div className="absolute top-4 left-4 bg-emerald-500 text-white px-3 py-1 rounded-full text-xs font-medium">
                    Verified
                  </div>
                )}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4">
                  <div className="text-white">
                    <h3 className="text-xl font-bold">{profile.name}</h3>
                    <p className="text-sm opacity-90">{profile.lastSeen}</p>
                  </div>
                </div>
              </div>

              {/* Profile Details */}
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-2">
                    <span className="text-lg font-semibold text-gray-800">
                      {profile.age} Years
                    </span>
                    <span className="text-gray-500">•</span>
                    <span className="text-gray-600">{profile.height}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <MapPin className="w-4 h-4 text-gray-400" />
                    <span className="text-sm text-gray-600">{profile.location}</span>
                  </div>
                </div>

                <div className="space-y-3 mb-6">
                  <div className="flex items-center space-x-3">
                    <Briefcase className="w-4 h-4 text-gray-400" />
                    <div>
                      <p className="text-sm font-medium text-gray-800">{profile.profession}</p>
                      <p className="text-xs text-gray-500">Earns {profile.salary}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <GraduationCap className="w-4 h-4 text-gray-400" />
                    <p className="text-sm text-gray-600">{profile.education}</p>
                  </div>

                  <div className="flex items-center space-x-3">
                    <MessageCircle className="w-4 h-4 text-gray-400" />
                    <p className="text-sm text-gray-600">{profile.languages.join(', ')}</p>
                  </div>
                </div>

                {/* Action Buttons */}
                {activeTab === 'received' && (
                  <div className="flex space-x-3">
                    <button
                      onClick={() => handleDecline(profile.id)}
                      className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 py-3 px-4 rounded-2xl font-medium transition-all duration-300 flex items-center justify-center space-x-2 group"
                    >
                      <X className="w-5 h-5 group-hover:scale-110 transition-transform" />
                      <span>Decline</span>
                    </button>
                    <button
                      onClick={() => handleAccept(profile.id)}
                      className="flex-1 bg-gradient-to-r from-emerald-500 to-green-500 hover:from-emerald-600 hover:to-green-600 text-white py-3 px-4 rounded-2xl font-medium transition-all duration-300 flex items-center justify-center space-x-2 group shadow-lg"
                    >
                      <Check className="w-5 h-5 group-hover:scale-110 transition-transform" />
                      <span>Accept</span>
                    </button>
                  </div>
                )}

                {activeTab === 'accepted' && (
                  <div className="text-center">
                    <div className="bg-emerald-50 text-emerald-700 py-3 px-4 rounded-2xl font-medium">
                      ✓ Accepted
                    </div>
                  </div>
                )}

                {activeTab === 'deleted' && (
                  <div className="text-center">
                    <div className="bg-gray-50 text-gray-600 py-3 px-4 rounded-2xl font-medium">
                      ✗ Declined
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {visibleProfiles.length === 0 && (
          <div className="text-center py-16">
            <div className="bg-gray-100 rounded-full w-24 h-24 mx-auto mb-6 flex items-center justify-center">
              <Heart className="w-12 h-12 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">No matches found</h3>
            <p className="text-gray-600">
              {activeTab === 'received' && 'New matches will appear here'}
              {activeTab === 'accepted' && 'Your accepted matches will appear here'}
              {activeTab === 'sent' && 'Your sent requests will appear here'}
              {activeTab === 'deleted' && 'Your declined matches will appear here'}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
export default App;
