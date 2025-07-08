// pages/inbox.tsx
'use client';
import { useState } from 'react';
import InboxTabs from '@/components/inbox/InboxTabs';
import InboxCard from '@/components/inbox/InboxCards';

const sampleProfiles = [
  {
    id: 'R9876668',
    name: 'Aaradhya Sharma',
    avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
    age: '28 Yrs',
    height: "5'5''",
    religion: 'Brahmin',
    profession: 'Software Developer',
    salary: '₹5-7 LPA',
    degree: 'B.Tech in Computer Science',
    city: 'Delhi',
    languages: 'Hindi, English',
    lastSeen: 'an hour ago',
  },
  {
    id: 'R9876668',
    name: 'yashvi Sharma',
    avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
    age: '28 Yrs',
    height: "5'5''",
    religion: 'Brahmin',
    profession: 'Software Developer',
    salary: '₹5-7 LPA',
    degree: 'B.Tech in Computer Science',
    city: 'Delhi',
    languages: 'Hindi, English',
    lastSeen: 'an hour ago',
  },

];

export default function InboxPage() {
  const [selectedTab, setSelectedTab] = useState('Received');
  

  return (
    <div className="max-w-4xl mx-auto mt-6 px-4">
      <InboxTabs selected={selectedTab} onChange={setSelectedTab} />
      <div className="mt-4">
        {sampleProfiles.map((profile) => (
          <InboxCard key={profile.id} profile={profile} />
        ))}
      </div>
    </div>
  );
}
