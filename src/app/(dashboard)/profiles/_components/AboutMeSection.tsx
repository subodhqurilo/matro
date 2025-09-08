'use client';
import React, { useState, useEffect } from 'react';
import { Edit3 } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import Modal from './Modal';

interface AboutMeSectionProps {
  aboutMe?: string;
}

const API_URL = 'https://matrimonial-backend-7ahc.onrender.com/api/profile/self';
const UPDATE_API_URL = 'https://matrimonial-backend-7ahc.onrender.com/api/profile/update-profile';

const AboutMeSection: React.FC<AboutMeSectionProps> = ({ aboutMe }) => {
  const [about, setAbout] = useState(aboutMe || '');
  const [modalOpen, setModalOpen] = useState(false);
  const [editValue, setEditValue] = useState(aboutMe || '');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [updateStatus, setUpdateStatus] = useState<string | null>(null);

  // Fetch profile data on mount
  useEffect(() => {
    const fetchProfile = async () => {
      setLoading(true);
      setError(null);
      try {
        const token = localStorage.getItem('authToken');
        if (!token) {
          throw new Error('No authentication token found. Please log in.');
        }
        
        const response = await fetch(API_URL, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
        });
        
        if (!response.ok) {
          throw new Error('Failed to fetch profile');
        }
        
        const data = await response.json();
        const fetchedAboutMe = data?.data?.aboutMe || data?.aboutMe || '';
        setAbout(fetchedAboutMe);
        setEditValue(fetchedAboutMe);
      } catch (err: any) {
        setError(err.message || 'Failed to fetch profile');
      } finally {
        setLoading(false);
      }
    };
    
    fetchProfile();
  }, []);

  const handleEdit = () => {
    setEditValue(about || '');
    setModalOpen(true);
  };

  const handleSave = async () => {
    setUpdateStatus(null);
    try {
      const token = localStorage.getItem('authToken');
      if (!token) {
        throw new Error('No authentication token found. Please log in.');
      }

      const updatedProfile = {
        aboutMe: editValue || '', // Ensure it's always a string
      };

      const response = await fetch(UPDATE_API_URL, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(updatedProfile),
      });

      if (!response.ok) {
        throw new Error('Failed to update profile');
      }
      
      const updatedData = await response.json();
      const newAboutMe = updatedData?.data?.aboutMe || updatedData?.aboutMe || editValue || '';
      setAbout(newAboutMe);
      setModalOpen(false);
      setUpdateStatus('Profile updated successfully!');
    } catch (err: any) {
      setUpdateStatus(err.message || 'Failed to update profile');
    }
  };

  const handleCancel = () => {
    setEditValue(about || ''); // Reset to current value
    setModalOpen(false);
    setUpdateStatus(null); // Clear any previous status messages
  };

  if (loading) {
    return <div className="bg-[#FFF8F0] rounded-2xl p-6 shadow-sm text-gray-600">Loading...</div>;
  }

  if (error) {
    return <div className="bg-[#FFF8F0] rounded-2xl p-6 shadow-sm text-red-500">{error}</div>;
  }

  return (
    <div className="bg-[#FFF8F0] rounded-2xl p-6 shadow-sm">
      {updateStatus && (
        <div
          className={`mb-4 p-2 rounded ${
            updateStatus.includes('successfully') ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
          }`}
        >
          {updateStatus}
        </div>
      )}
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900">About me</h3>
        <Edit3
          className="w-4 h-4 text-gray-400 cursor-pointer hover:text-gray-600"
          onClick={handleEdit}
        />
      </div>
      <p className="text-gray-600 text-sm leading-relaxed">
        {about || 'No information provided yet.'}
      </p>

      <Modal open={modalOpen} onClose={handleCancel}>
        <div className="flex flex-col items-center justify-center gap-3 mb-4">
          <h2 className="text-xl font-Lato text-gray-900">Edit About Me</h2>
        </div>
        <div className="mb-4 w-full">
          <Label className="text-sm font-Inter text-gray-700 mb-2 block">
            About Me
          </Label>
          <textarea
            className="w-full rounded-md border border-gray-300 p-2 font-Inter bg-white text-gray-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-rose-700"
            rows={5}
            value={editValue}
            onChange={(e) => setEditValue(e.target.value)}
            placeholder="Tell us about yourself..."
          />
        </div>
        <div className="flex justify-end gap-2">
          <Button
            variant="outline"
            className="bg-gray-100 text-gray-700 hover:bg-gray-200"
            onClick={handleCancel}
          >
            Cancel
          </Button>
          <Button
            className="bg-rose-700 hover:bg-rose-800 text-white"
            onClick={handleSave}
          >
            Save
          </Button>
        </div>
      </Modal>
    </div>
  );
};

export default AboutMeSection;