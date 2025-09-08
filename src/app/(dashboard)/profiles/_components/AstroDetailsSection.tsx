'use client';
import React, { useState, useEffect } from 'react';
import { Edit3 } from 'lucide-react';
import Modal from './Modal';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';

type AstroDetailItem = { label: string; value: string };
interface AstroDetailsSectionProps {
  astroDetails: AstroDetailItem[];
}

const API_URL = 'https://matrimonial-backend-chi.vercel.app/api/profile/self';
const UPDATE_API_URL = 'https://matrimonial-backend-chi.vercel.app/api/profile/update-profile';

const AstroDetailsSection: React.FC<AstroDetailsSectionProps> = ({ astroDetails }) => {
  const [info, setInfo] = useState<AstroDetailItem[]>(astroDetails);
  const [modalOpen, setModalOpen] = useState(false);
  const [editValues, setEditValues] = useState<AstroDetailItem[]>(astroDetails);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [updateStatus, setUpdateStatus] = useState<string | null>(null);

  // Fetch astro details on mount
  useEffect(() => {
    const fetchProfile = async () => {
      setLoading(true);
      setError(null);
      try {
        const token = localStorage.getItem('authToken');
        if (!token) throw new Error('No authentication token found. Please log in.');
        const response = await fetch(API_URL, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
        });
        if (!response.ok) throw new Error('Failed to fetch profile');
        const data = await response.json();
        const astroDetailsData = data?.data?.astroDetails || data?.astroDetails || {};
        const mappedAstroDetails: AstroDetailItem[] = [
          { label: 'Zodiac', value: astroDetailsData.zodiacSign || '' },
          { label: 'Date of Birth', value: astroDetailsData.dateOfBirth || '' },
          { label: 'Time of Birth', value: astroDetailsData.timeOfBirth || '' },
          { label: 'City of Birth', value: astroDetailsData.cityOfBirth || '' },
          { label: 'Manglik', value: astroDetailsData.manglik || '' },
        ];
        setInfo(mappedAstroDetails);
        setEditValues(mappedAstroDetails);
      } catch (err: any) {
        setError(err.message || 'Failed to fetch astro details');
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  const handleEdit = () => {
    setEditValues(info);
    setModalOpen(true);
  };

  const handleInputChange = (index: number, value: string) => {
    setEditValues((prev) =>
      prev.map((item, i) => (i === index ? { ...item, value } : item))
    );
  };

  const handleSave = async () => {
    setUpdateStatus(null);
    try {
      const token = localStorage.getItem('authToken');
      if (!token) throw new Error('No authentication token found. Please log in.');

      const updatedAstroDetails = {
        astroDetails: {
          zodiacSign: editValues.find(item => item.label === 'Zodiac')?.value || '',
          dateOfBirth: editValues.find(item => item.label === 'Date of Birth')?.value || '',
          timeOfBirth: editValues.find(item => item.label === 'Time of Birth')?.value || '',
          cityOfBirth: editValues.find(item => item.label === 'City of Birth')?.value || '',
          manglik: editValues.find(item => item.label === 'Manglik')?.value || '',
        },
      };

      const response = await fetch(UPDATE_API_URL, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(updatedAstroDetails),
      });

      if (!response.ok) throw new Error('Failed to update astro details');
      const updatedData = await response.json();
      const updatedAstroDetailsData = updatedData?.data?.astroDetails || updatedData?.astroDetails || {};
      const mappedAstroDetails: AstroDetailItem[] = [
        { label: 'Zodiac', value: updatedAstroDetailsData.zodiacSign || '' },
        { label: 'Date of Birth', value: updatedAstroDetailsData.dateOfBirth || '' },
        { label: 'Time of Birth', value: updatedAstroDetailsData.timeOfBirth || '' },
        { label: 'City of Birth', value: updatedAstroDetailsData.cityOfBirth || '' },
        { label: 'Manglik', value: updatedAstroDetailsData.manglik || '' },
      ];
      setInfo(mappedAstroDetails);
      setModalOpen(false);
      setUpdateStatus('Astro details updated successfully!');
    } catch (err: any) {
      setUpdateStatus(err.message || 'Failed to update astro details');
    }
  };

  if (loading) {
    return <div className="bg-[#FFF8F0]  p-6 shadow-sm text-gray-600">Loading...</div>;
  }

  if (error) {
    return <div className="bg-[#FFF8F0]  p-6 shadow-sm text-red-500">{error}</div>;
  }

  return (
    <div className="bg-[#FFF8F0]  p-6 shadow-sm">
      {updateStatus && (
        <div
          className={`mb-4 p-2 ${
            updateStatus.includes('successfully') ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
          }`}
        >
          {updateStatus}
        </div>
      )}
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900">Astro Details</h3>
        <Edit3
          className="w-4 h-4 text-gray-400 cursor-pointer hover:text-gray-600"
          onClick={handleEdit}
        />
      </div>
      <div className="space-y-2">
  {info.map((item, index) => (
    <div key={index} className="flex text-sm text-gray-700">
      <div className="w-1/2 flex">
        <span className="text-gray-600">{item.label}</span>
        <span className="ml-1">:</span>
      </div>
      <div className="w-1/2 font-medium">{item.value || 'Not specified'}</div>
    </div>
  ))}
</div>


      <Modal open={modalOpen} onClose={() => setModalOpen(false)}>
        <div className="flex flex-col items-center justify-center gap-3 mb-4">
          <h2 className="text-xl font-Lato text-gray-900">Edit Astro Details</h2>
        </div>
        <form
          onSubmit={e => {
            e.preventDefault();
            handleSave();
          }}
        >
          <div className="mb-4 w-full space-y-3">
            {editValues.map((item, index) => (
              <div key={index}>
                <Label className="text-sm font-Inter text-gray-700 mb-1 block">
                  {item.label}
                </Label>
                <input
                  className="w-full rounded-md border border-gray-300 p-2 font-Inter bg-white text-gray-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-rose-700"
                  value={item.value || ''} // Prevent uncontrolled input
                  onChange={e => handleInputChange(index, e.target.value)}
                />
              </div>
            ))}
          </div>
          <div className="flex justify-end gap-2">
            <Button
              type="button"
              variant="outline"
              className="bg-gray-100 text-gray-700 hover:bg-gray-200"
              onClick={() => setModalOpen(false)}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="bg-rose-700 hover:bg-rose-800 text-white"
            >
              Save
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default AstroDetailsSection;