import React from 'react';
import { Camera } from 'lucide-react';
import Image from 'next/image';

interface ProfilePhotoSectionProps {
  imageUrl?: string;
}

const ProfilePhotoSection: React.FC<ProfilePhotoSectionProps> = ({ imageUrl }) => (
  <div className="bg-white rounded-2xl p-6 shadow-sm">
    <div className="relative">
      <div className="w-40 h-40 mx-auto rounded-full bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center overflow-hidden">
        <Image 
          src={imageUrl || "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop"}
          alt="Profile"
          width={160}
          height={160}
          className="w-full h-full object-cover"
        />
      </div>
      <button className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-2 bg-[#7D0A0A] text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-red-700 transition-colors flex items-center gap-2">
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
        <div className="bg-[#7D0A0A] h-2 rounded-full" style={{ width: '5%' }}></div>
      </div>
    </div>
  </div>
);

export default ProfilePhotoSection; 