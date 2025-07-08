import React from 'react';
import { Check, X, MapPin, Briefcase, GraduationCap, MessageCircle, Star } from 'lucide-react';

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

interface ProfileCardProps {
  profile: Profile;
  activeTab: string;
  onAccept?: (profileId: string) => void;
  onDecline?: (profileId: string) => void;
}

const ProfileCard: React.FC<ProfileCardProps> = ({ profile, activeTab, onAccept, onDecline }) => (
  <div
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
      {activeTab === 'received' && onAccept && onDecline && (
        <div className="flex space-x-3">
          <button
            onClick={() => onDecline(profile.id)}
            className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 py-3 px-4 rounded-2xl font-medium transition-all duration-300 flex items-center justify-center space-x-2 group"
          >
            <X className="w-5 h-5 group-hover:scale-110 transition-transform" />
            <span>Decline</span>
          </button>
          <button
            onClick={() => onAccept(profile.id)}
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
);

export default ProfileCard; 