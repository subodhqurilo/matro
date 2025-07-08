import React from 'react';
import ProfileCard from './ProfileCard';

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

interface ProfilesGridProps {
  profiles: Profile[];
  activeTab: string;
  onAccept?: (profileId: string) => void;
  onDecline?: (profileId: string) => void;
}

const ProfilesGrid: React.FC<ProfilesGridProps> = ({ profiles, activeTab, onAccept, onDecline }) => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    {profiles.map((profile) => (
      <ProfileCard
        key={profile.id}
        profile={profile}
        activeTab={activeTab}
        onAccept={onAccept}
        onDecline={onDecline}
      />
    ))}
  </div>
);

export default ProfilesGrid; 