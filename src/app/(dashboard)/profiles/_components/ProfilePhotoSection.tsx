'use client';
import React, { useState, useRef } from 'react';
import { Camera } from 'lucide-react';
import Image from 'next/image';

interface ProfilePhotoSectionProps {
  imageUrl?: string;
}

const UPDATE_PROFILE_IMAGE_API = 'https://bxcfrrl4-3000.inc1.devtunnels.ms/api/profile/update-profile-image';

const ProfilePhotoSection: React.FC<ProfilePhotoSectionProps> = ({ imageUrl }) => {
  const [previewUrl, setPreviewUrl] = useState<string | undefined>(imageUrl);
  const [status, setStatus] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      setStatus('Please select an image file.');
      return;
    }

    // Validate file size (e.g., max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      setStatus('Image size must be less than 5MB.');
      return;
    }

    // Show preview
    const preview = URL.createObjectURL(file);
    setPreviewUrl(preview);

    // Prepare form data
    const formData = new FormData();
    formData.append('profileImage', file);

    try {
      const token = localStorage.getItem('authToken');
      if (!token) throw new Error('No authentication token found. Please log in.');

      const response = await fetch(UPDATE_PROFILE_IMAGE_API, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
        body: formData,
      });

      if (!response.ok) throw new Error('Failed to update profile image');
      const data = await response.json();
      const newImageUrl = data?.data?.profileImageUrl || data?.profileImageUrl;
      if (newImageUrl) {
        setPreviewUrl(newImageUrl);
      }
      setStatus('Profile image updated successfully!');
    } catch (err: any) {
      setStatus(err.message || 'Failed to update profile image');
    } finally {
      // Clean up preview URL
      if (preview) URL.revokeObjectURL(preview);
    }
  };

  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm">
      {status && (
        <div
          className={`mb-4 p-2 rounded ${
            status.includes('successfully') ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
          }`}
        >
          {status}
        </div>
      )}
      <div className="relative">
        <div className="w-40 h-40 mx-auto rounded-full bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center overflow-hidden">
          <Image
            src={
              previewUrl ||
              'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop'
            }
            alt="Profile"
            width={160}
            height={160}
            className="w-full h-full object-cover"
          />
        </div>
        <input
          type="file"
          accept="image/*"
          ref={fileInputRef}
          className="hidden"
          onChange={handleFileChange}
        />
        <button
          onClick={handleButtonClick}
          className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-2 bg-[#7D0A0A] text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-red-700 transition-colors flex items-center gap-2"
        >
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
    </div>
  );
};

export default ProfilePhotoSection;