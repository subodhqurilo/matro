'use client';
import React, { useState } from 'react';
import Tabs from '../../components/matches/Tabs';
import ProfilesGrid from '../../components/matches/ProfilesGrid';
import EmptyState from '../../components/matches/EmptyState';

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
        <Tabs tabs={tabs} activeTab={activeTab} setActiveTab={setActiveTab} />

        {/* Profiles Grid */}
        {visibleProfiles.length > 0 ? (
          <ProfilesGrid
            profiles={visibleProfiles}
            activeTab={activeTab}
            onAccept={handleAccept}
            onDecline={handleDecline}
          />
        ) : (
          <EmptyState activeTab={activeTab} />
        )}
      </div>
    </div>
  );
}
export default App;
